import prisma from '@/lib/prisma';
import { FriendStatus } from '@/lib/prisma/client';
import { ApiError, handleError } from '@/utils/error';
import { createResponse, MessageCodes, StatusCode } from '@/utils/status';

export async function POST(request: Request) {
  try {
    const { userId, friendEmail } = await request.json();

    if (!userId || !friendEmail) {
      throw new ApiError({
        message: 'Missing required fields',
        status: StatusCode.BAD_REQUEST,
        code: MessageCodes.BAD_REQUEST,
        details: { userId, friendEmail },
      });
    }

    // Find the friend user by email
    const friend = await prisma.user.findUnique({
      where: { email: friendEmail },
    });

    if (!friend) {
      throw new ApiError({
        message: 'Friend not found',
        status: StatusCode.NOT_FOUND,
        code: MessageCodes.FRIEND_NOT_FOUND,
        details: { friendEmail },
      });
    }

    const friendId = friend.id;

    // Check for existing friendship in both directions
    const existingFriendship = await prisma.friend.findFirst({
      where: {
        OR: [
          { userId, friendId },
          { userId: friendId, friendId: userId },
        ],
      },
    });

    if (existingFriendship) {
      throw new ApiError({
        message: 'Friend request already sent or exists',
        status: StatusCode.CONFLICT,
        code: MessageCodes.FRIEND_EXISTS,
        details: { userId, friendId },
      });
    }

    // Create the friend request, including related data
    const friendRequest = await prisma.friend.create({
      data: {
        userId,
        friendId,
        status: FriendStatus.PENDING,
      },
      include: {
        friend: true,
      },
    });

    const user = await prisma.user.findUnique({
      where: { id: userId },
    });

    return createResponse({
      status: StatusCode.SUCCESS,
      message: 'Friend request sent successfully',
      code: MessageCodes.FRIEND_REQUESTED,
      data: {
        sentBy: {
          id: user?.id,
          username: user?.username,
          email: user?.email,
          photo: user?.photo,
        },
        friend: {
          friendshipId: friendRequest.id,
          id: friendRequest.friend.id,
          deviceToken: friendRequest.friend.deviceToken,
          username: friendRequest.friend.username,
          email: friendRequest.friend.email,
          photo: friendRequest.friend.photo,
          status: FriendStatus.PENDING,
        },
      },
    });
  } catch (error) {
    return handleError(error);
  }
}
