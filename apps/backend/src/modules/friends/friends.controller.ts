import {
  Body,
  Controller,
  Delete,
  Get,
  Headers,
  Param,
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
import { CreateGroupDto } from './dto/create-group.dto';
import { UpdateGroupDto } from './dto/update-group.dto';
import { AddMemberDto } from './dto/add-member.dto';
import { RemoveMemberDto } from './dto/remove-member.dto';
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

  // Group Management Endpoints

  @Post('groups')
  async createGroup(
    @Body() createGroupDto: CreateGroupDto,
    @Headers('locale') locale?: Locale,
  ) {
    return this.friendsService.createGroup(
      createGroupDto.userId,
      createGroupDto.name,
      locale,
    );
  }

  @Get('groups')
  async getGroups(@Query('userId') userId: string) {
    return this.friendsService.getGroups(userId);
  }

  @Get('groups/:groupId/members')
  async getGroupMembers(
    @Param('groupId') groupId: string,
    @Query('userId') userId: string,
  ) {
    return this.friendsService.getGroupMembers(groupId, userId);
  }

  @Patch('groups/:groupId')
  async updateGroup(
    @Param('groupId') groupId: string,
    @Body() updateGroupDto: UpdateGroupDto,
    @Query('userId') userId: string,
    @Headers('locale') locale?: Locale,
  ) {
    return this.friendsService.updateGroup(
      groupId,
      updateGroupDto.name,
      userId,
      locale,
    );
  }

  @Delete('groups/:groupId')
  async deleteGroup(
    @Param('groupId') groupId: string,
    @Query('userId') userId: string,
    @Headers('locale') locale?: Locale,
  ) {
    return this.friendsService.deleteGroup(groupId, userId, locale);
  }

  @Post('groups/members')
  async addMemberToGroup(
    @Body() addMemberDto: AddMemberDto,
    @Query('userId') userId: string,
    @Headers('locale') locale?: Locale,
  ) {
    return this.friendsService.addMemberToGroup(
      addMemberDto.groupId,
      addMemberDto.friendId,
      userId,
      locale,
    );
  }

  @Delete('groups/members')
  async removeMemberFromGroup(
    @Body() removeMemberDto: RemoveMemberDto,
    @Query('userId') userId: string,
    @Headers('locale') locale?: Locale,
  ) {
    return this.friendsService.removeMemberFromGroup(
      removeMemberDto.groupId,
      removeMemberDto.memberId,
      userId,
      locale,
    );
  }
}
