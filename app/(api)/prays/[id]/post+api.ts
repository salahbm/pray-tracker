import prisma from '@/lib/prisma';
import { ApiError, handleError } from '@/utils/error';
import { createResponse, MessageCodes, StatusCode } from '@/utils/status';
import { checkAndAssignAwards } from '@/utils/award-helpers';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { date, fajr, dhuhr, asr, maghrib, isha, nafl, userId } = body;

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
          nafl,
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
        nafl: nafl || 0,
      },
      create: {
        userId,
        date: new Date(date),
        fajr: fajr || 0,
        dhuhr: dhuhr || 0,
        asr: asr || 0,
        maghrib: maghrib || 0,
        isha: isha || 0,
        nafl: nafl || 0,
      },
    });

    // Check and assign any new awards
    const newAwards = await checkAndAssignAwards(userId);

    return createResponse({
      status: StatusCode.SUCCESS,
      message: 'Prayer record updated successfully',
      code: MessageCodes.PRAY_UPDATED,
      data: {
        prays: updatedPrays,
        newAwards: newAwards.length > 0 ? newAwards : null,
      },
    });
  } catch (error) {
    return handleError(error);
  }
}
