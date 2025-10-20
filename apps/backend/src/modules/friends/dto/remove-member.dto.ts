import { IsNotEmpty, IsString } from 'class-validator';

export class RemoveMemberDto {
  @IsNotEmpty()
  @IsString()
  groupId: string;

  @IsNotEmpty()
  @IsString()
  memberId: string;
}
