import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '@/db/prisma.service';
import { FriendStatus } from 'generated/prisma';
import { getErrorMessage } from '@/common/i18n/error-messages';
import { Locale } from '@/common/utils/response.utils';

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
}
