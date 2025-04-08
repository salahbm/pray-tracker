import prisma from '@/lib/prisma';
import { ApiError, handleError } from '@/utils/error';
import { createResponse, MessageCodes, StatusCode } from '@/utils/status';

export async function POST(request: Request) {
  try {
    const { userId, friendId, friendshipId } = await request.json();

    if (!userId || !friendId) {
      throw new ApiError({
        message: 'Missing required fields',
        status: StatusCode.BAD_REQUEST,
        code: MessageCodes.BAD_REQUEST,
        details: {
          userId,
          friendId,
          friendshipId,
        },
      });
    }

    // Check if the friend request exists and is pending
    const existingFriendship = await prisma.friend.findFirst({
      where: {
        id: friendshipId,
        OR: [
          { userId: userId, friendId, status: 'PENDING' },
          { userId: friendId, friendId: userId, status: 'PENDING' },
        ],
      },
      select: { id: true }, // Ensure we only fetch the ID
    });

    if (!existingFriendship) {
      throw new ApiError({
        message: 'Friend request not found or not pending',
        status: StatusCode.NOT_FOUND,
        code: MessageCodes.FRIEND_NOT_FOUND,
        details: {
          userId,
          friendId,
          friendshipId,
        },
      });
    }

    // Approve the friend request
    const updatedFriendship = await prisma.friend.update({
      where: { id: existingFriendship.id }, // Ensure Prisma uses the correct unique ID
      data: { status: 'APPROVED' },
    });

    return createResponse({
      status: StatusCode.SUCCESS,
      message: 'Friend request approved successfully',
      code: MessageCodes.FRIEND_APPROVED,
      data: updatedFriendship,
    });
  } catch (error) {
    return handleError(error);
  }
}
