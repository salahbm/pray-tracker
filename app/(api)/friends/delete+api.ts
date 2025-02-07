import prisma from 'lib/prisma';
import { ApiError, handleError } from 'utils/error';
import { createResponse, MessageCodes, StatusCode } from 'utils/status';

export async function DELETE(request: Request) {
  try {
    const { userId, friendId } = await request.json();

    if (!userId || !friendId) {
      throw new ApiError('Missing required fields', StatusCode.BAD_REQUEST, {
        fields: { userId, friendId },
      });
    }

    // Find the approved friend request
    const deleteFriend = await prisma.friend.findFirst({
      where: {
        userId,
        friendId,
        status: 'APPROVED',
      },
    });

    if (!deleteFriend) {
      throw new ApiError(
        'Friend request not found or already removed.',
        StatusCode.NOT_FOUND,
      );
    }

    // Delete the approved request
    await prisma.friend.delete({
      where: { id: deleteFriend.id },
    });

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
