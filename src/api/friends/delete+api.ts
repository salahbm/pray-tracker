import prisma from 'lib/prisma';
import { ApiError, handleError } from 'utils/error';
import { createResponse, MessageCodes, StatusCode } from 'utils/status';

// DELETE APPROVED FRIENDSHIP
export async function DELETE(request: Request) {
  try {
    const { friendId, friendshipId } = await request.json();

    if (!friendId) {
      throw new ApiError({
        message: 'Missing required fields',
        status: StatusCode.BAD_REQUEST,
        code: MessageCodes.BAD_REQUEST,
        details: {
          friendId,
          friendshipId,
        },
      });
    }

    const deletedFriendship = await prisma.friend.delete({
      where: {
        id: friendshipId,
        OR: [{ userId: friendId }, { friendId: friendId }],
      },
    });

    if (!deletedFriendship) {
      throw new ApiError({
        message: 'Friendship not found',
        status: StatusCode.NOT_FOUND,
        code: MessageCodes.FRIEND_FRIENDSHIP_NOT_FOUND,
        details: {
          friendId,
          friendshipId,
        },
      });
    }

    return createResponse({
      status: StatusCode.SUCCESS,
      message: 'Friend deleted successfully',
      code: MessageCodes.FRIEND_DELETED,
      data: null,
    });
  } catch (error) {
    return handleError(error);
  }
}
