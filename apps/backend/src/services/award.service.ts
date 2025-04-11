// src/services/award.service.ts

import { prisma } from '../lib/prisma';

export class AwardService {
  static async getUserAwards(userId: string) {
    return prisma.award.findMany({
      where: { userId },
      orderBy: {
        awardedAt: 'desc',
      },
    });
  }
}
