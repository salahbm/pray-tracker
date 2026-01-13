import { Controller, Get, Query } from '@nestjs/common';
import { LeaderboardService } from './leaderboard.service';
import { Public } from '@/common/decorators/public.decorator';

@Controller('leaderboard')
export class LeaderboardController {
  constructor(private readonly leaderboardService: LeaderboardService) {}

  @Public()
  @Get('global')
  async getGlobalLeaderboard(
    @Query('page') page?: string,
    @Query('limit') limit?: string,
  ) {
    const pageNum = page ? parseInt(page, 10) : 1;
    const limitNum = limit ? parseInt(limit, 10) : 50;
    return this.leaderboardService.getGlobalLeaderboard(pageNum, limitNum);
  }

  @Get('friends')
  async getFriendsLeaderboard(
    @Query('userId') userId: string,
    @Query('page') page?: string,
    @Query('limit') limit?: string,
  ) {
    const pageNum = page ? parseInt(page, 10) : 1;
    const limitNum = limit ? parseInt(limit, 10) : 50;
    return this.leaderboardService.getFriendsLeaderboard(
      userId,
      pageNum,
      limitNum,
    );
  }

  @Get('rank')
  async getUserRank(@Query('userId') userId: string) {
    return this.leaderboardService.getUserRank(userId);
  }
}
