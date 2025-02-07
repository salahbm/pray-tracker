import prisma from '@/lib/prisma';
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
        details: {
          userId,
          friendEmail,
        },
      });
    }

    // Find the friend's ID from their email
    const friend = await prisma.user.findUnique({
      where: { email: friendEmail },
    });

    if (!friend) {
      throw new ApiError({
        message: 'Friend not found',
        status: StatusCode.NOT_FOUND,
        code: MessageCodes.FRIEND_NOT_FOUND,
        details: {
          friendEmail,
        },
      });
    }

    const friendId = friend.id;

    // **Fix: Use findFirst Instead of findUnique**
    const existingFriendship = await prisma.friend.findFirst({
      where: {
        OR: [
          { userId, friendId },
          { userId: friendId, friendId: userId }, // Check both directions
        ],
      },
    });

    if (existingFriendship) {
      throw new ApiError({
        message: 'Friend request already sent',
        status: StatusCode.BAD_REQUEST,
        code: MessageCodes.FRIEND_EXISTS,
        details: {
          userId,
          friendId,
        },
      });
    }

    // Create friendship request
    const friendRequest = await prisma.friend.create({
      data: { userId, friendId, status: 'PENDING' },
    });

    return createResponse({
      status: StatusCode.SUCCESS,
      message: 'Friend request sent successfully',
      code: MessageCodes.FRIEND_REQUESTED,
      data: [friendRequest],
    });
  } catch (error) {
    return handleError(error);
  }
}
