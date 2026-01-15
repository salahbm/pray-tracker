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
import { FastingService } from './fasting.service';
import { UpsertFastingDto } from './dto/upsert-fasting.dto';

@Controller('fasting')
@UseGuards(AuthGuard)
export class FastingController {
  constructor(private readonly fastingService: FastingService) {}

  @Get()
  async getHistory(@Req() request: Request) {
    const userId = request.user?.id;
    if (!userId) {
      throw new UnauthorizedException('No active session found');
    }

    return this.fastingService.getHistory(userId);
  }

  @Post()
  async upsertFasting(@Req() request: Request, @Body() dto: UpsertFastingDto) {
    const userId = request.user?.id;
    if (!userId) {
      throw new UnauthorizedException('No active session found');
    }

    return this.fastingService.upsertFasting(userId, dto.date, dto.fasted);
  }
}
