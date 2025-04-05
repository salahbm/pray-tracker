import prisma from '@/lib/prisma';
import { checkAndAssignAwards } from '@/utils/check-awards';
import { ApiError, handleError } from '@/utils/error';
import { recalculateStats } from '@/utils/recalculate-stats';
import { createResponse, MessageCodes, StatusCode } from '@/utils/status';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { date, fajr, dhuhr, asr, maghrib, isha, nafl, userId } = body;

    if (!userId || !date) {
      throw new ApiError({
        message: 'Missing required fields',
        status: StatusCode.BAD_REQUEST,
        code: MessageCodes.BAD_REQUEST,
        details: { userId, date },
      });
    }

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

    // ⏱️ Run heavy logic AFTER sending the response (non-blocking)
    void (async () => {
      try {
        await recalculateStats(userId);
        await checkAndAssignAwards(userId);
      } catch (e) {
        console.error('[Background task failed]', e);
      }
    })();

    // ✅ Return fast response first
    return createResponse({
      status: StatusCode.SUCCESS,
      message: 'Prayer record saved',
      code: MessageCodes.PRAY_UPDATED,
      data: {
        prays: updatedPrays,
        newAwards: null,
        levelInfo: null,
      },
    });
  } catch (error) {
    return handleError(error);
  }
}
