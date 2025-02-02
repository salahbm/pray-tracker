import prisma from '@/lib/prisma';
import { ApiError, handleError } from '@/utils/error';
import { createResponse, MessageCodes, StatusCode } from '@/utils/status';

export async function POST(request: Request) {
  try {
    const { userId, friendId } = await request.json();

    if (!userId || !friendId) {
      throw new ApiError('Missing required fields', StatusCode.BAD_REQUEST, {
        fields: { userId, friendId },
      });
    }

    // Check if the friend request exists and is pending
    const existingFriendship = await prisma.friend.findFirst({
      where: {
        OR: [
          { userId, friendId, status: 'PENDING' },
          { userId: friendId, friendId: userId, status: 'PENDING' }, // Check both directions
        ],
      },
    });

    if (!existingFriendship) {
      return createResponse({
        status: StatusCode.NOT_FOUND,
        message: 'Friend request not found or already approved',
        code: MessageCodes.FRIEND_NOT_FOUND,
        data: [],
      });
    }

    // Approve the friend request
    const updatedFriendship = await prisma.friend.update({
      where: { id: existingFriendship.id }, // Use the found friendship ID
      data: { status: 'APPROVED' }, // Update status to APPROVED
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
