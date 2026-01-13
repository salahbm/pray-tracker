import {
  Controller,
  Get,
  Post,
  UseGuards,
  Req,
  HttpCode,
  HttpStatus,
  Body,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGuard } from '@/common/guards/auth.guard';
import type { Request } from 'express';
import { Public } from '@/common/decorators/public.decorator';
import { ChangePasswordDto } from './dto/change-password.dto';
import { I18n, I18nContext } from 'nestjs-i18n';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  /**
   * Get current authenticated user
   * Better Auth handles /api/auth/* routes automatically (sign-up, sign-in, etc.)
   * This is a custom endpoint for getting current user info
   */
  @Get('me')
  @UseGuards(AuthGuard)
  async getCurrentUser(@Req() request: Request) {
    const session = await this.authService.getCurrentSession(request);
    return {
      user: session?.user,
      session,
    };
  }

  /**
   * Sign out current user
   */
  @Public()
  @Post('signout')
  @HttpCode(HttpStatus.OK)
  async signOut(@Req() request: Request) {
    return this.authService.signOut(request);
  }

  /**
   * List all active sessions
   */
  @Get('sessions')
  @UseGuards(AuthGuard)
  async listSessions(@Req() request: Request) {
    return this.authService.listSessions(request);
  }

  /**
   * Change password for authenticated user
   */
  @Post('change-password')
  @UseGuards(AuthGuard)
  @HttpCode(HttpStatus.OK)
  async changePassword(
    @Body() body: ChangePasswordDto,
    @Req() request: Request,
    @I18n() i18n: I18nContext,
  ) {
    return this.authService.changePassword(
      request,
      body.currentPassword,
      body.newPassword,
      i18n,
    );
  }
}
