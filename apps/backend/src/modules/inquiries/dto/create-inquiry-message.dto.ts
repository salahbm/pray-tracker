import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class CreateInquiryMessageDto {
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  message: string;
}
