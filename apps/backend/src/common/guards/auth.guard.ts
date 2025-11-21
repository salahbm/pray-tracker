import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Request } from 'express';
import { auth } from '@/lib/auth';
import { getLocalizedMessage } from '@/common/i18n/error-messages';
import { getLocaleFromRequest } from '../utils/headers';

@Injectable()
export class AuthGuard implements CanActivate {
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<Request>();
    const locale = getLocaleFromRequest(request.headers as any);

    try {
      // Better Auth uses cookies for session management
      const session = await auth.api.getSession({
        headers: request.headers as any,
      });

      if (!session) {
        throw new UnauthorizedException({
          error: 'NO_ACTIVE_SESSION',
          message: getLocalizedMessage('NO_ACTIVE_SESSION', locale),
        });
      }

      // Attach user and session to request for use in controllers
      request['user'] = session.user;
      request['session'] = session.session;

      return true;
    } catch {
      throw new UnauthorizedException({
        error: 'INVALID_TOKEN',
        message: getLocalizedMessage('INVALID_TOKEN', locale),
      });
    }
  }
}
