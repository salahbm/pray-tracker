import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class ConfirmAvatarUploadDto {
  @IsString()
  @IsNotEmpty()
  fileKey: string;

  @IsString()
  @IsOptional()
  oldFileKey?: string;
}
