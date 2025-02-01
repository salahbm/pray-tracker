import prisma from 'lib/prisma';
import { ApiError, handleError } from 'utils/error';
import { createResponse, StatusCode } from 'utils/status';

export default async function POST(request: Request) {
  const { userId, friendId } = await request.json();

  try {
    if (!userId || !friendId || userId === friendId) {
      throw new ApiError('Missing required fields', StatusCode.BAD_REQUEST, {
        fields: { userId, friendId },
      });
    }

    const existingFriendship = await prisma.friend.findUnique({
      where: { userId_friendId: { userId, friendId } },
    });

    if (existingFriendship)
      return createResponse(
        StatusCode.SUCCESS,
        'Friendship already exists',
        existingFriendship,
      );

    const friendRequest = await prisma.friend.create({
      data: {
        userId,
        friendId,
        status: 'pending',
      },
    });

    return createResponse(
      StatusCode.CREATED,
      'Friendship accepted successfully',
      friendRequest,
    );
  } catch (error) {
    console.error(error);
    // Use handleError to standardize the response for all errors
    return handleError(error);
  }
}
