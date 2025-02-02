import prisma from '@/lib/prisma';
import { ApiError, handleError } from '@/utils/error';
import { createResponse, MessageCodes, StatusCode } from '@/utils/status';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get('userId');

    if (!userId) {
      throw new ApiError('Missing required fields', StatusCode.BAD_REQUEST, {
        fields: { userId },
      });
    }

    // Fetch only approved friends
    const friends = await prisma.friend.findMany({
      where: {
        OR: [{ userId }, { friendId: userId }],
        status: 'APPROVED', // Fix: Use uppercase ENUM value
      },
      select: {
        id: true,
        status: true,
        friend: {
          select: {
            id: true,
            username: true,
          },
        },
        user: {
          select: {
            id: true,
            username: true,
          },
        },
      },
    });

    // Extract friend user IDs
    const friendIds = friends.map((f) =>
      f.friend?.id === userId ? f.user.id : f.friend.id,
    );

    if (friendIds.length === 0) {
      return createResponse({
        status: StatusCode.SUCCESS,
        message: 'No approved friends found',
        code: MessageCodes.FRIEND_NOT_FOUND,
        data: [],
      });
    }

    // Get today's date (without time)
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Reset time to midnight

    // Fetch today's prayers for friends
    const prays = await prisma.prays.findMany({
      where: {
        userId: { in: friendIds },
        date: { gte: today }, // Get prayers from today
      },
      orderBy: { date: 'asc' }, // Order prayers by date
    });

    return createResponse({
      status: StatusCode.SUCCESS,
      message: 'Friends and their prayers fetched successfully',
      code: MessageCodes.FRIEND_FETCHED,
      data: { friends, prays },
    });
  } catch (error) {
    return handleError(error);
  }
}
