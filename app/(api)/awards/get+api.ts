import prisma from '@/lib/prisma';
import { handleError } from '@/utils/error';
import { createResponse, StatusCode } from '@/utils/status';

export async function GET(request: Request) {
  try {
    const url = new URL(request.url);
    const id = url.searchParams.get('id');

    if (!id) {
      return new Response(
        JSON.stringify({
          status: StatusCode.UNAUTHORIZED,
          message: 'Please, Sign In to fetch Awards',
        }),
        { status: StatusCode.UNAUTHORIZED },
      );
    }
    const awards = await prisma.award.findMany({
      where: {
        userId: id,
      },
      include: {
        user: true,
      },
      orderBy: {
        achievedAt: 'desc',
      },
    });

    return createResponse(
      StatusCode.SUCCESS,
      'Awards fetched successfully',
      awards,
    );
  } catch (error) {
    // Use handleError to standardize the response for all errors
    return handleError(error);
  }
}
