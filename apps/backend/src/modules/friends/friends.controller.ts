import {
  Body,
  Controller,
  Delete,
  Get,
  Headers,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { FriendsService } from './friends.service';
import { AuthGuard } from '@/common/guards/auth.guard';
import { SendFriendRequestDto } from './dto/send-friend-request.dto';
import { RespondFriendRequestDto } from './dto/respond-friend-request.dto';
import { DeleteFriendDto } from './dto/delete-friend.dto';
import { type Locale } from '@/common/utils/response.utils';

@Controller('friends')
@UseGuards(AuthGuard)
export class FriendsController {
  constructor(private readonly friendsService: FriendsService) {}

  @Post('request')
  async sendFriendRequest(
    @Body() sendFriendRequestDto: SendFriendRequestDto,
    @Headers('locale') locale?: Locale,
  ) {
    return this.friendsService.sendFriendRequest(
      sendFriendRequestDto.userId,
      sendFriendRequestDto.friendEmail,
      locale,
    );
  }

  @Get('pending')
  async getPendingRequests(@Query('userId') userId: string) {
    return this.friendsService.getPendingRequests(userId);
  }

  @Get('approved')
  async getApprovedFriends(@Query('userId') userId: string) {
    return this.friendsService.getApprovedFriends(userId);
  }

  @Patch('accept')
  async acceptFriendRequest(
    @Body() respondFriendRequestDto: RespondFriendRequestDto,
    @Headers('locale') locale?: Locale,
  ) {
    return this.friendsService.acceptFriendRequest(
      respondFriendRequestDto.friendshipId,
      respondFriendRequestDto.userId,
      locale,
    );
  }

  @Patch('reject')
  async rejectFriendRequest(
    @Body() respondFriendRequestDto: RespondFriendRequestDto,
    @Headers('locale') locale?: Locale,
  ) {
    return this.friendsService.rejectFriendRequest(
      respondFriendRequestDto.friendshipId,
      respondFriendRequestDto.userId,
      locale,
    );
  }

  @Delete('remove')
  async removeFriend(
    @Body() deleteFriendDto: DeleteFriendDto,
    @Headers('locale') locale?: Locale,
  ) {
    return this.friendsService.removeFriend(
      deleteFriendDto.friendshipId,
      deleteFriendDto.friendId,
      locale,
    );
  }
}
