import { Module } from '@nestjs/common';
import { PrayersService } from './prayers.service';
import { PrayersController } from './prayers.controller';
import { PrismaService } from '@/db/prisma.service';

@Module({
  controllers: [PrayersController],
  providers: [PrayersService, PrismaService],
  exports: [PrayersService],
})
export class PrayersModule {}
