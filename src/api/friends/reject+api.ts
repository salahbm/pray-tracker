import prisma from 'lib/prisma';
import { ApiError, handleError } from 'utils/error';
import { createResponse, MessageCodes, StatusCode } from 'utils/status';

// REJECT FRIEND REQUEST

export async function DELETE(request: Request) {
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
        message: 'Friend request not found or already approved',
        status: StatusCode.NOT_FOUND,
        code: MessageCodes.FRIEND_FRIENDSHIP_NOT_FOUND,
        details: {
          userId,
          friendId,
          friendshipId,
        },
      });
    }

    // Reject the friend request
    const updatedFriendship = await prisma.friend.delete({
      where: {
        id: existingFriendship.id,
      },
    });

    return createResponse({
      status: StatusCode.SUCCESS,
      message: 'Friend request rejected successfully',
      code: MessageCodes.FRIEND_REJECTED,
      data: updatedFriendship,
    });
  } catch (error) {
    return handleError(error);
  }
}
