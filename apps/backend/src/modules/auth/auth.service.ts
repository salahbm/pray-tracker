import { Injectable } from '@nestjs/common';
import { auth } from '@/lib/auth';
import { Request } from 'express';
import { PrismaService } from '@/db/prisma.service';

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService) {}
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
  async signOut(req: Request) {
    const authHeader = req.headers.authorization;
    const token = authHeader?.replace('Bearer', '').trim();

    if (!token) {
      return { success: true };
    }

    await this.prisma.session.deleteMany({
      where: { token },
    });

    return { success: true };
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
