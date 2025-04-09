// src/services/prayer.service.ts
import { prisma } from '../lib/prisma';
import { ApiError } from '../middleware/error-handler';
import { StatusCode, MessageCodes } from '../utils/status';
import { checkAndAssignAwards } from '../utils/check-awards';
import { recalculateStats } from '../utils/recalculate-stats';

export class PrayerService {
  /**
   * Get prayers by year
   * @param userId
   * @param year
   * @returns
   */
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

  /**
   * Get today's prayer
   * @param userId
   * @returns
   */
  static async getTodaysPrayer(userId: string) {
    const now = new Date();

    // Calculate server-side today range
    const startOfDay = new Date(
      now.getFullYear(),
      now.getMonth(),
      now.getDate(),
      0,
      0,
      0,
      0
    );

    const endOfDay = new Date(
      now.getFullYear(),
      now.getMonth(),
      now.getDate(),
      23,
      59,
      59,
      999
    );

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

  /**
   * Upsert prayer
   * @param body
   * @returns
   */
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
        fajr: fajr ?? 0,
        dhuhr: dhuhr ?? 0,
        asr: asr ?? 0,
        maghrib: maghrib ?? 0,
        isha: isha ?? 0,
        nafl: nafl ?? 0,
      },
      create: {
        userId,
        date: new Date(date),
        fajr: fajr ?? 0,
        dhuhr: dhuhr ?? 0,
        asr: asr ?? 0,
        maghrib: maghrib ?? 0,
        isha: isha ?? 0,
        nafl: nafl ?? 0,
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

  /**
   * Get Praying times
   * @param userId
   * @returns
   */
  static async getPrayerTimes(body: { lat: string; lng: string; tz: string }) {
    const { lat, lng, tz } = body;

    const url = `https://api.aladhan.com/v1/timings?latitude=${lat}&longitude=${lng}&method=2&timezonestring=${tz}`;

    const response = await fetch(url);

    if (!response.ok) {
      throw new ApiError({
        status: StatusCode.BAD_REQUEST,
        code: MessageCodes.UNAUTHORIZED,
        message: 'Failed to fetch timings',
      });
    }

    const data = await response.json();
    return data;
  }
}
