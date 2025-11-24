import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '@/db/prisma.service';
import { FriendStatus, Prayer } from 'generated/prisma';
import { getLocalizedMessage } from '@/common/i18n/error-messages';
import { createSuccessResponse, Locale } from '@/common/utils/response.utils';

@Injectable()
export class FriendsService {
  constructor(private prisma: PrismaService) {}

  /**
   * Send a friend request
   */
  async sendFriendRequest(
    userId: string,
    friendEmail: string,
    locale: Locale = 'en',
  ) {
    // Find friend by email
    const friend = await this.prisma.user.findUnique({
      where: { email: friendEmail },
    });

    if (!friend) {
      throw new NotFoundException({
        error: 'USER_NOT_FOUND',
        message: getLocalizedMessage('USER_NOT_FOUND', locale),
      });
    }

    // Check if trying to add self
    if (userId === friend.id) {
      throw new BadRequestException({
        error: 'CANNOT_SEND_REQUEST_TO_SELF',
        message: getLocalizedMessage('CANNOT_SEND_REQUEST_TO_SELF', locale),
      });
    }

    // Check if friendship already exists (in either direction)
    const existingFriendship = await this.prisma.friend.findFirst({
      where: {
        OR: [
          { userId, friendId: friend.id },
          { userId: friend.id, friendId: userId },
        ],
      },
    });

    if (existingFriendship) {
      if (existingFriendship.status === FriendStatus.ACCEPTED) {
        throw new BadRequestException({
          error: 'ALREADY_FRIENDS',
          message: getLocalizedMessage('ALREADY_FRIENDS', locale),
        });
      }
      throw new BadRequestException({
        error: 'FRIEND_REQUEST_ALREADY_EXISTS',
        message: getLocalizedMessage('FRIEND_REQUEST_ALREADY_EXISTS', locale),
      });
    }

    // Create friend request
    const friendship = await this.prisma.friend.create({
      data: {
        userId,
        friendId: friend.id,
        status: FriendStatus.PENDING,
      },
      include: {
        friend: {
          select: {
            id: true,
            name: true,
            email: true,
            image: true,
          },
        },
      },
    });

    return {
      message: getLocalizedMessage('FRIEND_REQUEST_SENT', locale),
      data: friendship,
    };
  }

  /**
   * Get all friends activities (pending requests + approved friends) with pagination
   */
  async getAllFriends(userId: string, page: number = 1, limit: number = 20) {
    const skip = (page - 1) * limit;

    // Get all friendships (pending and accepted)
    const friendships = await this.prisma.friend.findMany({
      where: {
        OR: [{ userId }, { friendId: userId }],
      },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
            image: true,
          },
        },
        friend: {
          select: {
            id: true,
            name: true,
            email: true,
            image: true,
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
      skip,
      take: limit,
    });

    // Get today's date for prayers
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    // Transform friendships into activities
    const activities = await Promise.all(
      friendships.map(async (friendship) => {
        const isSender = friendship.userId === userId;
        const friendData = isSender ? friendship.friend : friendship.user;
        const friendUserId = friendData?.id;

        let type: 'sent' | 'received' | 'friend';
        if (friendship.status === FriendStatus.ACCEPTED) {
          type = 'friend';
        } else if (isSender) {
          type = 'sent';
        } else {
          type = 'received';
        }

        // Get prayers only for accepted friends
        let prays = [] as Omit<
          Prayer,
          'id' | 'userId' | 'createdAt' | 'updatedAt' | 'date'
        >[];
        if (friendship.status === FriendStatus.ACCEPTED && friendUserId) {
          // Get today's prayer specifically
          const prayers = await this.prisma.prayer.findMany({
            where: {
              userId: friendUserId,
              date: {
                gte: today,
                lt: tomorrow,
              },
            },
            select: {
              fajr: true,
              dhuhr: true,
              asr: true,
              maghrib: true,
              isha: true,
              nafl: true,
            },
            take: 1,
          });

          prays = prayers.map((prayer) => ({
            fajr: prayer.fajr ?? 0,
            dhuhr: prayer.dhuhr ?? 0,
            asr: prayer.asr ?? 0,
            maghrib: prayer.maghrib ?? 0,
            isha: prayer.isha ?? 0,
            nafl: prayer.nafl ?? 0,
          }));
        }

        return {
          id: friendship.id,
          userId: friendship.userId,
          friendId: friendship.friendId,
          friendUserId: friendUserId ?? '',
          username: friendData?.name ?? '',
          email: friendData?.email ?? '',
          photo: friendData?.image || '',
          status: friendship.status,
          type,
          createdAt: friendship.createdAt,
          prays,
          isSender,
        };
      }),
    );

    return activities;
  }

