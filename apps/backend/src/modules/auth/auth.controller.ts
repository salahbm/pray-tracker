import {
  Controller,
  Get,
  Post,
  UseGuards,
  Req,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGuard } from '@/common/guards/auth.guard';
import type { Request } from 'express';
import { Public } from '@/common/decorators/public.decorator';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  /**
   * Get current authenticated user
   * Better Auth handles /api/auth/* routes automatically
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
}
