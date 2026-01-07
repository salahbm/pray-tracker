import { Module } from '@nestjs/common';
import { InquiriesController } from './inquiries.controller';
import { InquiriesService } from './inquiries.service';
import { PrismaService } from '@/db/prisma.service';

@Module({
  controllers: [InquiriesController],
  providers: [InquiriesService, PrismaService],
  exports: [InquiriesService],
})
export class InquiriesModule {}
