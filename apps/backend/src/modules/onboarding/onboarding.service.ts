import { Injectable } from '@nestjs/common';
import { Prisma } from '../../generated/prisma';
import { PrismaService } from '@/db/prisma.service';
import { UpsertOnboardingDto } from './dto/upsert-onboarding.dto';

@Injectable()
export class OnboardingService {
  constructor(private readonly prisma: PrismaService) {}

  async getPreferences(userId: string) {
    return this.prisma.onboarding.findUnique({
      where: { userId },
    });
  }

  async upsertPreferences(userId: string, dto: UpsertOnboardingDto) {
    const data = this.buildUpdatePayload(dto);

    return this.prisma.onboarding.upsert({
      where: { userId },
      update: data,
      create: {
        userId,
        ...data,
      },
    });
  }

  async completeOnboarding(userId: string) {
    return this.prisma.onboarding.upsert({
      where: { userId },
      update: {
        updatedAt: new Date(),
      },
      create: {
        userId,
      },
    });
  }

  private buildUpdatePayload(
    dto: UpsertOnboardingDto,
  ): Prisma.OnboardingUpdateInput {
    const data: Prisma.OnboardingUpdateInput = {};

    if (dto.prayerKnowledge !== undefined) {
      data.prayerKnowledge = dto.prayerKnowledge;
    }

    if (dto.supportNeeded !== undefined) {
      data.supportNeeded = dto.supportNeeded;
    }

    if (dto.learnIslam !== undefined) {
      data.learnIslam = dto.learnIslam;
    }

    if (dto.whyHere !== undefined) {
      data.whyHere = dto.whyHere;
    }

    if (dto.whereDidYouHearAboutUs !== undefined) {
      data.whereDidYouHearAboutUs = dto.whereDidYouHearAboutUs;
    }

    if (dto.locationPermissionGranted !== undefined) {
      data.locationPermissionGranted = dto.locationPermissionGranted;
    }

    if (dto.locationCity !== undefined) {
      data.locationCity = dto.locationCity;
    }

    if (dto.locationTimezone !== undefined) {
      data.locationTimezone = dto.locationTimezone;
    }

    if (dto.notificationPermissionGranted !== undefined) {
      data.notificationPermissionGranted = dto.notificationPermissionGranted;
    }

    if (dto.notificationPreset !== undefined) {
      data.notificationPreset = dto.notificationPreset;
    }

    if (dto.enabledModules !== undefined) {
      data.enabledModules = dto.enabledModules;
    }

    if (dto.defaultHomeTab !== undefined) {
      data.defaultHomeTab = dto.defaultHomeTab;
    }

    return data;
  }
}
