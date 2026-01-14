import { Module } from '@nestjs/common';

import { PrismaService } from '@/db/prisma.service';
import { OnboardingController } from './onboarding.controller';
import { OnboardingService } from './onboarding.service';

@Module({
  controllers: [OnboardingController],
  providers: [OnboardingService, PrismaService],
})
export class OnboardingModule {}
