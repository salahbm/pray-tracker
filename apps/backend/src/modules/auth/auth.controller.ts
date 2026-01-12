import {
  Controller,
  Get,
  Post,
  UseGuards,
  Req,
  HttpCode,
  HttpStatus,
  Body,
  BadRequestException,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGuard } from '@/common/guards/auth.guard';
import type { Request } from 'express';
import { Public } from '@/common/decorators/public.decorator';
import { auth } from '@/lib/auth';
import { SignUpDto } from './dto/signup.dto';

import { PrismaService } from '@/db/prisma.service';
import { NotFoundException } from '@nestjs/common';
import { I18n, I18nContext } from 'nestjs-i18n';
import { APIError } from 'better-auth';
import { mapBetterAuthErrorToKey } from '@/lib/better-auth-codes';
import { ChangePasswordDto } from './dto/change-password.dto';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly prisma: PrismaService,
  ) {}

  @Public()
  @Post('sign-up/email')
  @HttpCode(HttpStatus.OK)
  async signUpEmail(@Body() body: SignUpDto, @I18n() i18n: I18nContext) {
    try {
      const authResult = await auth.api.signUpEmail({
        body: {
          name: body.name,
          email: body.email,
          password: body.password,
        },
      });

      const user = await this.prisma.user.findUnique({
        where: { id: authResult.user.id },
      });

      if (!user) {
        throw new NotFoundException(i18n.t('auth.error.internal'));
      }

      return {
        token: authResult.token,
        user,
      };
    } catch (error) {
      if (error instanceof APIError) {
        // Better Auth APIError contains error code in the message
        const translationKey = mapBetterAuthErrorToKey(error.body?.code);
        const message = i18n.t(translationKey);
        throw new BadRequestException(message ?? error.message);
      }
      throw new BadRequestException(i18n.t('auth.error.internal'));
    }
  }

  /**
   * Get current authenticated user
   * Better Auth handles /auth/* routes automatically
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
  @Post('/change-password')
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
