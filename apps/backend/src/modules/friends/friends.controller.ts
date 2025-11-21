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
import { CreateGroupDto } from './dto/create-group.dto';
import { UpdateGroupDto } from './dto/update-group.dto';
import { AddMemberDto } from './dto/add-member.dto';
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

  @Get('all')
  async getAllFriends(
    @Query('userId') userId: string,
    @Query('page') page?: string,
    @Query('limit') limit?: string,
    @Headers('locale') locale?: Locale,
  ) {
    const pageNum = page ? parseInt(page, 10) : 1;
    const limitNum = limit ? parseInt(limit, 10) : 20;
    const activities = await this.friendsService.getAllFriends(
      userId,
      pageNum,
      limitNum,
      locale,
    );
    return { data: activities };
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
    @Query('friendshipId') friendshipId: string,
    @Query('userId') userId: string,
    @Headers('locale') locale?: Locale,
  ) {
    return this.friendsService.removeFriend(friendshipId, userId, locale);
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
    const groups = await this.friendsService.getGroups(userId);
    return { data: groups };
  }

  @Get('groups/:groupId/members')
  async getGroupMembers(
    @Param('groupId') groupId: string,
    @Query('userId') userId: string,
    @Headers('locale') locale?: Locale,
  ) {
    const members = await this.friendsService.getGroupMembers(
      groupId,
      userId,
      locale,
    );
    return { data: members };
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

  @Delete('groups/:groupId/members/:memberId')
  async removeMemberFromGroup(
    @Param('memberId') memberId: string,
    @Param('groupId') groupId: string,
    @Query('userId') userId: string,
    @Headers('locale') locale?: Locale,
  ) {
    return this.friendsService.removeMemberFromGroup(
      groupId,
      memberId,
      userId,
      locale,
    );
  }
}
