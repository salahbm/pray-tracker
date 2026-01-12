import { IsString, MinLength, MaxLength } from 'class-validator';

export class ChangePasswordDto {
  @IsString()
  @MinLength(8)
  @MaxLength(20)
  currentPassword: string;

  @IsString()
  @MinLength(8)
  @MaxLength(20)
  newPassword: string;
}
