import prisma from '@/lib/prisma';
import { handleError } from '@/utils/error';
import { createResponse, StatusCode } from '@/utils/status';

export async function GET(request: Request, { id }: { id: string }) {
  try {
    const url = new URL(request.url);
    const today = url.searchParams.get('today'); // Full ISO string

    if (!id) {
      return new Response(
        JSON.stringify({
          status: StatusCode.UNAUTHORIZED,
          message: 'Please, Sign In to fetch Today’s Pray',
        }),
        { status: StatusCode.UNAUTHORIZED },
      );
    }

    // Extract only the date (yyyy-MM-dd) from the ISO string
    const dateOnly = today.split('T')[0]; // e.g., "2025-01-23"

    const startOfDay = new Date(`${dateOnly}T00:00:00.000Z`);
    const endOfDay = new Date(`${dateOnly}T23:59:59.999Z`);

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
      return new Response(
        JSON.stringify({
          status: StatusCode.NOT_FOUND,
          message: 'No prayer data found for the given date',
        }),
        { status: StatusCode.NOT_FOUND },
      );
    }

    return createResponse(
      StatusCode.SUCCESS,
      'Today’s Pray fetched successfully',
      pray,
    );
  } catch (error) {
    return handleError(error);
  }
}
