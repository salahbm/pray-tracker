import { PrismaClient } from '@prisma/client';
import { ApiError } from '../middleware/error-handler';
import { MessageCodes, StatusCode } from '../utils/status';
import type { IPrays } from '../types/prays';

interface PrayerUpdate {
  prayerName: 'fajr' | 'dhuhr' | 'asr' | 'maghrib' | 'isha' | 'nafl';
  status: number;
  date: Date;
}

export class PrayerService {
  constructor(private prisma: PrismaClient) {}

  async getTodaysPrayers(
    userId: string,
    today: string
  ): Promise<IPrays | null> {
    const startOfDay = new Date(`${today}T00:00:00.000Z`);
    const endOfDay = new Date(`${today}T23:59:59.999Z`);

    return this.prisma.prays.findFirst({
      where: {
        userId,
        date: {
          gte: startOfDay,
          lte: endOfDay,
        },
      },
    });
  }

  async updatePrayer(
    userId: string,
    update: PrayerUpdate
  ): Promise<IPrays | null> {
    const { prayerName, status, date } = update;

    // Validate prayer status
    if (![0, 1, 2].includes(status)) {
      throw new ApiError({
        message: 'Invalid prayer status',
        status: StatusCode.BAD_REQUEST,
        code: MessageCodes.BAD_REQUEST,
      });
    }

    const startOfDay = new Date(date);
    startOfDay.setHours(0, 0, 0, 0);
    const endOfDay = new Date(startOfDay);
    endOfDay.setHours(23, 59, 59, 999);

    let prayer = await this.prisma.prays.findFirst({
      where: {
        userId,
        date: {
          gte: startOfDay,
          lte: endOfDay,
        },
      },
    });

    if (!prayer) {
      prayer = await this.prisma.prays.create({
        data: {
          userId,
          date: startOfDay,
          [prayerName]: status,
        },
      });
    } else {
      prayer = await this.prisma.prays.update({
        where: { id: prayer.id },
        data: { [prayerName]: status },
      });
    }

    // Schedule next prayer notification if available
    const nextPrayer = this.getNextPrayer(prayerName);

    // Update prayer stats
    await this.updatePrayerStats(userId);

    return prayer;
  }

  async getPrayerStats(userId: string) {
    const stats = await this.prisma.prayerStats.findUnique({
      where: { userId },
    });

    if (!stats) {
      // Initialize stats if they don't exist
      return this.prisma.prayerStats.create({
        data: { userId },
      });
    }

    return stats;
  }

  private getNextPrayer(currentPrayer: string): string | null {
    const prayers = ['fajr', 'dhuhr', 'asr', 'maghrib', 'isha'];
    const currentIndex = prayers.indexOf(currentPrayer);
    if (currentIndex === -1 || currentIndex === prayers.length - 1) return null;
    return prayers[currentIndex + 1];
  }

  private getNextPrayerTime(prayer: string, currentDate: Date): string {
    // This is a simplified version. In a real app, you'd use proper prayer time calculations
    const prayerTimes: Record<string, number> = {
      fajr: 5,
      dhuhr: 12,
      asr: 15,
      maghrib: 18,
      isha: 20,
    };

    const nextDate = new Date(currentDate);
    nextDate.setHours(prayerTimes[prayer], 0, 0, 0);

    if (nextDate < currentDate) {
      nextDate.setDate(nextDate.getDate() + 1);
    }

    return nextDate.toISOString();
  }

  private async updatePrayerStats(userId: string) {
    const stats = await this.prisma.prayerStats.findUnique({
      where: { userId },
    });

    if (!stats) {
      await this.prisma.prayerStats.create({
        data: { userId },
      });
      return;
    }

    const prayers = await this.prisma.prays.findMany({
      where: { userId },
      orderBy: { date: 'desc' },
      take: 30, // Look at last 30 days for stats
    });

    // Calculate stats
    let currentStreak = 0;
    let totalPrayers = 0;
    let missedPrayers = 0;
    let naflCount = 0;

    for (const prayer of prayers) {
      const prayerCount = [
        prayer.fajr,
        prayer.dhuhr,
        prayer.asr,
        prayer.maghrib,
        prayer.isha,
      ].filter((status) => status > 0).length;

      if (prayerCount === 5) {
        currentStreak++;
      } else {
        break;
      }

      totalPrayers += prayerCount;
      missedPrayers += 5 - prayerCount;
      naflCount += prayer.nafl;
    }

    // Update stats
    await this.prisma.prayerStats.update({
      where: { userId },
      data: {
        currentStreak,
        totalPrayers,
        missedPrayers,
        naflCount,
        lastCalculated: new Date(),
        longestStreak:
          currentStreak > stats.longestStreak
            ? currentStreak
            : stats.longestStreak,
      },
    });
  }
}
