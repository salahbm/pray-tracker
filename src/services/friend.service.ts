import { PrismaClient } from '@prisma/client';
import { sendPushNotification } from '../utils/notification';
import { FriendStatus } from '../generated/prisma';
import type {
  IFriend,
  PendingFriend,
  ApprovedFriend,
  FriendRequestResponse,
} from '../types/friends';
import { ApiError } from '../middleware/error-handler';
import { StatusCode } from '../utils/status';

export class FriendService {
  constructor(private prisma: PrismaClient) {}

  async getApprovedFriends(userId: string): Promise<ApprovedFriend[]> {
    const friends = await this.prisma.friend.findMany({
      where: {
        OR: [
          { userId, status: FriendStatus.APPROVED },
          { friendId: userId, status: FriendStatus.APPROVED },
        ],
      },
      select: {
        id: true,
        status: true,
        friend: {
          select: {
            id: true,
            username: true,
            email: true,
            photo: true,
            deviceToken: true,
            prays: {
              where: {
                date: {
                  gte: new Date(new Date().setHours(0, 0, 0, 0)),
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
            },
          },
        },
        user: {
          select: {
            id: true,
            username: true,
            email: true,
            photo: true,
            deviceToken: true,
            prays: {
              where: {
                date: {
                  gte: new Date(new Date().setHours(0, 0, 0, 0)),
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
            },
          },
        },
      },
    });

    // Transform data to match the ApprovedFriend type
    return friends.map((f) => {
      const friendData = f.userId === userId ? f.friend : f.user;
      return {
        friend: {
          friendshipId: f.id,
          id: friendData.id,
          username: friendData.username,
          email: friendData.email,
          photo: friendData.photo,
          deviceToken: friendData.deviceToken,
          status: f.status,
        },
        prays: friendData.prays,
      };
    });
  }

  async getPendingRequests(userId: string): Promise<FriendRequestResponse> {
    const [sentBy, requests] = await Promise.all([
      // Requests received by the user
      this.prisma.friend.findMany({
        where: {
          friendId: userId,
          status: FriendStatus.PENDING,
        },
        include: {
          user: {
            select: {
              username: true,
              email: true,
              photo: true,
            },
          },
        },
      }),
      // Requests sent by the user
      this.prisma.friend.findMany({
        where: {
          userId,
          status: FriendStatus.PENDING,
        },
        include: {
          friend: {
            select: {
              username: true,
              email: true,
              photo: true,
            },
          },
        },
      }),
    ]);

    return {
      sentBy: sentBy.map((req) => ({
        id: req.id,
        userId: req.userId,
        friendId: req.friendId,
        username: req.user.username,
        email: req.user.email,
        photo: req.user.photo,
        status: req.status,
      })),
      requests: requests.map((req) => ({
        id: req.id,
        userId: req.userId,
        friendId: req.friendId,
        username: req.friend.username,
        email: req.friend.email,
        photo: req.friend.photo,
        status: req.status,
      })),
    };
  }

  async sendRequest(userId: string, friendId: string): Promise<IFriend> {
    // Check if users exist
    const [user, friend] = await Promise.all([
      this.prisma.user.findUnique({ where: { id: userId } }),
      this.prisma.user.findUnique({ where: { id: friendId } }),
    ]);

    if (!user || !friend) {
      throw new ApiError({
        message: 'User not found',
        status: StatusCode.NOT_FOUND,
      });
    }

    // Check if request already exists
    const existingRequest = await this.prisma.friend.findFirst({
      where: {
        OR: [
          { userId, friendId },
          { userId: friendId, friendId: userId },
        ],
      },
    });

    if (existingRequest) {
      throw new ApiError({
        message: 'Friend request already exists',
        status: StatusCode.BAD_REQUEST,
      });
    }

    // Create friend request
    const request = await this.prisma.friend.create({
      data: {
        userId,
        friendId,
        status: FriendStatus.PENDING,
      },
    });

    // Send push notification if device token exists
    if (friend.deviceToken) {
      await sendPushNotification({
        to: friend.deviceToken,
        title: 'New Friend Request',
        body: `${user.username} sent you a friend request`,
      });
    }

    // Return formatted friend data
    return {
      friendshipId: request.id,
      id: friend.id,
      username: friend.username,
      email: friend.email,
      photo: friend.photo,
      deviceToken: friend.deviceToken,
      status: request.status,
    };
  }

  async approveRequest(requestId: string): Promise<IFriend> {
    const request = await this.prisma.friend.findUnique({
      where: { id: requestId },
      include: {
        user: true,
        friend: true,
      },
    });

    if (!request) {
      throw new ApiError({
        message: 'Friend request not found',
        status: StatusCode.NOT_FOUND,
      });
    }

    if (request.status !== FriendStatus.PENDING) {
      throw new ApiError({
        message: 'Friend request is not pending',
        status: StatusCode.BAD_REQUEST,
      });
    }

    const updatedRequest = await this.prisma.friend.update({
      where: { id: requestId },
      data: { status: FriendStatus.APPROVED },
    });

    // Send push notification to requester
    if (request.user.deviceToken) {
      await sendPushNotification({
        to: request.user.deviceToken,
        title: 'Friend Request Accepted',
        body: `${request.friend.username} accepted your friend request`,
      });
    }

    // Return formatted friend data
    return {
      friendshipId: updatedRequest.id,
      id: request.user.id,
      username: request.user.username,
      email: request.user.email,
      photo: request.user.photo,
      deviceToken: request.user.deviceToken,
      status: updatedRequest.status,
    };
  }

  async rejectRequest(requestId: string): Promise<void> {
    const request = await this.prisma.friend.findUnique({
      where: { id: requestId },
      include: {
        user: true,
        friend: true,
      },
    });

    if (!request) {
      throw new ApiError({
        message: 'Friend request not found',
        status: StatusCode.NOT_FOUND,
      });
    }

    await this.prisma.friend.delete({
      where: { id: requestId },
    });

    // Notify the requester
    if (request.user.deviceToken) {
      await sendPushNotification({
        to: request.user.deviceToken,
        title: 'Friend Request Update',
        body: `${request.friend.username} declined your friend request`,
      });
    }
  }
}
