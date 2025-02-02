import prisma from 'lib/prisma';
import { ApiError, handleError } from 'utils/error';
import { createResponse, MessageCodes, StatusCode } from 'utils/status';

export async function GET(request: Request) {
  try {
    const { userId } = await request.json();

    if (!userId) {
      throw new ApiError('Missing required fields', StatusCode.BAD_REQUEST, {
        fields: { userId },
      });
    }

    const friends = await prisma.friend.findMany({
      where: { userId, status: 'accepted' },
      include: { friend: true },
    });

    return createResponse({
      status: StatusCode.SUCCESS,
      message: 'Friends fetched successfully',
      code: MessageCodes.FRIEND_FETCHED,
      data: friends,
    });
  } catch (error) {
    // Use handleError to standardize the response for all errors
    return handleError(error);
  }
}
