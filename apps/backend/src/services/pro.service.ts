// src/services/pro.service.ts

import type { Pro } from '@prayer/db';
import { prisma } from '../lib/prisma';

export class ProService {
  static async getPro(): Promise<Pro | null> {
    const pro = await prisma.pro.findFirst();
    return pro;
  }
}
