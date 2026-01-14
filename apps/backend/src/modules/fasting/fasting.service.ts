import { Injectable } from '@nestjs/common';
import { PrismaService } from '@/db/prisma.service';

@Injectable()
export class FastingService {
  constructor(private readonly prisma: PrismaService) {}

  async getHistory(userId: string) {
    return this.prisma.fasting.findMany({
      where: { userId },
      orderBy: { date: 'desc' },
    });
  }

  async upsertFasting(userId: string, date: string, fasted: boolean) {
    const parsed = new Date(date);
    const normalizedDate = new Date(
      Date.UTC(
        parsed.getUTCFullYear(),
        parsed.getUTCMonth(),
        parsed.getUTCDate(),
      ),
    );

    return this.prisma.fasting.upsert({
      where: { userId_date: { userId, date: normalizedDate } },
      create: {
        userId,
        date: normalizedDate,
        fasted,
      },
      update: {
        fasted,
      },
    });
  }
}
