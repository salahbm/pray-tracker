import {
  Controller,
  Get,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Req,
  Query,
  UnauthorizedException,
  Headers,
  Post,
} from '@nestjs/common';
import { UsersService } from './user.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { AuthGuard } from '@/common/guards/auth.guard';
import type { Request } from 'express';
import { Prisma } from 'generated/prisma';
import { parsePaginationParams, createPaginatedResponse } from '@/common/utils';
import { type Locale } from '@/common/utils/response.utils';

@Controller('users')
@UseGuards(AuthGuard)
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  /**
   * Get current user profile
   */
  @Get('me')
  async getCurrentUser(@Req() request: Request) {
    const userId: string = request['user']?.id;

    if (!userId) {
      throw new UnauthorizedException('No active session found');
    }

    return this.usersService.findById(userId);
  }

  /**
   * Get current user statistics
   */
  @Get('me/stats')
  async getCurrentUserStats(@Req() request: Request) {
    const userId: string = request['user']?.id;
    return this.usersService.getUserStats(userId);
  }

  /**
   * Update current user profile
   */
  @Patch('me')
  async updateCurrentUser(
    @Req() request: Request,
    @Body() updateUserDto: UpdateUserDto,
    @Headers('locale') locale?: Locale,
  ) {
    const userId: string = request['user']?.id;

    if (!userId) {
      throw new UnauthorizedException('No active session found');
    }

    return this.usersService.update(userId, updateUserDto, locale);
  }

  /**
   * Save push notification token for current user
   */
  @Post('me/push-token')
  async savePushToken(
    @Req() request: Request,
    @Body('pushToken') pushToken: string,
  ) {
    const userId: string = request['user']?.id;

    if (!userId) {
      throw new UnauthorizedException('No active session found');
    }

    return this.usersService.savePushToken(userId, pushToken);
  }

  /**
   * Get all users (with pagination)
   */
  @Get()
  async findAll(
    @Query('page') page?: string,
    @Query('limit') limit?: string,
    @Query('search') search?: string,
  ) {
    const {
      skip,
      take,
      page: currentPage,
    } = parsePaginationParams({
      page,
      limit,
    });

    const where: Prisma.UserWhereInput | undefined = search
      ? {
          OR: [
            { name: { contains: search, mode: Prisma.QueryMode.insensitive } },
            { email: { contains: search, mode: Prisma.QueryMode.insensitive } },
          ],
        }
      : undefined;

    const [users, total] = await Promise.all([
      this.usersService.findAll({
        skip,
        take,
        where,
        orderBy: { createdAt: 'desc' },
      }),
      this.usersService.count(where),
    ]);

    return createPaginatedResponse(users, total, currentPage, take);
  }

  /**
   * Get user by ID
   */
  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.usersService.findById(id);
  }

  /**
   * Get user statistics by ID
   */
  @Get(':id/stats')
  async getUserStats(@Param('id') id: string) {
    return this.usersService.getUserStats(id);
  }

  /**
   * Update user by ID (admin only - you can add role guard later)
   * path api/users/:id
   */
  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(id, updateUserDto);
  }

  /**
   * Delete user by ID (admin only - you can add role guard later)
   */
  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.usersService.remove(id);
  }
}
