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

  /**
   * Create or update a prayer (upsert)
   */
  // async upsert(createPrayerDto: CreatePrayerDto): Promise<Prayer> {
  //   const { userId, date, ...incomingData } = createPrayerDto;
  //   const prayerDate = new Date(date);

  //   // Use a transaction so user.totalPoints and prayer stay consistent
  //   return this.prisma.$transaction(async (tx) => {
  //     // 1. Get existing prayer for that day (if any)
  //     const existing = await tx.prayer.findUnique({
  //       where: {
  //         userId_date: {
  //           userId,
  //           date: prayerDate,
  //         },
  //       },
  //     });

  //     // 2. Calculate delta points
  //     const fields: (keyof typeof incomingData)[] = [
  //       'fajr',
  //       'dhuhr',
  //       'asr',
  //       'maghrib',
  //       'isha',
  //       'nafl',
  //     ];

  //     let delta = 0;

  //     const updateData: any = {};

  //     for (const field of fields) {
  //       // Check if this field was actually provided in the request
  //       const wasProvided = incomingData[field] !== undefined;

  //       if (wasProvided) {
  //         // previous value stored in DB (0 if no row yet)
  //         const prev = (existing?.[field] as number | null) ?? 0;

  //         // incoming value from request
  //         const next = incomingData[field] as number | null;

  //         // Only add to updateData if field was provided
  //         updateData[field] = next;

  //         // Calculate delta for points
  //         const nextValue = next ?? 0;
  //         delta += nextValue - prev;
  //       }
  //     }

  //     // 3. Update user totalPoints by delta (can be negative, zero, or positive)
  //     if (delta !== 0) {
  //       await tx.user.update({
  //         where: { id: userId },
  //         data: { totalPoints: { increment: delta } },
  //       });
  //     }

  //     // 4. Upsert prayer row with resolved values
  //     // For update: only update fields that were provided
  //     // For create: need to provide all fields with defaults
  //     if (existing) {
  //       // Update existing record - only update provided fields
  //       return tx.prayer.update({
  //         where: {
  //           userId_date: {
  //             userId,
  //             date: prayerDate,
  //           },
  //         },
  //         data: updateData,
  //       });
  //     } else {
  //       // Create new record - provide all fields with defaults
  //       const createData: any = {
  //         userId,
  //         date: prayerDate,
  //         fajr: null,
  //         dhuhr: null,
  //         asr: null,
  //         maghrib: null,
  //         isha: null,
  //         nafl: null,
  //       };

  //       // Override with provided values
  //       for (const field of fields) {
  //         if (incomingData[field] !== undefined) {
  //           createData[field] = incomingData[field];
  //         }
  //       }

  //       return tx.prayer.create({
  //         data: createData,
  //       });
  //     }
  //   });
  // }

  async patch(dto: PatchPrayerDto): Promise<Prayer> {
    const { userId, date, field, value } = dto;
    const prayerDate = normalizeDayUtc(date);
    const next = clamp012(value);

    console.log(
      `[PATCH] ${field}=${next} for user=${userId.slice(0, 8)} date=${date}`,
    );

    return withSerializableRetry(async () => {
      return this.prisma.$transaction(
        async (tx) => {
          const existing = await tx.prayer.findUnique({
            where: { userId_date: { userId, date: prayerDate } },
          });

          const prevRaw = (existing?.[field] as number | null) ?? 0;
          const prev = clamp012(prevRaw);

          // [Inference] points equal to stored value (0/1/2)
          const delta = next - prev;

          const prayer = await tx.prayer.upsert({
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
          });

          if (delta !== 0) {
            await tx.user.update({
              where: { id: userId },
              data: { totalPoints: { increment: delta } },
            });
          }

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
