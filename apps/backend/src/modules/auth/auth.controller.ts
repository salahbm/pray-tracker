import {
  Controller,
  Get,
  Post,
  Req,
  HttpCode,
  HttpStatus,
  Body,
  UnauthorizedException,
  Inject,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import type { Request } from 'express';
import { ChangePasswordDto } from './dto/change-password.dto';
import { I18n, I18nContext } from 'nestjs-i18n';
import type { Auth } from 'better-auth';
import { AUTH_INSTANCE } from '@/common/constants/auth.constants';
import { getLocalizedMessage } from '@/common/i18n/error-messages';
import { getLocaleFromRequest } from '@/common/utils/headers';

@Controller('auth')
export class AuthController {
  constructor(
    @Inject(AUTH_INSTANCE) private readonly auth: Auth,
    private readonly authService: AuthService,
  ) {}

  /**
   * Get current authenticated user
   */
  @Get('me')
  async getCurrentUser(@Req() request: Request) {
    const locale = getLocaleFromRequest(request.headers);

    if (!request.user?.id) {
      throw new UnauthorizedException({
        error: 'NO_ACTIVE_SESSION',
        message: getLocalizedMessage('NO_ACTIVE_SESSION', locale),
      });
    }

    return this.authService.listUserSessions(request.user.id);
  }

  /**
   * Sign out current user
   */
  @Post('signout')
  @HttpCode(HttpStatus.OK)
  async signOut(@Req() request: Request) {
    const locale = getLocaleFromRequest(request.headers);
    const authHeader = request.headers.authorization;

    if (!authHeader) {
      throw new UnauthorizedException({
        error: 'NO_ACTIVE_SESSION',
        message: getLocalizedMessage('NO_ACTIVE_SESSION', locale),
      });
    }

    try {
      await this.auth.api.signOut({
        headers: {
          authorization: authHeader,
        },
      });

      return {
        success: true,
        message: getLocalizedMessage('SIGN_OUT_SUCCESS', locale),
      };
    } catch (error) {
      console.error('Sign out error:', error);
      throw new UnauthorizedException({
        error: 'SIGN_OUT_FAILED',
        message: getLocalizedMessage('SIGN_OUT_FAILED', locale),
      });
    }
  }

  /**
   * List all active sessions
   */
  @Get('sessions')
  async listSessions(@Req() request: Request) {
    const locale = getLocaleFromRequest(request.headers);

    if (!request.user?.id) {
      throw new UnauthorizedException({
        error: 'NO_ACTIVE_SESSION',
        message: getLocalizedMessage('NO_ACTIVE_SESSION', locale),
      });
    }

    return this.authService.listUserSessions(request.user.id);
  }

  /**
   * Change password for authenticated user
   */
  @Post('change-password')
  @HttpCode(HttpStatus.OK)
  async changePassword(
    @Body() body: ChangePasswordDto,
    @Req() request: Request,
    @I18n() i18n: I18nContext,
  ) {
    if (!request.user?.id) {
      throw new UnauthorizedException({
        error: 'NO_ACTIVE_SESSION',
        message: i18n.t('errors.NO_ACTIVE_SESSION'),
      });
    }

    return this.authService.changePassword(
      request,
      body.currentPassword,
      body.newPassword,
      i18n,
    );
  }
}
