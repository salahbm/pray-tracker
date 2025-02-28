import prisma from '@/lib/prisma';
import { ApiError, handleError } from '@/utils/error';
import { createResponse, MessageCodes, StatusCode } from '@/utils/status';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { date, fajr, dhuhr, asr, maghrib, isha, tahajjud, userId } = body;

    if (!userId) {
      throw new ApiError({
        message: 'Missing required fields',
        status: StatusCode.BAD_REQUEST,
        code: MessageCodes.BAD_REQUEST,
        details: {
          userId,
          date,
          fajr,
          dhuhr,
          asr,
          maghrib,
          isha,
          tahajjud,
        },
      });
    }

    // Upsert Prays record for the given user and date
    const updatedPrays = await prisma.prays.upsert({
      where: {
        userId_date: {
          userId,
          date: new Date(date),
        },
      },
      update: {
        fajr: fajr || 0,
        dhuhr: dhuhr || 0,
        asr: asr || 0,
        maghrib: maghrib || 0,
        isha: isha || 0,
        tahajjud: tahajjud || 0,
      },
      create: {
        userId,
        date: new Date(date),
        fajr: fajr || 0,
        dhuhr: dhuhr || 0,
        asr: asr || 0,
        maghrib: maghrib || 0,
        isha: isha || 0,
        tahajjud: tahajjud || 0,
      },
    });

    // Recalculate total points for the user
    const userTotalPoints = await prisma.prays.aggregate({
      _sum: {
        fajr: true,
        dhuhr: true,
        asr: true,
        maghrib: true,
        isha: true,
        tahajjud: true,
      },
      where: {
        userId,
      },
    });

    // Update user's totalPoints
    await prisma.user.update({
      where: { id: userId },
      data: {
        totalPoints: Object.values(userTotalPoints._sum).reduce(
          (acc: number, val: number) => acc + (val || 0),
          0,
        ),
      },
    });

    return createResponse({
      status: StatusCode.CREATED,
      message: 'Pray created successfully',
      code: MessageCodes.PRAY_CREATED,
      data: updatedPrays,
    });
  } catch (error) {
    return handleError(error);
  }
}
