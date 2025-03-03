import prisma from '@/lib/prisma';
import { ApiError, handleError } from '@/utils/error';
import { createResponse, MessageCodes, StatusCode } from '@/utils/status';

export async function GET() {
  try {
    // get 100 users with highest points
    const users = await prisma.user.findMany({
      orderBy: {
        totalPoints: 'desc',
      },
      take: 100,
    });

    // return 100 users with highest points
    return createResponse({
      status: StatusCode.SUCCESS,
      message: 'Users fetched successfully',
      code: MessageCodes.USER_FETCHED,
      data: users,
    });
  } catch (error) {
    // Use handleError to standardize the response for all errors
    return handleError(error);
  }
}
