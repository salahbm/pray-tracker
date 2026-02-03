import {
  Controller,
  Get,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Query,
  Req,
  UnauthorizedException,
} from '@nestjs/common';
import type { Request } from 'express';
import { PrayersService } from './prayers.service';
import { UpdatePrayerDto } from './dto/update-prayer.dto';
import { AuthGuard } from '@/common/guards/auth.guard';
import { PatchPrayerDto } from './dto/patch-prayer.dto';

@Controller('prayers')
@UseGuards(AuthGuard)
export class PrayersController {
  constructor(private readonly prayersService: PrayersService) {}

  @Patch()
  patch(@Body() dto: PatchPrayerDto) {
    return this.prayersService.patch(dto);
  }

  /**
   * Get all prayers for the current user
   */
  @Get('me')
  async findMyPrayers(
    @Req() request: Request,
    @Query('year') year?: string,
    @Query('month') month?: string,
  ) {
    const userId = request.user?.id;
    if (!userId) {
      throw new UnauthorizedException('No active session found');
    }

    return this.prayersService.findAllByUser(userId, {
      year: year ? parseInt(year, 10) : undefined,
      month: month ? parseInt(month, 10) : undefined,
    });
  }

  /**
   * Get today's prayer for the current user
   */
  @Get('me/today')
  async findMyTodayPrayer(
    @Req() request: Request,
    @Query('date') date?: string,
  ) {
    const userId = request.user?.id;
    if (!userId) {
      throw new UnauthorizedException('No active session found');
    }

    return this.prayersService.findTodayByUser(userId, date);
  }

  /**
   * Get prayer statistics for the current user
   */
  @Get('me/stats')
  async getMyStats(@Req() request: Request, @Query('year') year?: string) {
    const userId = request.user?.id;
    if (!userId) {
      throw new UnauthorizedException('No active session found');
    }

    return this.prayersService.getUserStats(
      userId,
      year ? parseInt(year, 10) : undefined,
    );
  }

  /**
   * Get all prayers for a specific user
   */
  @Get('user/:userId')
  async findUserPrayers(
    @Param('userId') userId: string,
    @Query('year') year?: string,
    @Query('month') month?: string,
  ) {
    return this.prayersService.findAllByUser(userId, {
      year: year ? parseInt(year, 10) : undefined,
      month: month ? parseInt(month, 10) : undefined,
    });
  }

  /**
   * Get today's prayer for a specific user
   */
  @Get('user/:userId/today')
  async findUserTodayPrayer(
    @Param('userId') userId: string,
    @Query('date') date?: string,
  ) {
    return this.prayersService.findTodayByUser(userId, date);
  }

  /**
   * Get prayer by ID
   */
  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.prayersService.findOne(id);
  }

  /**
   * Update a prayer
   */
  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updatePrayerDto: UpdatePrayerDto,
  ) {
    return this.prayersService.update(id, updatePrayerDto);
  }

  /**
   * Delete a prayer
   */
  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.prayersService.remove(id);
  }
}
