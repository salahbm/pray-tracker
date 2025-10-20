import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '@/db/prisma.service';
import { FriendStatus } from 'generated/prisma';
import { getErrorMessage } from '@/common/i18n/error-messages';
import { Locale } from '@/common/utils/response.utils';

type FriendGroupMemberSummary = {
  id: string;
  userId: string;
  username: string;
  email: string;
  photo: string;
};

type FriendGroupSummary = {
  id: string;
  name: string;
  memberCount: number;
  members: FriendGroupMemberSummary[];
  createdAt: Date;
  updatedAt: Date;
};

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
      throw new NotFoundException(getErrorMessage('USER_NOT_FOUND', locale));
    }

    // Check if trying to add self
    if (userId === friend.id) {
      throw new BadRequestException(
        getErrorMessage('CANNOT_SEND_REQUEST_TO_SELF', locale),
      );
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
        throw new BadRequestException(
          getErrorMessage('ALREADY_FRIENDS', locale),
        );
      }
      throw new BadRequestException(
        getErrorMessage('FRIEND_REQUEST_ALREADY_EXISTS', locale),
      );
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
      message: getErrorMessage('FRIEND_REQUEST_SENT', locale),
      data: friendship,
    };
  }

  /**
   * Get pending friend requests (sent and received)
   */
  async getPendingRequests(userId: string) {
    // Requests sent by user
    const sentRequests = await this.prisma.friend.findMany({
      where: {
        userId,
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

    // Requests received by user
    const receivedRequests = await this.prisma.friend.findMany({
      where: {
        friendId: userId,
        status: FriendStatus.PENDING,
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
      },
    });

    return {
      requests: sentRequests.map((req) => ({
        id: req.id,
        userId: req.userId,
        friendId: req.friendId,
        username: req.friend.name,
        email: req.friend.email,
        photo: req.friend.image || '',
        status: req.status,
      })),
      sentBy: receivedRequests.map((req) => ({
        id: req.id,
        userId: req.userId,
        friendId: req.friendId,
        username: req.user.name,
        email: req.user.email,
        photo: req.user.image || '',
        status: req.status,
      })),
    };
  }

  /**
   * Get approved friends with their prayers
   */
  async getApprovedFriends(userId: string) {
    const friendships = await this.prisma.friend.findMany({
      where: {
        OR: [
          { userId, status: FriendStatus.ACCEPTED },
          { friendId: userId, status: FriendStatus.ACCEPTED },
        ],
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
    });

    // Get friend details and their prayers
    const approvedFriends = await Promise.all(
      friendships.map(async (friendship) => {
        const friendData =
          friendship.userId === userId ? friendship.friend : friendship.user;
        const friendId = friendData.id;

        // Get friend's prayers for today
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        const prayers = await this.prisma.prayer.findMany({
          where: {
            userId: friendId,
            date: {
              gte: today,
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
        });

        return {
          friend: {
            friendshipId: friendship.id,
            id: friendId,
            deviceToken: '',
            username: friendData.name,
            email: friendData.email,
            photo: friendData.image || '',
            status: friendship.status,
          },
          prays: prayers.map((prayer) => ({
            fajr: prayer.fajr ?? 0,
            dhuhr: prayer.dhuhr ?? 0,
            asr: prayer.asr ?? 0,
            maghrib: prayer.maghrib ?? 0,
            isha: prayer.isha ?? 0,
            nafl: prayer.nafl ?? 0,
          })),
        };
      }),
    );

    return approvedFriends;
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
      throw new NotFoundException(
        getErrorMessage('FRIEND_REQUEST_NOT_FOUND', locale),
      );
    }

    // Only the receiver can accept
    if (friendship.friendId !== userId) {
      throw new BadRequestException(getErrorMessage('FORBIDDEN', locale));
    }

    const updatedFriendship = await this.prisma.friend.update({
      where: { id: friendshipId },
      data: { status: FriendStatus.ACCEPTED },
    });

    return {
      message: getErrorMessage('FRIEND_REQUEST_ACCEPTED', locale),
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
      throw new NotFoundException(
        getErrorMessage('FRIEND_REQUEST_NOT_FOUND', locale),
      );
    }

    // Only the receiver can reject
    if (friendship.friendId !== userId) {
      throw new BadRequestException(getErrorMessage('FORBIDDEN', locale));
    }

    await this.prisma.friend.delete({
      where: { id: friendshipId },
    });

    return {
      message: getErrorMessage('FRIEND_REQUEST_REJECTED', locale),
    };
  }

  /**
   * Remove a friend
   */
  async removeFriend(
    friendshipId: string,
    friendId: string,
    locale: Locale = 'en',
  ) {
    const friendship = await this.prisma.friend.findUnique({
      where: { id: friendshipId },
    });

    if (!friendship) {
      throw new NotFoundException(getErrorMessage('FRIEND_NOT_FOUND', locale));
    }

    await this.prisma.friend.delete({
      where: { id: friendshipId },
    });

    return {
      message: getErrorMessage('FRIEND_REMOVED', locale),
    };
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

    return {
      message: getErrorMessage('GROUP_CREATED', locale),
      data: group,
    };
  }

  /**
   * Get all groups for a user
   */
  async getGroups(userId: string): Promise<FriendGroupSummary[]> {
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

    const formattedGroups = groups.map<FriendGroupSummary>((group) => ({
      id: group.id,
      name: group.name,
      memberCount: group.members.length,
      members: group.members.map<FriendGroupMemberSummary>((member) => ({
        id: member.id,
        userId: member.userId,
        username: member.user?.name ?? '',
        email: member.user?.email ?? '',
        photo: member.user?.image ?? '',
      })),
      createdAt: group.createdAt,
      updatedAt: group.updatedAt,
    }));

    return formattedGroups as FriendGroupSummary[];
  }

  /**
   * Get group members with their prayers
   */
  async getGroupMembers(groupId: string, userId: string) {
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
              },
            },
          },
        },
      },
    });

    if (!group) {
      throw new NotFoundException('Group not found');
    }

    // Verify user owns the group
    if (group.userId !== userId) {
      throw new BadRequestException('You do not have access to this group');
    }

    // Get prayers for each member
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const membersWithPrayers = await Promise.all(
      group.members.map(async (member) => {
        const prayers = await this.prisma.prayer.findMany({
          where: {
            userId: member.userId,
            date: {
              gte: today,
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
        });

        return {
          id: member.id,
          userId: member.userId,
          username: member.user.name,
          email: member.user.email,
          photo: member.user.image || '',
          prays: prayers.map((prayer) => ({
            fajr: prayer.fajr ?? 0,
            dhuhr: prayer.dhuhr ?? 0,
            asr: prayer.asr ?? 0,
            maghrib: prayer.maghrib ?? 0,
            isha: prayer.isha ?? 0,
            nafl: prayer.nafl ?? 0,
          })),
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
      throw new NotFoundException('Group not found');
    }

    if (group.userId !== userId) {
      throw new BadRequestException(getErrorMessage('FORBIDDEN', locale));
    }

    const updatedGroup = await this.prisma.friendGroup.update({
      where: { id: groupId },
      data: { name },
    });

    return {
      message: getErrorMessage('GROUP_UPDATED', locale),
      data: updatedGroup,
    };
  }

  /**
   * Delete a group
   */
  async deleteGroup(groupId: string, userId: string, locale: Locale = 'en') {
    const group = await this.prisma.friendGroup.findUnique({
      where: { id: groupId },
    });

    if (!group) {
      throw new NotFoundException('Group not found');
    }

    if (group.userId !== userId) {
      throw new BadRequestException(getErrorMessage('FORBIDDEN', locale));
    }

    await this.prisma.friendGroup.delete({
      where: { id: groupId },
    });

    return {
      message: getErrorMessage('GROUP_DELETED', locale),
    };
  }

  /**
   * Add a member to a group
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
      throw new NotFoundException('Group not found');
    }

    if (group.userId !== userId) {
      throw new BadRequestException(getErrorMessage('FORBIDDEN', locale));
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
      throw new BadRequestException('You can only add friends to groups');
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
      throw new BadRequestException('User is already a member of this group');
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
          },
        },
      },
    });

    return {
      message: getErrorMessage('MEMBER_ADDED', locale),
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
      throw new NotFoundException('Group not found');
    }

    if (group.userId !== userId) {
      throw new BadRequestException(getErrorMessage('FORBIDDEN', locale));
    }

    const member = await this.prisma.friendGroupMember.findUnique({
      where: { id: memberId },
    });

    if (!member || member.groupId !== groupId) {
      throw new NotFoundException('Member not found in this group');
    }

    await this.prisma.friendGroupMember.delete({
      where: { id: memberId },
    });

    return {
      message: getErrorMessage('MEMBER_REMOVED', locale),
    };
  }
}
