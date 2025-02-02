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

    // Fetch approved friends including status
    const friends = await prisma.friend.findMany({
      where: {
        OR: [
          { userId, status: 'APPROVED' },
          { friendId: userId, status: 'APPROVED' },
        ],
      },
      select: {
        status: true, // Include status field
        friend: {
          select: {
            id: true,
            username: true,
            email: true,
            photo: true,
          },
        },
        user: { select: { id: true, username: true } },
      },
    });

    // Extract friend IDs (exclude current user)
    const friendIds = friends.map((f) =>
      f.friend.id === userId ? f.user.id : f.friend.id,
    );

    if (friendIds.length === 0) {
      return createResponse({
        status: StatusCode.SUCCESS,
        message: 'No approved friends found',
        code: MessageCodes.FRIEND_NOT_FOUND,
        data: { approved: { friends: [] } },
      });
    }

    // Get today's date range (ignores time)
    const today = new Date();
    const startOfDay = new Date(today.setHours(0, 0, 0, 0));
    const endOfDay = new Date(today.setHours(23, 59, 59, 999));

    // Fetch today's prayers for friends
    const prayers = await prisma.prays.findMany({
      where: {
        userId: { in: friendIds },
        date: {
          gte: startOfDay,
          lte: endOfDay,
        },
      },
      include: { user: { select: { id: true, username: true } } },
    });

    // Format data: group prayers with corresponding friend info
    const approvedFriends = friends.map((f) => {
      const friendInfo = f.friend.id === userId ? f.user : f.friend;
      const friendPrays = prayers.filter((p) => p.userId === friendInfo.id);

      return {
        friend: {
          ...friendInfo,
          status: f.status, // Include status in response
        },
        prays: friendPrays,
      };
    });

    return createResponse({
      status: StatusCode.SUCCESS,
      message: 'Approved friends and their prayers fetched successfully',
      code: MessageCodes.FRIEND_FETCHED,
      data: approvedFriends,
    });
  } catch (error) {
    return handleError(error);
  }
}
