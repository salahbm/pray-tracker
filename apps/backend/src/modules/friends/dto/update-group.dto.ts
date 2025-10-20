import { IsNotEmpty, IsString } from 'class-validator';

export class UpdateGroupDto {
  @IsNotEmpty()
  @IsString()
  groupId: string;

  @IsNotEmpty()
  @IsString()
  name: string;
}
