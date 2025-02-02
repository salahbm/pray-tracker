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

    // Fetch accepted friends in both directions
    const friends = await prisma.friend.findMany({
      where: {
        OR: [
          { userId, status: 'APPROVED' },
          { friendId: userId, status: 'APPROVED' },
        ],
      },
      select: {
        friend: { select: { id: true, username: true, email: true } },
        user: { select: { id: true, username: true } },
      },
    });

    // Extract valid friend IDs (exclude current user)
    const friendIds = friends
      .filter((f) => f.friend && f.user) // Ensure no undefined values
      .map((f) => (f.friend.id === userId ? f.user.id : f.friend.id));

    if (friendIds.length === 0) {
      return createResponse({
        status: StatusCode.SUCCESS,
        message: 'No friends found',
        code: MessageCodes.NOT_FOUND,
        data: [],
      });
    }

    // Get today's date in YYYY-MM-DD format (ignores time)
    const today = new Date();
    const startOfDay = new Date(today.setHours(0, 0, 0, 0));
    const endOfDay = new Date(today.setHours(23, 59, 59, 999));

    // Fetch today's prayers for friends
    const prayers = await prisma.prays.findMany({
      where: {
        userId: { in: friendIds.length > 0 ? friendIds : null }, // Prevent Prisma empty list error
        date: {
          gte: startOfDay,
          lte: endOfDay,
        },
      },
      include: { user: { select: { id: true, username: true } } },
    });

    return createResponse({
      status: StatusCode.SUCCESS,
      message: 'Friends fetched successfully',
      code: MessageCodes.FRIEND_FETCHED,
      data: {
        friends,
        prayers,
      },
    });
  } catch (error) {
    return handleError(error);
  }
}
