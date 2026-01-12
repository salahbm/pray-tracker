import {
  Injectable,
  UnauthorizedException,
  BadRequestException,
} from '@nestjs/common';
import { auth } from '@/lib/auth';
import { Request } from 'express';
import { PrismaService } from '@/db/prisma.service';
import { getLocalizedMessage } from '@/common/i18n/error-messages';
import { getLocaleFromRequest } from '@/common/utils/headers';
import { I18nContext } from 'nestjs-i18n';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService) {}

  /**
   * Get current user session from request
   */
  async getCurrentSession(request: Request) {
    const locale = getLocaleFromRequest(request.headers as any);
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

  /**
   * Change password for authenticated user
   */
  async changePassword(
    request: Request,
    currentPassword: string,
    newPassword: string,
    i18n: I18nContext,
  ) {
    const session = await this.getCurrentSession(request);
    const userId = session.userId;

    // Get user's account with password
    const account = await this.prisma.account.findFirst({
      where: {
        userId,
        providerId: 'credential',
      },
    });

    if (!account || !account.password) {
      throw new BadRequestException(i18n.t('auth.error.userNotFound'));
    }

    // Verify current password
    const isPasswordValid = await bcrypt.compare(
      currentPassword,
      account.password,
    );

    if (!isPasswordValid) {
      throw new BadRequestException(i18n.t('auth.error.invalidCredentials'));
    }

    // Hash new password
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    // Update password
    await this.prisma.account.update({
      where: { id: account.id },
      data: { password: hashedPassword },
    });

    return {
      success: true,
      message: i18n.t('auth.password.changed'),
    };
  }
}
