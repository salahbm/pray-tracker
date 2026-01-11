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

      const token = authHeader ? authHeader?.replace('Bearer', '')?.trim() : '';

      if (!token) {
        throw new UnauthorizedException({
          error: 'NO_ACTIVE_SESSION',
          message: getLocalizedMessage('NO_ACTIVE_SESSION', locale),
        });
      }

      // Web: use Better Auth's cookie-based session
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

      // Attach user and session to request for use in controllers
      request['user'] = session.user;
      request['session'] = session;

      return true;
    } catch (error) {
      console.log(`Guard Error 👉:`, JSON.stringify(error, null, 2));
      throw new UnauthorizedException({
        error: 'INVALID_TOKEN',
        message: getLocalizedMessage('INVALID_TOKEN', locale),
      });
    }
  }
}
