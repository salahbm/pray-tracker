import {
  Body,
  Controller,
  Get,
  Post,
  Req,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import type { Request } from 'express';

import { AuthGuard } from '@/common/guards/auth.guard';
import { OnboardingService } from './onboarding.service';
import { UpsertOnboardingDto } from './dto/upsert-onboarding.dto';

@Controller('onboarding')
@UseGuards(AuthGuard)
export class OnboardingController {
  constructor(private readonly onboardingService: OnboardingService) {}

  @Get('preferences')
  async getPreferences(@Req() request: Request) {
    const userId: string = request['user']?.id;

    if (!userId) {
      throw new UnauthorizedException('No active session found');
    }

    return this.onboardingService.getPreferences(userId);
  }

  @Post('preferences')
  async upsertPreferences(
    @Req() request: Request,
    @Body() dto: UpsertOnboardingDto,
  ) {
    const userId: string = request['user']?.id;

    if (!userId) {
      throw new UnauthorizedException('No active session found');
    }

    return this.onboardingService.upsertPreferences(userId, dto);
  }

  @Post('complete')
  async completeOnboarding(@Req() request: Request) {
    const userId: string = request['user']?.id;

    if (!userId) {
      throw new UnauthorizedException('No active session found');
    }

    return this.onboardingService.completeOnboarding(userId);
  }
}
