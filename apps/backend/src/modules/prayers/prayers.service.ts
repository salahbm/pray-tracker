import { Injectable, NotFoundException } from '@nestjs/common';
import { Prayer, Prisma } from 'generated/prisma';
import { PrismaService } from '@/db/prisma.service';
import { CreatePrayerDto } from './dto/create-prayer.dto';
import { UpdatePrayerDto } from './dto/update-prayer.dto';

@Injectable()
export class PrayersService {
  constructor(private readonly prisma: PrismaService) {}

  /**
   * Create or update a prayer (upsert)
   */
  async upsert(createPrayerDto: CreatePrayerDto): Promise<Prayer> {
    const { userId, date, ...prayerData } = createPrayerDto;

    return this.prisma.prayer.upsert({
      where: {
        userId_date: {
          userId,
          date: new Date(date),
        },
      },
      update: prayerData,
      create: {
        userId,
        date: new Date(date),
        ...prayerData,
      },
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
  async findOne(id: string): Promise<Prayer> {
    const prayer = await this.prisma.prayer.findUnique({
      where: { id },
    });

    if (!prayer) {
      throw new NotFoundException('Prayer not found');
    }

    return prayer;
  }

  /**
   * Update a prayer
   */
  async update(id: string, updatePrayerDto: UpdatePrayerDto): Promise<Prayer> {
    try {
      return await this.prisma.prayer.update({
        where: { id },
        data: updatePrayerDto,
      });
    } catch {
      throw new NotFoundException('Prayer not found');
    }
  }

  /**
   * Delete a prayer
   */
  async remove(id: string): Promise<Prayer> {
    try {
      return await this.prisma.prayer.delete({
        where: { id },
      });
    } catch {
      throw new NotFoundException('Prayer not found');
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
    });
  }
}
