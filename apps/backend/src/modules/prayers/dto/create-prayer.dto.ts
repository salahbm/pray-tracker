import {
  IsDateString,
  IsInt,
  IsOptional,
  IsString,
  Max,
  Min,
} from 'class-validator';

export class CreatePrayerDto {
  @IsString()
  userId: string;

  @IsDateString()
  date: string;

  @IsOptional()
  @IsInt()
  @Min(0)
  @Max(50)
  fajr?: number;

  @IsOptional()
  @IsInt()
  @Min(0)
  @Max(50)
  dhuhr?: number;

  @IsOptional()
  @IsInt()
  @Min(0)
  @Max(50)
  asr?: number;

  @IsOptional()
  @IsInt()
  @Min(0)
  @Max(50)
  maghrib?: number;

  @IsOptional()
  @IsInt()
  @Min(0)
  @Max(50)
  isha?: number;

  @IsOptional()
  @IsInt()
  @Min(0)
  @Max(100)
  nafl?: number;
}
