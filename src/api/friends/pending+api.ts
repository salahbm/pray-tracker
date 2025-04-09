import prisma from '@/lib/prisma';
import { FriendStatus } from '@/lib/prisma/client';
import { PendingFriend } from '@/types/friends';
import { ApiError, handleError } from '@/utils/error';
import { createResponse, MessageCodes, StatusCode } from '@/utils/status';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get('userId');

    if (!userId) {
      throw new ApiError({
        message: 'Missing required fields',
        status: StatusCode.BAD_REQUEST,
        code: MessageCodes.BAD_REQUEST,
        details: { userId },
      });
    }

    const friends = await prisma.friend.findMany({
      where: {
        OR: [
          { userId, status: FriendStatus.PENDING },
          { friendId: userId, status: FriendStatus.PENDING },
        ],
      },
      select: {
        id: true,
        status: true,
        userId: true,
        friendId: true,
        friend: {
          select: {
            id: true,
            username: true,
            photo: true,
            email: true,
          },
        },
        user: {
          select: {
            id: true,
            username: true,
            email: true,
            photo: true,
          },
        },
      },
    });

    const sentBy: PendingFriend[] = [];
    const requests: PendingFriend[] = [];

    for (const friend of friends) {
      const isUserSender = friend.userId === userId;

      const otherUser = isUserSender ? friend.friend : friend.user;

      const item: PendingFriend = {
        id: friend.id,
        userId: friend.userId,
        friendId: friend.friendId,
        username: otherUser.username,
        email: otherUser.email,
        photo: otherUser.photo,
        status: friend.status,
      };

      if (isUserSender) {
        requests.push(item); // I sent the request
      } else {
        sentBy.push(item); // I received the request
      }
    }

    return createResponse({
      status: StatusCode.SUCCESS,
      message: 'Pending friend requests fetched successfully',
      code: MessageCodes.FRIEND_FETCHED,
      data: { sentBy, requests },
    });
  } catch (error) {
    return handleError(error);
  }
}
