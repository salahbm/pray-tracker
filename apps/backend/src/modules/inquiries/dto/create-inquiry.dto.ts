import { IsNotEmpty, IsString } from 'class-validator';

export class CreateInquiryDto {
  @IsNotEmpty()
  @IsString()
  subject: string;

  @IsNotEmpty()
  @IsString()
  message: string;
}
