import prisma from '@/lib/prisma';
import { handleError } from '@/utils/error';
import { createResponse, StatusCode } from '@/utils/status';

export async function GET(req: Request) {
  try {
    const { userId } = await req.json();
    const friends = await prisma.friend.findMany({
      where: { userId, status: 'accepted' },
      include: { friend: true },
    });

    return createResponse(
      StatusCode.SUCCESS,
      'Friends fetched successfully',
      friends,
    );
  } catch (error) {
    // Use handleError to standardize the response for all errors
    return handleError(error);
  }
}
