import { IsNotEmpty, IsString } from 'class-validator';

export class CreateAvatarPresignDto {
  @IsString()
  @IsNotEmpty()
  fileName: string;

  @IsString()
  @IsNotEmpty()
  contentType: string;
}
