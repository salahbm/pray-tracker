import prisma from '@/lib/prisma';
import { handleError } from '@/utils/error';
import { createResponse, MessageCodes, StatusCode } from '@/utils/status';

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

    return createResponse({
      status: StatusCode.SUCCESS,
      message: 'Awards fetched successfully',
      code: MessageCodes.AWARD_FETCHED,
      data: awards,
    });
  } catch (error) {
    // Use handleError to standardize the response for all errors
    return handleError(error);
  }
}
