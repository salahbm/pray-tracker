import prisma from 'lib/prisma';
import { ApiError, handleError } from 'utils/error';
import { createResponse, StatusCode } from 'utils/status';

export default async function DELETE(request: Request) {
  try {
    const { userId, friendId } = await request.json();

    if (!userId || !friendId) {
      throw new ApiError('Missing required fields', StatusCode.BAD_REQUEST, {
        fields: { userId, friendId },
      });
    }

    // Find the pending friend request
    const friendRequest = await prisma.friend.findFirst({
      where: {
        userId,
        friendId,
        status: 'pending',
      },
    });

    if (!friendRequest) {
      throw new ApiError(
        'Friend request not found or already accepted.',
        StatusCode.NOT_FOUND,
      );
    }

    // Delete the pending request
    await prisma.friend.delete({
      where: { id: friendRequest.id },
    });

    return createResponse(
      StatusCode.SUCCESS,
      'Friend request canceled successfully.',
    );
  } catch (error) {
    console.error(error);
    return handleError(error);
  }
}
