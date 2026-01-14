import { Module } from '@nestjs/common';
import { FastingController } from './fasting.controller';
import { FastingService } from './fasting.service';

@Module({
  controllers: [FastingController],
  providers: [FastingService],
})
export class FastingModule {}
