import { Injectable } from '@nestjs/common';
import { auth } from '@/lib/auth';
import { Request } from 'express';

@Injectable()
export class AuthService {
  /**
   * Get current user session from request
   */
  async getCurrentSession(request: Request) {
    const session = await auth.api.getSession({
      headers: request.headers as any,
    });

    return session;
  }

  /**
   * Sign out user by invalidating session
   */
  async signOut(request: Request) {
    await auth.api.signOut({
      headers: request.headers as any,
    });

    return { message: 'Successfully signed out' };
  }

  /**
   * List all active sessions for a user
   */
  async listSessions(request: Request) {
    const session = await this.getCurrentSession(request);
    if (!session) {
      throw new Error('No active session');
    }

    const sessions = await auth.api.listSessions({
      headers: request.headers as any,
    });

    return sessions;
  }
}
