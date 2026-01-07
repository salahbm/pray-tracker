import { IsNotEmpty, IsString } from 'class-validator';

export class CreateInquiryMessageDto {
  @IsNotEmpty()
  @IsString()
  message: string;
}
