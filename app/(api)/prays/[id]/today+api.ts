import prisma from '@/lib/prisma';
import { ApiError, handleError } from '@/utils/error';
import { createResponse, MessageCodes, StatusCode } from '@/utils/status';

export async function GET(request: Request, { id }: { id: string }) {
  try {
    const url = new URL(request.url);
    const today = url.searchParams.get('today'); // yyyy-MM-dd

    if (!id) {
      return new ApiError(
        'Please, Sign In to fetch Prays',
        StatusCode.UNAUTHORIZED,
      );
    }

    const startOfDay = new Date(`${today}T00:00:00.000Z`);
    const endOfDay = new Date(`${today}T23:59:59.999Z`);

    const pray = await prisma.prays.findFirst({
      where: {
        userId: id,
        date: {
          gte: startOfDay, // Start of the day
          lte: endOfDay, // End of the day
        },
      },
    });

    if (!pray) {
      return createResponse({
        status: StatusCode.SUCCESS,
        message: 'Today’s Pray not found',
        code: MessageCodes.PRAY_NOT_FOUND,
        data: [],
      });
    }

    return createResponse({
      status: StatusCode.SUCCESS,
      message: 'Today’s Pray fetched successfully',
      code: MessageCodes.PRAY_FETCHED,
      data: pray,
    });
  } catch (error) {
    return handleError(error);
  }
}
