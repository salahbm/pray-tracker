import prisma from '@/lib/prisma';
import { ApiError, handleError } from '@/utils/error';
import { createResponse, MessageCodes, StatusCode } from '@/utils/status';

export async function POST(request: Request) {
  try {
    const { userId, friendId, friendshipId } = await request.json();

    if (!userId || !friendId) {
      throw new ApiError('Missing required fields', StatusCode.BAD_REQUEST, {
        fields: { userId, friendId, friendshipId },
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
      throw new ApiError(
        'Friend request not found or already approved',
        StatusCode.NOT_FOUND,
      );
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
