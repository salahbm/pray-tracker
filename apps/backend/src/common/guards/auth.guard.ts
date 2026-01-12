import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Request } from 'express';
import { getLocalizedMessage } from '@/common/i18n/error-messages';
import { getLocaleFromRequest } from '../utils/headers';
import { PrismaService } from '@/db/prisma.service';

import { Reflector } from '@nestjs/core';
import { IS_PUBLIC_KEY } from '../decorators/public.decorator';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private prisma: PrismaService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (isPublic) {
      return true;
    }

    const request = context.switchToHttp().getRequest<Request>();
    const locale = getLocaleFromRequest(request.headers as any);

    try {
      const authHeader = request.headers.authorization;

      // Extract token from "Bearer <token>" or just "<token>"
      const token = authHeader
        ? authHeader.replace(/^Bearer\s+/i, '').trim()
        : '';

      if (!token) {
        throw new UnauthorizedException({
          error: 'NO_ACTIVE_SESSION',
          message: getLocalizedMessage('NO_ACTIVE_SESSION', locale),
        });
      }

      // Look up session in database
      const session = await this.prisma.session.findUnique({
        where: { token },
        include: { user: true },
      });

      if (!session) {
        throw new UnauthorizedException({
          error: 'NO_ACTIVE_SESSION',
          message: getLocalizedMessage('NO_ACTIVE_SESSION', locale),
        });
      }

      // Check if session is expired
      const now = new Date();
      if (session.expiresAt && session.expiresAt < now) {
        // Delete expired session
        await this.prisma.session.delete({ where: { token } });
        throw new UnauthorizedException({
          error: 'SESSION_EXPIRED',
          message: getLocalizedMessage('SESSION_EXPIRED', locale),
        });
      }

      // Attach user and session to request for use in controllers
      request['user'] = session.user;
      request['session'] = session;

      return true;
    } catch (error) {
      // Only log if it's not an UnauthorizedException we threw
      if (!(error instanceof UnauthorizedException)) {
        console.error('Auth Guard Error:', error);
      }

      // Re-throw if it's already an UnauthorizedException
      if (error instanceof UnauthorizedException) {
        throw error;
      }

      // Otherwise throw a generic invalid token error
      throw new UnauthorizedException({
        error: 'INVALID_TOKEN',
        message: getLocalizedMessage('INVALID_TOKEN', locale),
      });
    }
  }
}
