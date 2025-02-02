import prisma from '@/lib/prisma';
import { handleError } from '@/utils/error';
import { createResponse, MessageCodes, StatusCode } from '@/utils/status';

export async function GET(request: Request, { id }: { id: string }) {
  try {
    const url = new URL(request.url);
    const year = url.searchParams.get('year');

    if (!id) {
      return new Response(
        JSON.stringify({
          status: StatusCode.UNAUTHORIZED,
          message: 'Please, Sign In to fetch Prays',
        }),
        { status: StatusCode.UNAUTHORIZED },
      );
    }

    // Filter by year if provided

    const prays = await prisma.prays.findMany({
      where: {
        userId: id,
        date: {
          gte: new Date(`${year}-01-01`),
          lte: new Date(`${year}-12-31`),
        },
      },
    });

    return createResponse({
      status: StatusCode.SUCCESS,
      message: 'Prays fetched successfully',
      code: MessageCodes.PRAY_FETCHED,
      data: prays,
    });
  } catch (error) {
    // Use handleError to standardize the response for all errors
    return handleError(error);
  }
}
