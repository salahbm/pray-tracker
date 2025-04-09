// src/services/pro.service.ts

import { prisma } from '../lib/prisma';

export class ProService {
  static async getPro() {
    return prisma.pro.findFirst();
  }
}
