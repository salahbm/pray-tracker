import { IsArray, IsBoolean, IsOptional, IsString } from 'class-validator';

export class UpsertOnboardingDto {
  @IsOptional()
  @IsString()
  prayerKnowledge?: string | null;

  @IsOptional()
  @IsString()
  supportNeeded?: string | null;

  @IsOptional()
  @IsString()
  learnIslam?: string | null;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  whyHere?: string[];

  @IsOptional()
  @IsString()
  whereDidYouHearAboutUs?: string | null;

  @IsOptional()
  @IsBoolean()
  locationPermissionGranted?: boolean;

  @IsOptional()
  @IsString()
  locationCity?: string | null;

  @IsOptional()
  @IsString()
  locationTimezone?: string | null;

  @IsOptional()
  @IsBoolean()
  notificationPermissionGranted?: boolean;

  @IsOptional()
  @IsString()
  notificationPreset?: string | null;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  enabledModules?: string[];

  @IsOptional()
  @IsString()
  defaultHomeTab?: string | null;
}
