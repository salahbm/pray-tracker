// src/services/prayer.service.ts
import { prisma } from '../lib/prisma';
import { ApiError } from '../middleware/error-handler';
import { StatusCode, MessageCodes } from '../utils/status';
import { checkAndAssignAwards } from '../utils/check-awards';
import { recalculateStats } from '../utils/recalculate-stats';

export class PrayerService {
  static async getPrayersByYear(userId: string, year: string) {
    if (!userId) {
      throw new ApiError({
        message: 'Please, Sign In to fetch Prays',
        status: StatusCode.UNAUTHORIZED,
      });
    }

    const start = new Date(`${year}-01-01`);
    const end = new Date(`${year}-12-31`);

    return prisma.prays.findMany({
      where: {
        userId,
        date: {
          gte: start,
          lte: end,
        },
      },
    });
  }

  static async getTodaysPrayer(userId: string, today: string) {
    if (!userId) {
      throw new ApiError({
        message: 'Please, Sign In to fetch Prays',
        status: StatusCode.UNAUTHORIZED,
      });
    }

    const startOfDay = new Date(`${today}T00:00:00.000Z`);
    const endOfDay = new Date(`${today}T23:59:59.999Z`);

    const prayer = await prisma.prays.findFirst({
      where: {
        userId,
        date: {
          gte: startOfDay,
          lte: endOfDay,
        },
      },
    });

    return prayer || null;
  }

  static async upsertPrayer(body: {
    date: string;
    fajr?: number;
    dhuhr?: number;
    asr?: number;
    maghrib?: number;
    isha?: number;
    nafl?: number;
    userId: string;
  }) {
    const { date, fajr, dhuhr, asr, maghrib, isha, nafl, userId } = body;

    if (!userId || !date) {
      throw new ApiError({
        message: 'Missing required fields',
        status: StatusCode.BAD_REQUEST,
        code: MessageCodes.BAD_REQUEST,
        details: { userId, date },
      });
    }

    const updated = await prisma.prays.upsert({
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

    // Run side-effects asynchronously
    void (async () => {
      try {
        await recalculateStats(userId);
        await checkAndAssignAwards(userId);
      } catch (e) {
        console.error('[Background task failed]', e);
      }
    })();

    return {
      prays: updated,
      newAwards: null,
      levelInfo: null,
    };
  }
}
