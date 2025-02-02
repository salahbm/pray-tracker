import prisma from '@/lib/prisma';
import { handleError } from '@/utils/error';
import { createResponse, MessageCodes, StatusCode } from '@/utils/status';

export async function POST(request: Request) {
  try {
    const { userId, friendEmail } = await request.json();

    if (!userId || !friendEmail) {
      return createResponse({
        status: StatusCode.BAD_REQUEST,
        message: 'Missing required fields',
        code: MessageCodes.BAD_REQUEST,
        data: [],
      });
    }

    // Find the friend's ID from their email
    const friend = await prisma.user.findUnique({
      where: { email: friendEmail },
    });

    if (!friend) {
      return createResponse({
        status: StatusCode.NOT_FOUND,
        message: 'Friend not found',
        code: MessageCodes.FRIEND_NOT_FOUND,
        data: [],
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
      return createResponse({
        status: StatusCode.CONFLICT,
        message: 'Friendship already exists',
        code: MessageCodes.FRIEND_EXISTS,
        data: [],
      });
    }

    // Create friendship request
    const friendRequest = await prisma.friend.create({
      data: { userId, friendId, status: 'pending' },
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
