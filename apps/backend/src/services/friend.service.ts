// src/services/friend.service.ts
import type { Friend, Prays, User } from '@prayer/db';
import { FriendStatus } from '@prayer/db';
import { prisma } from '../lib/prisma';
import { ApiError } from '../middleware/error-handler';
import { StatusCode, MessageCodes } from '../utils/status';


type FriendWithRelations = Friend & { user: User; friend: User };
type PrayerWithUser = Prays & { user: User };
type PendingItem = {
  id: string;
  userId: string;
  friendId: string;
  username: string;
  email: string;
  photo: string | null | undefined;
  status: FriendStatus;
};

export class FriendService {
  static async getApprovedFriends(userId: string) {
    if (!userId) {
      throw new ApiError({
        message: 'Missing userId',
        status: StatusCode.BAD_REQUEST,
        code: MessageCodes.BAD_REQUEST,
      });
    }

    const friends = (await prisma.friend.findMany({
      where: {
        OR: [
          { userId, status: 'APPROVED' },
          { friendId: userId, status: 'APPROVED' },
        ],
      },
      select: {
        id: true,
        status: true,
        friend: true,
        user: true,
      },
    })) as FriendWithRelations[];

    const friendIds = friends.map((f) =>
      f.friend.id === userId ? f.user.id : f.friend.id
    );

    const today = new Date();
    const startOfDay = new Date(today.setHours(0, 0, 0, 0));
    const endOfDay = new Date(today.setHours(23, 59, 59, 999));

    const prayers = (await prisma.prays.findMany({
      where: {
        userId: { in: friendIds },
        date: {
          gte: startOfDay,
          lte: endOfDay,
        },
      },
      include: { user: true },
    })) as PrayerWithUser[];

    return friends.map((f) => {
      const info = f.friend.id === userId ? f.user : f.friend;
      const todayPrays = prayers.filter((p) => p.userId === info.id);
      return {
        friend: {
          friendshipId: f.id,
          id: info.id,
          username: info.username,
          email: info.email,
          photo: info.photo,
          status: f.status,
          deviceToken: info.deviceToken,
        },
        prays: todayPrays.length
          ? todayPrays
          : [
              {
                id: '',
                userId: info.id,
                date: new Date(),
                fajr: 0,
                dhuhr: 0,
                asr: 0,
                maghrib: 0,
                isha: 0,
                nafl: 0,
                createdAt: new Date(),
                updatedAt: new Date(),
                user: info,
              } as PrayerWithUser,
            ],
      };
    });
  }

  static async getPendingFriendRequests(userId: string) {
    if (!userId) {
      throw new ApiError({
        message: 'Missing userId',
        status: StatusCode.BAD_REQUEST,
        code: MessageCodes.BAD_REQUEST,
      });
    }

    const friends = (await prisma.friend.findMany({
      where: {
        OR: [
          { userId, status: 'PENDING' },
          { friendId: userId, status: 'PENDING' },
        ],
      },
      include: {
        friend: true,
        user: true,
      },
    })) as FriendWithRelations[];

    const sentBy: PendingItem[] = [];
    const requests: PendingItem[] = [];

    for (const f of friends) {
      const isSender = f.userId === userId;
      const other = isSender ? f.friend : f.user;
      const item: PendingItem = {
        id: f.id,
        userId: f.userId,
        friendId: f.friendId,
        username: other.username,
        email: other.email,
        photo: other.photo,
        status: f.status,
      };
      if (isSender) requests.push(item);
      else sentBy.push(item);
    }

    return { sentBy, requests };
  }