  /**
   * Accept a friend request
   */
  async acceptFriendRequest(
    friendshipId: string,
    userId: string,
    locale: Locale = 'en',
  ) {
    const friendship = await this.prisma.friend.findUnique({
      where: { id: friendshipId },
    });

    if (!friendship) {
      throw new NotFoundException({
        error: 'FRIEND_REQUEST_NOT_FOUND',
        message: getLocalizedMessage('FRIEND_REQUEST_NOT_FOUND', locale),
      });
    }

    // Only the receiver can accept
    if (friendship.friendId !== userId) {
      throw new BadRequestException({
        error: 'FORBIDDEN',
        message: getLocalizedMessage('FORBIDDEN', locale),
      });
    }

    const updatedFriendship = await this.prisma.friend.update({
      where: { id: friendshipId },
      data: { status: FriendStatus.ACCEPTED },
    });

    return {
      message: getLocalizedMessage('FRIEND_REQUEST_ACCEPTED', locale),
      data: updatedFriendship,
    };
  }

  /**
   * Reject a friend request
   */
  async rejectFriendRequest(
    friendshipId: string,
    userId: string,
    locale: Locale = 'en',
  ) {
    const friendship = await this.prisma.friend.findUnique({
      where: { id: friendshipId },
    });

    if (!friendship) {
      throw new NotFoundException({
        error: 'FRIEND_REQUEST_NOT_FOUND',
        message: getLocalizedMessage('FRIEND_REQUEST_NOT_FOUND', locale),
      });
    }

    const isReceiver = friendship.friendId === userId;
    const isSender = friendship.userId === userId;

    if (!isReceiver && !isSender) {
      throw new BadRequestException({
        error: 'FORBIDDEN',
        message: getLocalizedMessage('FORBIDDEN', locale),
      });
    }

    if (friendship.status !== FriendStatus.PENDING) {
      throw new BadRequestException({
        error: 'BAD_REQUEST',
        message: getLocalizedMessage('BAD_REQUEST', locale),
      });
    }

    await this.prisma.friend.delete({
      where: { id: friendshipId },
    });

    return createSuccessResponse(
      null,
      getLocalizedMessage('FRIEND_REQUEST_REJECTED', locale),
    );
  }

  /**
   * Remove a friend
   */
  async removeFriend(
    friendshipId: string,
    userId: string,
    locale: Locale = 'en',
  ) {
    const friendship = await this.prisma.friend.findUnique({
      where: { id: friendshipId },
    });

    if (!friendship) {
      throw new NotFoundException({
        error: 'FRIEND_NOT_FOUND',
        message: getLocalizedMessage('FRIEND_NOT_FOUND', locale),
      });
    }

    if (friendship.userId !== userId && friendship.friendId !== userId) {
      throw new BadRequestException({
        error: 'FORBIDDEN',
        message: getLocalizedMessage('FORBIDDEN', locale),
      });
    }

    await this.prisma.friend.delete({
      where: { id: friendshipId },
    });

    return createSuccessResponse(
      null,
      getLocalizedMessage('FRIEND_REMOVED', locale),
    );
  }

