import prisma from '@/lib/prisma';
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

    // Fetch accepted friends in both directions
    const friends = await prisma.friend.findMany({
      where: {
        OR: [
          { userId, status: 'PENDING' },
          { friendId: userId, status: 'PENDING' },
        ],
      },
      select: {
        id: true, // Select the friendship ID
        status: true, // Fetch status from Friend model
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

    const friendArray: PendingFriend[] = friends.map((friend) => {
      return {
        id: friend.id,
        friendId: friend.friend.id,
        userId: friend.user.id,
        status: friend.status,
        friendUsername: friend.friend.username,
        friendEmail: friend.friend.email,
        friendAvatar: friend.friend.photo,
      };
    });

    return createResponse({
      status: StatusCode.SUCCESS,
      message: 'Friends fetched successfully',
      code: MessageCodes.FRIEND_FETCHED,
      data: friendArray ?? [],
    });
  } catch (error) {
    return handleError(error);
  }
}
