import { IsNotEmpty, IsString } from 'class-validator';

export class AddMemberDto {
  @IsNotEmpty()
  @IsString()
  groupId: string;

  @IsNotEmpty()
  @IsString()
  friendId: string;
}