  static async sendFriendRequest({
    userId,
    friendEmail,
  }: {
    userId: string;
    friendEmail: string;
  }) {
    if (!userId || !friendEmail) {
      throw new ApiError({
        message: 'Missing required fields',
        status: StatusCode.BAD_REQUEST,
        code: MessageCodes.BAD_REQUEST,
        details: { userId, friendEmail },
      });
    }

    const friend = await prisma.user.findUnique({
      where: { email: friendEmail },
    });
    if (!friend) {
      throw new ApiError({
        message: 'Friend not found',
        status: StatusCode.NOT_FOUND,
        code: MessageCodes.FRIEND_NOT_FOUND,
      });
    }

    const friendId = friend.id;
    const exists = await prisma.friend.findFirst({
      where: {
        OR: [
          { userId, friendId },
          { userId: friendId, friendId: userId },
        ],
      },
    });

    if (exists) {
      throw new ApiError({
        message: 'Friend request already sent or exists',
        status: StatusCode.CONFLICT,
        code: MessageCodes.FRIEND_EXISTS,
      });
    }

    const created = await prisma.friend.create({
      data: { userId, friendId, status: FriendStatus.PENDING },
      include: { friend: true },
    });

    const user = await prisma.user.findUnique({ where: { id: userId } });

    return {
      sentBy: {
        id: user?.id,
        username: user?.username,
        email: user?.email,
        photo: user?.photo,
      },
      friend: {
        friendshipId: created.id,
        id: created.friend.id,
        deviceToken: created.friend.deviceToken,
        username: created.friend.username,
        email: created.friend.email,
        photo: created.friend.photo,
        status: FriendStatus.PENDING,
      },
    };
  }

  static async approveFriendRequest({
    userId,
    friendId,
    friendshipId,
  }: {
    userId: string;
    friendId: string;
    friendshipId: string;
  }) {
    if (!userId || !friendId) {
      throw new ApiError({
        message: 'Missing required fields',
        status: StatusCode.BAD_REQUEST,
        code: MessageCodes.BAD_REQUEST,
      });
    }

    const existing = await prisma.friend.findFirst({
      where: {
        id: friendshipId,
        OR: [
          { userId, friendId, status: 'PENDING' },
          { userId: friendId, friendId: userId, status: 'PENDING' },
        ],
      },
    });

    if (!existing) {
      throw new ApiError({
        message: 'Friend request not found or not pending',
        status: StatusCode.NOT_FOUND,
        code: MessageCodes.FRIEND_NOT_FOUND,
      });
    }

    return prisma.friend.update({
      where: { id: existing.id },
      data: { status: 'APPROVED' },
    });
  }

  static async rejectFriendRequest({
    userId,
    friendId,
    friendshipId,
  }: {
    userId: string;
    friendId: string;
    friendshipId: string;
  }) {
    if (!userId || !friendId) {
      throw new ApiError({
        message: 'Missing required fields',
        status: StatusCode.BAD_REQUEST,
        code: MessageCodes.BAD_REQUEST,
      });
    }

    const existing = await prisma.friend.findFirst({
      where: {
        id: friendshipId,
        OR: [
          { userId, friendId, status: 'PENDING' },
          { userId: friendId, friendId: userId, status: 'PENDING' },
        ],
      },
    });

    if (!existing) {
      throw new ApiError({
        message: 'Friend request not found or already approved',
        status: StatusCode.NOT_FOUND,
        code: MessageCodes.FRIEND_FRIENDSHIP_NOT_FOUND,
      });
    }

    return prisma.friend.delete({ where: { id: existing.id } });
  }

  static async deleteFriend({
    friendId,
    friendshipId,
  }: {
    friendId: string;
    friendshipId: string;
  }) {
    if (!friendId) {
      throw new ApiError({
        message: 'Missing required friendId',
        status: StatusCode.BAD_REQUEST,
        code: MessageCodes.BAD_REQUEST,
      });
    }

    const deleted = await prisma.friend.delete({
      where: {
        id: friendshipId,
        OR: [{ userId: friendId }, { friendId }],
      },
    });

    if (!deleted) {
      throw new ApiError({
        message: 'Friendship not found',
        status: StatusCode.NOT_FOUND,
        code: MessageCodes.FRIEND_FRIENDSHIP_NOT_FOUND,
      });
    }

    return null;
  }
}
