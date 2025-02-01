import prisma from '@/lib/prisma';
import { ApiError, handleError } from '@/utils/error';
import { createResponse, StatusCode } from '@/utils/status';

export default async function POST(request: Request) {
  try {
    const { userId, friendEmail } = await request.json();
    console.log(`friendEmail:`, friendEmail);
    console.log(`userId:`, userId);

    if (!userId || !friendEmail) {
      throw new ApiError('Missing required fields', StatusCode.BAD_REQUEST, {
        fields: { userId, friendEmail },
      });
    }

    // Find the friend's ID from their email
    const friend = await prisma.user.findUnique({
      where: { email: friendEmail },
    });

    if (!friend) {
      throw new ApiError('Friend not found', StatusCode.NOT_FOUND);
    }

    const friendId = friend.id;

    // Check if friendship already exists
    const existingFriendship = await prisma.friend.findUnique({
      where: { userId_friendId: { userId, friendId } },
    });

    if (existingFriendship) {
      throw new ApiError('Friend request already exists', StatusCode.CONFLICT);
    }

    // Create friendship request
    const friendRequest = await prisma.friend.create({
      data: { userId, friendId, status: 'pending' },
    });

    return createResponse(
      StatusCode.CREATED,
      'Friend request sent successfully',
      friendRequest,
    );
  } catch (error) {
    console.error('Error sending friend request:', error);
    return handleError(error);
  }
}
