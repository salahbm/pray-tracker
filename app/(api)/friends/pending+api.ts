import prisma from '@/lib/prisma';
import { ApiError, handleError } from '@/utils/error';
import { createResponse, MessageCodes, StatusCode } from '@/utils/status';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get('userId');

    if (!userId) {
      throw new ApiError('Missing required fields', StatusCode.BAD_REQUEST, {
        fields: { userId },
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

    const friendArray = friends.map((friend) => {
      return {
        id: friend.id,
        status: friend.status,
        friendId: friend.friend.id,
        friendUsername: friend.friend.username,
        friendEmail: friend.user.email,
        friendAvatar: friend.user.photo,
      };
    });

    return createResponse({
      status: StatusCode.SUCCESS,
      message: 'Friends fetched successfully',
      code: MessageCodes.FRIEND_FETCHED,
      data: friendArray,
    });
  } catch (error) {
    return handleError(error);
  }
}