  /**
   * Create a new friend group
   */
  async createGroup(userId: string, name: string, locale: Locale = 'en') {
    const group = await this.prisma.friendGroup.create({
      data: {
        userId,
        name,
      },
      include: {
        members: {
          include: {
            user: {
              select: {
                id: true,
                name: true,
                email: true,
                image: true,
              },
            },
          },
        },
      },
    });

    return createSuccessResponse(
      group,
      getLocalizedMessage('GROUP_CREATED', locale),
    );
  }

  /**
   * Get all groups for a user
   */
  async getGroups(userId: string) {
    const groups = await this.prisma.friendGroup.findMany({
      where: { userId },
      include: {
        members: {
          include: {
            user: {
              select: {
                id: true,
                name: true,
                email: true,
                image: true,
              },
            },
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    return groups.map((group) => ({
      id: group.id,
      name: group.name,
      memberCount: group.members.length,
      members: group.members.map((member) => ({
        id: member.id,
        userId: member.userId,
        username: member.user?.name ?? '',
        email: member.user?.email ?? '',
        photo: member.user?.image ?? '',
      })),
      createdAt: group.createdAt,
      updatedAt: group.updatedAt,
    }));
  }

  /**
   * Get group members with their prayers
   */
  async getGroupMembers(
    groupId: string,
    userId: string,
    locale: Locale = 'en',
  ) {
    const group = await this.prisma.friendGroup.findUnique({
      where: { id: groupId },
      include: {
        members: {
          include: {
            user: {
              select: {
                id: true,
                name: true,
                email: true,
                image: true,
                createdAt: true,
              },
            },
          },
        },
      },
    });

    if (!group) {
      throw new NotFoundException({
        error: 'GROUP_NOT_FOUND',
        message: getLocalizedMessage('GROUP_NOT_FOUND', locale),
      });
    }

    // Verify user owns the group
    if (group.userId !== userId) {
      throw new BadRequestException({
        error: 'FORBIDDEN',
        message: getLocalizedMessage('FORBIDDEN', locale),
      });
    }

    // Get prayers for each member
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    const membersWithPrayers = await Promise.all(
      group.members.map(async (member) => {
        // Get today's prayer specifically
        const prayers = await this.prisma.prayer.findMany({
          where: {
            userId: member.userId,
            date: {
              gte: today,
              lt: tomorrow,
            },
          },
          select: {
            fajr: true,
            dhuhr: true,
            asr: true,
            maghrib: true,
            isha: true,
            nafl: true,
          },
          take: 1,
        });

        return {
          id: member.id,
          userId: member.userId,
          username: member.user.name,
          email: member.user.email,
          photo: member.user.image || '',
          createdAt: member.user.createdAt,
          prayer: {
            fajr: prayers[0]?.fajr ?? 0,
            dhuhr: prayers[0]?.dhuhr ?? 0,
            asr: prayers[0]?.asr ?? 0,
            maghrib: prayers[0]?.maghrib ?? 0,
            isha: prayers[0]?.isha ?? 0,
            nafl: prayers[0]?.nafl ?? 0,
          },
        };
      }),
    );

    return {
      id: group.id,
      name: group.name,
      members: membersWithPrayers,
    };
  }

  /**
   * Update group name
   */
  async updateGroup(
    groupId: string,
    name: string,
    userId: string,
    locale: Locale = 'en',
  ) {
    const group = await this.prisma.friendGroup.findUnique({
      where: { id: groupId },
    });

    if (!group) {
      throw new NotFoundException({
        error: 'GROUP_NOT_FOUND',
        message: getLocalizedMessage('GROUP_NOT_FOUND', locale),
      });
    }

    if (group.userId !== userId) {
      throw new BadRequestException({
        error: 'FORBIDDEN',
        message: getLocalizedMessage('FORBIDDEN', locale),
      });
    }

    const updatedGroup = await this.prisma.friendGroup.update({
      where: { id: groupId },
      data: { name },
    });

    return {
      message: getLocalizedMessage('GROUP_UPDATED', locale),
      data: updatedGroup,
    };
  }

  /**
   * Delete a group
   * @param groupId
   * @param userId
   * @param locale
   */
  async deleteGroup(groupId: string, userId: string, locale: Locale = 'en') {
    const group = await this.prisma.friendGroup.findUnique({
      where: { id: groupId },
    });

    if (!group) {
      throw new NotFoundException({
        error: 'GROUP_NOT_FOUND',
        message: getLocalizedMessage('GROUP_NOT_FOUND', locale),
      });
    }

    if (group.userId !== userId) {
      throw new BadRequestException({
        error: 'FORBIDDEN',
        message: getLocalizedMessage('FORBIDDEN', locale),
      });
    }

    await this.prisma.friendGroup.delete({
      where: { id: groupId },
    });

    return {
      message: getLocalizedMessage('GROUP_DELETED', locale),
    };
  }

  /**
   * Add a member to a group
   * @param groupId
   * @param friendId
   * @param userId
   * @param locale
   */
  async addMemberToGroup(
    groupId: string,
    friendId: string,
    userId: string,
    locale: Locale = 'en',
  ) {
    const group = await this.prisma.friendGroup.findUnique({
      where: { id: groupId },
    });

    if (!group) {
      throw new NotFoundException({
        error: 'GROUP_NOT_FOUND',
        message: getLocalizedMessage('GROUP_NOT_FOUND', locale),
      });
    }

    if (group.userId !== userId) {
      throw new BadRequestException({
        error: 'FORBIDDEN',
        message: getLocalizedMessage('FORBIDDEN', locale),
      });
    }

    // Verify they are friends
    const friendship = await this.prisma.friend.findFirst({
      where: {
        OR: [
          { userId, friendId, status: FriendStatus.ACCEPTED },
          { userId: friendId, friendId: userId, status: FriendStatus.ACCEPTED },
        ],
      },
    });

    if (!friendship) {
      throw new BadRequestException({
        error: 'ONLY_FRIENDS_CAN_BE_ADDED',
        message: getLocalizedMessage('ONLY_FRIENDS_CAN_BE_ADDED', locale),
      });
    }

    // Check if already a member
    const existingMember = await this.prisma.friendGroupMember.findUnique({
      where: {
        groupId_userId: {
          groupId,
          userId: friendId,
        },
      },
    });

    if (existingMember) {
      throw new BadRequestException({
        error: 'ALREADY_GROUP_MEMBER',
        message: getLocalizedMessage('ALREADY_GROUP_MEMBER', locale),
      });
    }

    const member = await this.prisma.friendGroupMember.create({
      data: {
        groupId,
        userId: friendId,
      },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
            image: true,
            createdAt: true,
          },
        },
      },
    });

    return {
      message: getLocalizedMessage('MEMBER_ADDED', locale),
      data: member,
    };
  }

  /**
   * Remove a member from a group
   */
  async removeMemberFromGroup(
    groupId: string,
    memberId: string,
    userId: string,
    locale: Locale = 'en',
  ) {
    const group = await this.prisma.friendGroup.findUnique({
      where: { id: groupId },
    });

    if (!group) {
      throw new NotFoundException({
        error: 'GROUP_NOT_FOUND',
        message: getLocalizedMessage('GROUP_NOT_FOUND', locale),
      });
    }

    if (group.userId !== userId) {
      throw new BadRequestException({
        error: 'FORBIDDEN',
        message: getLocalizedMessage('FORBIDDEN', locale),
      });
    }

    const member = await this.prisma.friendGroupMember.findUnique({
      where: { id: memberId },
    });

    if (!member || member.groupId !== groupId) {
      throw new NotFoundException({
        error: 'NOT_FOUND',
        message: getLocalizedMessage('NOT_FOUND', locale),
      });
    }

    await this.prisma.friendGroupMember.delete({
      where: { id: memberId },
    });

    return createSuccessResponse(
      null,
      getLocalizedMessage('MEMBER_REMOVED', locale),
    );
  }
}
