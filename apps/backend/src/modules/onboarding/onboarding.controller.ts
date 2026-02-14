import {
  Body,
  Controller,
  Get,
  Post,
  Query,
  Req,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import type { Request } from 'express';

import { createPaginatedResponse, parsePaginationParams } from '@/common/utils';
import { AuthGuard } from '@/common/guards/auth.guard';
import { OnboardingService } from './onboarding.service';
import { UpsertOnboardingDto } from './dto/upsert-onboarding.dto';

@Controller('onboarding')
@UseGuards(AuthGuard)
export class OnboardingController {
  constructor(private readonly onboardingService: OnboardingService) {}

  @Get('admin/all')
  async getAllForAdmin(
    @Query('page') page?: string,
    @Query('limit') limit?: string,
  ) {
    const {
      skip,
      take,
      page: currentPage,
    } = parsePaginationParams({ page, limit });

    const [rows, total] = await Promise.all([
      this.onboardingService.listAllForAdmin({ skip, take }),
      this.onboardingService.countAllForAdmin(),
    ]);

    return createPaginatedResponse(rows, total, currentPage, take);
  }

  @Get('admin/stats')
  async getAdminStats() {
    return this.onboardingService.getAdminStats();
  }

  @Get('preferences')
  async getPreferences(@Req() request: Request) {
    const userId = request.user?.id;
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
    const userId = request.user?.id;
    if (!userId) {
      throw new UnauthorizedException('No active session found');
    }

    return this.onboardingService.upsertPreferences(userId, dto);
  }

  @Post('complete')
  async completeOnboarding(@Req() request: Request) {
    const userId = request.user?.id;
    if (!userId) {
      throw new UnauthorizedException('No active session found');
    }

    return this.onboardingService.completeOnboarding(userId);
  }
}
