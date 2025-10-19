import { IsNotEmpty, IsString } from 'class-validator';

export class RespondFriendRequestDto {
  @IsString()
  @IsNotEmpty()
  friendshipId: string;

  @IsString()
  @IsNotEmpty()
  userId: string;
}
