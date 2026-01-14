import { Module } from '@nestjs/common';
import { FastingController } from './fasting.controller';
import { FastingService } from './fasting.service';
import { PrismaService } from '@/db/prisma.service';

@Module({
  controllers: [FastingController],
  providers: [FastingService, PrismaService],
})
export class FastingModule {}
