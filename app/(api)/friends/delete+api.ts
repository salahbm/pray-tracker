import prisma from 'lib/prisma';
import { ApiError, handleError } from 'utils/error';
import { createResponse, MessageCodes, StatusCode } from 'utils/status';

// DELETE APPROVED FRIENDSHIP
export async function DELETE(request: Request) {
  try {
    const { friendId, friendshipId } = await request.json();

    if (!friendId) {
      throw new ApiError('Missing required fields', StatusCode.BAD_REQUEST, {
        fields: { friendId },
      });
    }

    const deletedFriendship = await prisma.friend.delete({
      where: {
        id: friendshipId,
        OR: [{ userId: friendId }, { friendId: friendId }],
      },
    });

    if (!deletedFriendship) {
      return createResponse({
        status: StatusCode.NOT_FOUND,
        message: 'Friendship not found',
        code: MessageCodes.FRIEND_NOT_FOUND,
        data: null,
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
