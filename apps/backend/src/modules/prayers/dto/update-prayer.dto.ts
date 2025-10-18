import { PartialType } from '@nestjs/mapped-types';
import { CreatePrayerDto } from './create-prayer.dto';

export class UpdatePrayerDto extends PartialType(CreatePrayerDto) {}
