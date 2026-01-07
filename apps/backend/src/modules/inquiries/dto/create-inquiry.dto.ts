import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class CreateInquiryDto {
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  subject: string;

  @IsNotEmpty()
  @IsString()
  message: string;
}
