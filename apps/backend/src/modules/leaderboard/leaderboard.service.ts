import { Injectable } from '@nestjs/common';
import { PrismaService } from '@/db/prisma.service';

@Injectable()
export class LeaderboardService {
  constructor(private prisma: PrismaService) {}

  /**
   * Get global leaderboard
   */
  async getGlobalLeaderboard(page: number = 1, limit: number = 50) {
    const pageNum = Math.max(1, page);
    const skip = (pageNum - 1) * limit;

    const [users, total] = await Promise.all([
      this.prisma.user.findMany({
        select: {
          id: true,
          name: true,
          email: true,
          image: true,
          totalPoints: true,
        },
        orderBy: {
          totalPoints: 'desc',
        },
        skip,
        take: limit,
      }),
      this.prisma.user.count(),
    ]);

    return {
      data: users.map((user, index) => ({
        id: user.id,
        username: user.name,
        email: user.email,
        photo: user.image || '',
        totalPoints: user.totalPoints || 0,
        rank: skip + index + 1,
      })),
      pagination: {
        page: pageNum,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  /**
   * Get friends leaderboard
   */
  async getFriendsLeaderboard(
    userId: string,
    page: number = 1,
    limit: number = 50,
  ) {
    const skip = (page - 1) * limit;

    // Get all friends (both directions)
    const friendships = await this.prisma.friend.findMany({
      where: {
        OR: [
          { userId, status: 'ACCEPTED' },
          { friendId: userId, status: 'ACCEPTED' },
        ],
      },
      select: {
        userId: true,
        friendId: true,
      },
    });

    // Extract friend IDs
    const friendIds = friendships.map((f) =>
      f.userId === userId ? f.friendId : f.userId,
    );

    // Include the user themselves
    const allUserIds = [userId, ...friendIds];

    const [users, total] = await Promise.all([
      this.prisma.user.findMany({
        where: {
          id: {
            in: allUserIds,
          },
        },
        select: {
          id: true,
          name: true,
          email: true,
          image: true,
          totalPoints: true,
        },
        orderBy: {
          totalPoints: 'desc',
        },
        skip,
        take: limit,
      }),
      this.prisma.user.count({
        where: {
          id: {
            in: allUserIds,
          },
        },
      }),
    ]);

    return {
      data: users.map((user, index) => ({
        id: user.id,
        username: user.name,
        email: user.email,
        photo: user.image || '',
        totalPoints: user.totalPoints || 0,
        rank: skip + index + 1,
        isCurrentUser: user.id === userId,
      })),
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  /**
   * Get user rank in global leaderboard
   */
  async getUserRank(userId: string) {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
      select: {
        totalPoints: true,
      },
    });

    if (!user) {
      return null;
    }

    const rank = await this.prisma.user.count({
      where: {
        totalPoints: {
          gt: user.totalPoints || 0,
        },
      },
    });

    return {
      userId,
      rank: rank + 1,
      totalPoints: user.totalPoints || 0,
    };
  }
}
