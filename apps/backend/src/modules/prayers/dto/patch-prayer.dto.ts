import { IsIn, IsInt, IsString, Matches } from 'class-validator';

export const PRAYER_FIELDS = [
  'fajr',
  'dhuhr',
  'asr',
  'maghrib',
  'isha',
  'nafl',
] as const;
export type PrayerField = (typeof PRAYER_FIELDS)[number];

export class PatchPrayerDto {
  @IsString()
  userId!: string;

  @Matches(/^\d{4}-\d{2}-\d{2}$/)
  date!: string;

  @IsIn(PRAYER_FIELDS)
  field!: PrayerField;

  @IsInt()
  @IsIn([0, 1, 2])
  value!: 0 | 1 | 2;
}
