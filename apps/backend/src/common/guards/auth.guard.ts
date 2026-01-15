import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Request } from 'express';
import { getLocalizedMessage } from '@/common/i18n/error-messages';
import { getLocaleFromRequest } from '../utils/headers';
import { Reflector, ModuleRef } from '@nestjs/core';
import { IS_PUBLIC_KEY } from '../decorators/public.decorator';
import type { Auth, User } from 'better-auth';
import { AUTH_INSTANCE } from '@/common/constants/auth.constants';
import { PrismaService } from '@/db/prisma.service';

// Extend Express Request type
declare module 'express' {
  interface Request {
    user?: User;
    token?: string;
  }
}

@Injectable()
export class AuthGuard implements CanActivate {
  private auth: Auth | null = null;
  private prisma: PrismaService | null = null;

  constructor(
    private reflector: Reflector,
    private moduleRef: ModuleRef,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    // Lazily resolve AUTH_INSTANCE and PrismaService to avoid circular dependency
    if (!this.auth) {
      this.auth = this.moduleRef.get(AUTH_INSTANCE, { strict: false });
      if (!this.auth) {
        throw new UnauthorizedException('Auth instance not available');
      }
    }
    if (!this.prisma) {
      this.prisma = this.moduleRef.get(PrismaService, { strict: false });
    }

    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (isPublic) {
      return true;
    }

    const request = context.switchToHttp().getRequest<Request>();
    const locale = getLocaleFromRequest(request.headers);

    try {
      const authHeader = request.headers.authorization;
      console.log(`AUTH 👉:`, JSON.stringify(authHeader, null, 2));
      if (!authHeader) {
        throw new UnauthorizedException({
          error: 'NO_ACTIVE_SESSION',
          message: getLocalizedMessage('NO_ACTIVE_SESSION', locale),
        });
      }

      // Extract token from Bearer header
      const token = authHeader.replace('Bearer ', '');

      if (!this.prisma) {
        throw new UnauthorizedException('Database connection not available');
      }

      // Query session directly from database (Better Auth API returns null)
      // The token returned from sign-in is stored in the 'token' field, not 'id'
      const sessionRecord = await this.prisma.session.findFirst({
        where: { token: token },
        include: { user: true },
      });

      console.log('Session query result:', {
        token,
        found: !!sessionRecord,
        hasUser: !!sessionRecord?.user,
        sessionId: sessionRecord?.id,
      });

      if (!sessionRecord || !sessionRecord.user) {
        throw new UnauthorizedException({
          error: 'NO_ACTIVE_SESSION',
          message: getLocalizedMessage('NO_ACTIVE_SESSION', locale),
        });
      }

      // Check expiration
      if (sessionRecord.expiresAt && sessionRecord.expiresAt < new Date()) {
        throw new UnauthorizedException({
          error: 'SESSION_EXPIRED',
          message: getLocalizedMessage('SESSION_EXPIRED', locale),
        });
      }

      // Attach to request in Better Auth format
      request.user = sessionRecord.user as User;
      request.token = token;

      return true;
    } catch (error) {
      // Log unexpected errors
      if (!(error instanceof UnauthorizedException)) {
        console.error('Auth Guard Error:', error);
      }

      if (error instanceof UnauthorizedException) {
        throw error;
      }

      throw new UnauthorizedException({
        error: 'INVALID_TOKEN',
        message: getLocalizedMessage('INVALID_TOKEN', locale),
      });
    }
  }
}
