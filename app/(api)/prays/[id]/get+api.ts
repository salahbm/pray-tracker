import prisma from '@/lib/prisma';
import { handleError } from '@/utils/error';
import { createResponse, StatusCode } from '@/utils/status';

export async function GET(request: Request, { id }: { id: string }) {
  try {
    const url = new URL(request.url);
    const year = url.searchParams.get('year');

    if (!id || !year) {
      return new Response(
        JSON.stringify({
          status: 400,
          message: 'Missing required fields: id and/or year',
        }),
        { status: 400 },
      );
    }

    const prays = await prisma.prays.findMany({
      where: {
        id,
        pray: {
          some: {
            date: {
              gte: new Date(`${year}-01-01`),
              lte: new Date(`${year}-12-31`),
            },
          },
        },
      },
      include: {
        pray: true,
      },
    });

    return createResponse(
      StatusCode.SUCCESS,
      'Prays fetched successfully',
      prays,
    );
  } catch (error) {
    return handleError(error);
  }
}
