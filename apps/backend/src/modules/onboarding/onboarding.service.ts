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
    const updateData = this.buildUpdatePayload(dto);

    const createData: Prisma.OnboardingCreateInput = {
      user: { connect: { id: userId } },
      prayerKnowledge: dto.prayerKnowledge,
      supportNeeded: dto.supportNeeded,
      learnIslam: dto.learnIslam,
      whyHere: dto.whyHere,
      whereDidYouHearAboutUs: dto.whereDidYouHearAboutUs,
      locationPermissionGranted: dto.locationPermissionGranted ?? false,
      locationCity: dto.locationCity,
      locationTimezone: dto.locationTimezone,
      notificationPermissionGranted: dto.notificationPermissionGranted ?? false,
      notificationPreset: dto.notificationPreset,
      enabledModules: dto.enabledModules,
      defaultHomeTab: dto.defaultHomeTab,
    };

    return this.prisma.onboarding.upsert({
      where: { userId },
      update: updateData,
      create: createData,
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

  async listAllForAdmin(params?: { skip?: number; take?: number }) {
    const rows = await this.prisma.onboarding.findMany({
      include: {
        user: {
          select: {
            email: true,
          },
        },
      },
      orderBy: {
        updatedAt: 'desc',
      },
      skip: params?.skip,
      take: params?.take,
    });

    return rows.map((row) => ({
      id: row.id,
      userId: row.userId,
      email: row.user.email,
      prayerKnowledge: row.prayerKnowledge,
      supportNeeded: row.supportNeeded,
      learnIslam: row.learnIslam,
      whyHere: this.toStringArray(row.whyHere),
      whereDidYouHearAboutUs: row.whereDidYouHearAboutUs,
      locationPermissionGranted: row.locationPermissionGranted,
      locationCity: row.locationCity,
      locationTimezone: row.locationTimezone,
      notificationPermissionGranted: row.notificationPermissionGranted,
      notificationPreset: row.notificationPreset,
      enabledModules: this.toStringArray(row.enabledModules),
      defaultHomeTab: row.defaultHomeTab,
      createdAt: row.createdAt,
      updatedAt: row.updatedAt,
    }));
  }

  async countAllForAdmin() {
    return this.prisma.onboarding.count();
  }

  async getAdminStats() {
    const rows = await this.prisma.onboarding.findMany({
      select: {
        prayerKnowledge: true,
        whereDidYouHearAboutUs: true,
        defaultHomeTab: true,
        locationPermissionGranted: true,
        notificationPermissionGranted: true,
      },
    });

    const buildBuckets = (values: Array<string | null | undefined>) => {
      return values.reduce<Record<string, number>>((acc, value) => {
        const key = value ?? 'unknown';
        acc[key] = (acc[key] ?? 0) + 1;
        return acc;
      }, {});
    };

    return {
      total: rows.length,
      prayerKnowledge: buildBuckets(rows.map((row) => row.prayerKnowledge)),
      attributionSources: buildBuckets(
        rows.map((row) => row.whereDidYouHearAboutUs),
      ),
      defaultHomeTab: buildBuckets(rows.map((row) => row.defaultHomeTab)),
      locationPermissionGranted: rows.filter(
        (row) => row.locationPermissionGranted,
      ).length,
      notificationPermissionGranted: rows.filter(
        (row) => row.notificationPermissionGranted,
      ).length,
    };
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

  private toStringArray(value: Prisma.JsonValue | null): string[] {
    if (!Array.isArray(value)) {
      return [];
    }

    return value.filter((item): item is string => typeof item === 'string');
  }
}
