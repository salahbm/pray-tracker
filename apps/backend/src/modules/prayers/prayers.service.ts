import { Injectable, NotFoundException } from '@nestjs/common';
import { Prayer, Prisma } from '../../generated/prisma';
import { PrismaService } from '@/db/prisma.service';
import { UpdatePrayerDto } from './dto/update-prayer.dto';
import { getLocalizedMessage } from '@/common/i18n/error-messages';
import { Locale } from '@/common/utils/response.utils';
import { PatchPrayerDto } from './dto/patch-prayer.dto';
import {
  clamp012,
  normalizeDayUtc,
  withSerializableRetry,
} from './prayer.utils';

@Injectable()
export class PrayersService {
  constructor(private readonly prisma: PrismaService) {}

  async patch(dto: PatchPrayerDto): Promise<Prayer> {
    const { userId, date, field, value } = dto;
    const prayerDate = normalizeDayUtc(date);
    const next = clamp012(value);

    return withSerializableRetry(async () => {
      return this.prisma.$transaction(
        async (tx) => {
          // Get existing prayer to calculate delta (if it exists)
          const existing = await tx.prayer.findUnique({
            where: { userId_date: { userId, date: prayerDate } },
          });

          const prevRaw = existing ? (existing[field] as number | null) : null;
          const prevValue = prevRaw ?? 0;
          const prev = clamp012(prevValue);
          const delta = next - prev;

          // Only proceed if there's a change
          if (delta === 0) {
            // No change, just return existing or create with current value
            return tx.prayer.upsert({
              where: { userId_date: { userId, date: prayerDate } },
              create: {
                userId,
                date: prayerDate,
                fajr: 0,
                dhuhr: 0,
                asr: 0,
                maghrib: 0,
                isha: 0,
                nafl: 0,
                [field]: next,
              },
              update: {},
            });
          }

          // Update prayer and user points in parallel
          const [prayer] = await Promise.all([
            tx.prayer.upsert({
              where: { userId_date: { userId, date: prayerDate } },
              create: {
                userId,
                date: prayerDate,
                fajr: 0,
                dhuhr: 0,
                asr: 0,
                maghrib: 0,
                isha: 0,
                nafl: 0,
                [field]: next,
              },
              update: {
                [field]: next,
              },
            }),
            tx.user.update({
              where: { id: userId },
              data: { totalPoints: { increment: delta } },
            }),
          ]);

          return prayer;
        },
        {
          isolationLevel: Prisma.TransactionIsolationLevel.ReadCommitted,
          maxWait: 5000, // Wait up to 5s to acquire transaction
          timeout: 10000, // Transaction timeout 10s
        },
      );
    });
  }

  /**
   * Get all prayers for a user
   */
  async findAllByUser(
    userId: string,
    params?: {
      year?: number;
      month?: number;
      skip?: number;
      take?: number;
    },
  ): Promise<Prayer[]> {
    const { year, month, skip, take } = params || {};

    const where: Prisma.PrayerWhereInput = {
      userId,
    };

    // Filter by year
    if (year) {
      const startDate = new Date(year, 0, 1);
      const endDate = new Date(year + 1, 0, 1);

      where.date = {
        gte: startDate,
        lt: endDate,
      };
    }

    // Filter by month (requires year)
    if (year && month !== undefined) {
      const startDate = new Date(year, month, 1);
      const endDate = new Date(year, month + 1, 1);

      where.date = {
        gte: startDate,
        lt: endDate,
      };
    }

    return this.prisma.prayer.findMany({
      where,
      skip,
      take,
      orderBy: {
        date: 'desc',
      },
    });
  }

  /**
   * Get today's prayer for a user
   */
  async findTodayByUser(userId: string): Promise<Prayer | null> {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    return this.prisma.prayer.findFirst({
      where: {
        userId,
        date: {
          gte: today,
          lt: tomorrow,
        },
      },
    });
  }

  /**
   * Get a specific prayer by ID
   */
  async findOne(id: string, locale: Locale = 'en'): Promise<Prayer> {
    const prayer = await this.prisma.prayer.findUnique({
      where: { id },
    });

    if (!prayer) {
      throw new NotFoundException({
        error: 'NOT_FOUND',
        message: getLocalizedMessage('NOT_FOUND', locale),
      });
    }

    return prayer;
  }

  /**
   * Update a prayer
   */
  async update(
    id: string,
    updatePrayerDto: UpdatePrayerDto,
    locale: Locale = 'en',
  ): Promise<Prayer> {
    try {
      return await this.prisma.prayer.update({
        where: { id },
        data: updatePrayerDto,
      });
    } catch {
      throw new NotFoundException({
        error: 'NOT_FOUND',
        message: getLocalizedMessage('NOT_FOUND', locale),
      });
    }
  }

  /**
   * Delete a prayer
   */
  async remove(id: string, locale: Locale = 'en'): Promise<Prayer> {
    try {
      return await this.prisma.prayer.delete({
        where: { id },
      });
    } catch {
      throw new NotFoundException({
        error: 'NOT_FOUND',
        message: getLocalizedMessage('NOT_FOUND', locale),
      });
    }
  }

  /**
   * Get prayer statistics for a user
   */
  async getUserStats(userId: string, year?: number) {
    const where: Prisma.PrayerWhereInput = {
      userId,
    };

    if (year) {
      const startDate = new Date(year, 0, 1);
      const endDate = new Date(year + 1, 0, 1);

      where.date = {
        gte: startDate,
        lt: endDate,
      };
    }

    const prayers = await this.prisma.prayer.findMany({
      where,
    });

    const stats = {
      totalPrayers: prayers.length,
      totalFajr: 0,
      totalDhuhr: 0,
      totalAsr: 0,
      totalMaghrib: 0,
      totalIsha: 0,
      totalNafl: 0,
      totalRakats: 0,
    };

    prayers.forEach((prayer) => {
      stats.totalFajr += prayer.fajr || 0;
      stats.totalDhuhr += prayer.dhuhr || 0;
      stats.totalAsr += prayer.asr || 0;
      stats.totalMaghrib += prayer.maghrib || 0;
      stats.totalIsha += prayer.isha || 0;
      stats.totalNafl += prayer.nafl || 0;
    });

    stats.totalRakats =
      stats.totalFajr +
      stats.totalDhuhr +
      stats.totalAsr +
      stats.totalMaghrib +
      stats.totalIsha +
      stats.totalNafl;

    return stats;
  }

  /**
   * Count prayers for a user
   */
  async count(
    userId: string,
    where?: Prisma.PrayerWhereInput,
  ): Promise<number> {
    return this.prisma.prayer.count({
      where: {
        userId,
        ...where,
      },
    }) as Promise<number>;
  }
}
