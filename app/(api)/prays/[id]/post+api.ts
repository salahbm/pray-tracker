import prisma from '@/lib/prisma';
import { handleError } from '@/utils/error';
import { createResponse, StatusCode } from '@/utils/status';

export async function POST(request: Request, { id }: { id: string }) {
  try {
    const body = await request.json();

    const { date, fajr, dhuhr, asr, maghrib, isha, tahajjud } = body;

    if (!id || !date) {
      return new Response(
        JSON.stringify({
          status: 400,
          code: StatusCode.BAD_REQUEST,
          message: 'Missing required fields: id and/or date',
          details: { id, date },
        }),
        { status: 400 },
      );
    }

    const newPray = await prisma.pray.create({
      data: {
        date: date,
        fajr: fajr || 0,
        dhuhr: dhuhr || 0,
        asr: asr || 0,
        maghrib: maghrib || 0,
        isha: isha || 0,
        tahajjud: tahajjud || 0,
        prays: {
          connectOrCreate: {
            where: { id },
            create: { id },
          },
        },
      },
    });

    return createResponse(
      StatusCode.SUCCESS,
      'Pray created successfully',
      newPray,
    );
  } catch (error) {
    return handleError(error);
  }
}
