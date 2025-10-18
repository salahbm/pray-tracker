import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Request } from 'express';
import { auth } from '@/lib/auth';

@Injectable()
export class AuthGuard implements CanActivate {
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<Request>();

    try {
      // Better Auth uses cookies for session management
      const session = await auth.api.getSession({
        headers: request.headers as any,
      });

      if (!session) {
        throw new UnauthorizedException('No active session found');
      }

      // Attach user and session to request for use in controllers
      request['user'] = session.user;
      request['session'] = session.session;

      return true;
    } catch {
      throw new UnauthorizedException('Invalid or expired session');
    }
  }
}
