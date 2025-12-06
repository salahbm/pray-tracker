import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '@/db/prisma.service';
import { User, Prisma } from 'generated/prisma';
import { UpdateUserDto } from './dto/update-user.dto';
import { getLocalizedMessage } from '@/common/i18n/error-messages';
import { Locale } from '@/common/utils/response.utils';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  /**
   * Find user by ID
   */
  async findById(id: string): Promise<User | null> {
    return this.prisma.user.findUnique({
      where: { id },
      include: {
        prayers: {
          orderBy: { date: 'desc' },
          take: 10,
        },
      },
    });
  }

  /**
   * Find user by email
   */
  async findByEmail(email: string): Promise<User | null> {
    return this.prisma.user.findUnique({
      where: { email },
    });
  }

  /**
   * Get all users with pagination
   */
  async findAll(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.UserWhereUniqueInput;
    where?: Prisma.UserWhereInput;
    orderBy?: Prisma.UserOrderByWithRelationInput;
  }): Promise<User[]> {
    const { skip, take, cursor, where, orderBy } = params;
    return this.prisma.user.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
    });
  }

  /**
   * Count users with optional filter
   */
  async count(where?: Prisma.UserWhereInput): Promise<number> {
    return this.prisma.user.count({ where });
  }

  /**
   * Update user profile
   */
  async update(
    id: string,
    updateUserDto: UpdateUserDto,
    locale: Locale = 'en',
  ): Promise<User> {
    const user = await this.prisma.user.findUnique({ where: { id } });
    if (!user) {
      throw new NotFoundException({
        error: 'USER_NOT_FOUND',
        message: getLocalizedMessage('USER_NOT_FOUND', locale),
      });
    }

    return this.prisma.user.update({
      where: { id },
      data: updateUserDto,
    });
  }

  /**
   * Delete user
   */
  async remove(id: string, locale: Locale = 'en'): Promise<User> {
    const user = await this.prisma.user.findUnique({ where: { id } });
    if (!user) {
      throw new NotFoundException({
        error: 'USER_NOT_FOUND',
        message: getLocalizedMessage('USER_NOT_FOUND', locale),
      });
    }

    return this.prisma.user.delete({
      where: { id },
    });
  }

  /**
   * Save push notification token
   */
  async savePushToken(userId: string, pushToken: string) {
    const user = await this.prisma.user.findUnique({ where: { id: userId } });
    if (!user) {
      throw new NotFoundException({
        error: 'USER_NOT_FOUND',
        message: getLocalizedMessage('USER_NOT_FOUND', 'en'),
      });
    }

    await this.prisma.user.update({
      where: { id: userId },
      data: { pushToken },
    });

    return {
      success: true,
    };
  }

  /**
   * Get user statistics
   */
  async getUserStats(userId: string, locale: Locale = 'en') {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
      include: {
        prayers: true,
        _count: {
          select: {
            prayers: true,
            sentRequests: true,
            receivedRequests: true,
          },
        },
      },
    });

    if (!user) {
      throw new NotFoundException({
        error: 'USER_NOT_FOUND',
        message: getLocalizedMessage('USER_NOT_FOUND', locale),
      });
    }

    return {
      totalPrayers: user._count.prayers,
      totalPoints: user.totalPoints || 0,
      friendsCount: user._count.sentRequests + user._count.receivedRequests,
    };
  }
}
