import prisma from '@/lib/prisma';
import { ApprovedFriend } from '@/types/friends';
import { ApiError, handleError } from '@/utils/error';
import { createResponse, MessageCodes, StatusCode } from '@/utils/status';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get('userId');

    if (!userId) {
      throw new ApiError({
        message: 'Missing required fields',
        status: StatusCode.BAD_REQUEST,
        code: MessageCodes.BAD_REQUEST,
        details: { userId },
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
        id: true, // Friendship ID
        status: true, // Include status field
        friend: {
          select: {
            id: true,
            username: true,
            email: true,
            photo: true,
          },
        },
        user: {
          select: { id: true, username: true, email: true, photo: true },
        },
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
    const startOfDay = new Date(today);
    startOfDay.setHours(0, 0, 0, 0);
    const endOfDay = new Date(today);
    endOfDay.setHours(23, 59, 59, 999);

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
    const approvedFriends: ApprovedFriend[] = friends.map((f) => {
      const friendInfo = f.friend.id === userId ? f.user : f.friend;
      const friendPrays = prayers.filter(
        (salah) => salah.userId === friendInfo.id,
      );

      return {
        friend: {
          friendshipId: f.id, // Fix missing assignment
          friendId: friendInfo.id,
          friendUsername: friendInfo.username,
          friendEmail: friendInfo.email,
          friendPhoto: friendInfo.photo,
          status: f.status, // Include status in response
        },
        prays:
          friendPrays.length > 0
            ? friendPrays
            : [
                {
                  userId: friendInfo.id,
                  username: friendInfo.username,
                  date: new Date(), // Ensure correct date assignment
                  fajr: 0,
                  dhuhr: 0,
                  asr: 0,
                  maghrib: 0,
                  isha: 0,
                  tahajjud: 0,
                },
              ],
      };
    });

    return createResponse({
      status: StatusCode.SUCCESS,
      message: 'Approved friends and their prayers fetched successfully',
      code: MessageCodes.FRIEND_FETCHED,
      data: approvedFriends ?? [],
    });
  } catch (error) {
    return handleError(error);
  }
}
