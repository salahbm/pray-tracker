import { IsNotEmpty, IsString } from 'class-validator';

export class DeleteFriendDto {
  @IsString()
  @IsNotEmpty()
  friendshipId: string;

  @IsString()
  @IsNotEmpty()
  friendId: string;
}
