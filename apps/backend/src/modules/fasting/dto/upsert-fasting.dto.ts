import { IsBoolean, IsDateString, IsNotEmpty } from 'class-validator';

export class UpsertFastingDto {
  @IsDateString()
  @IsNotEmpty()
  date: string;

  @IsBoolean()
  @IsNotEmpty()
  fasted: boolean;
}
