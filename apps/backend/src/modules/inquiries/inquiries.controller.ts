import {
  Body,
  Controller,
  Get,
  Headers,
  Param,
  Post,
  Query,
  Req,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import type { Request } from 'express';
import { AuthGuard } from '@/common/guards/auth.guard';
import { CreateInquiryDto } from './dto/create-inquiry.dto';
import { CreateInquiryMessageDto } from './dto/create-inquiry-message.dto';
import { InquiriesService } from './inquiries.service';
import { createPaginatedResponse, parsePaginationParams } from '@/common/utils';
import * as responseUtils from '@/common/utils/response.utils';
import { Prisma } from '../../generated/prisma';

@Controller('inquiries')
@UseGuards(AuthGuard)
export class InquiriesController {
  constructor(private readonly inquiriesService: InquiriesService) {}

  /**
   * Create a new inquiry with an initial message.
   */
  @Post()
  async create(@Req() request: Request, @Body() dto: CreateInquiryDto) {
    const userId: string = request['user']?.id;

    if (!userId) {
      throw new UnauthorizedException('No active session found');
    }

    return this.inquiriesService.create(userId, dto);
  }

  /**
   * List inquiries for the current user.
   */
  @Get('me')
  async listMine(@Req() request: Request) {
    const userId: string = request['user']?.id;

    if (!userId) {
      throw new UnauthorizedException('No active session found');
    }

    return this.inquiriesService.listByUser(userId);
  }

  /**
   * List all inquiries (support owner only).
   */
  @Get()
  async listAll(
    @Req() request: Request,
    @Headers('locale') locale: responseUtils.Locale,
    @Query('page') page?: string,
    @Query('limit') limit?: string,
    @Query('userId') userId?: string,
  ) {
    const userEmail = request['user']?.email as string | undefined;

    this.inquiriesService.ensureOwnerAccess(userEmail, locale);

    const {
      skip,
      take,
      page: currentPage,
    } = parsePaginationParams({ page, limit });

    const where: Prisma.InquiryWhereInput | undefined = userId
      ? { userId }
      : undefined;

    const [inquiries, total] = await Promise.all([
      this.inquiriesService.listAll({ skip, take, userId }),
      this.inquiriesService.count(where),
    ]);

    return createPaginatedResponse(inquiries, total, currentPage, take);
  }

  /**
   * Get inquiry detail (user or support owner).
   */
  @Get(':id')
  async findOne(
    @Req() request: Request,
    @Param('id') id: string,
    @Headers('locale') locale: responseUtils.Locale = 'en',
  ) {
    return this.inquiriesService.findOne(
      id,
      request['user']?.id,
      request['user']?.email,
      locale,
    );
  }

  /**
   * Add a message from the current user.
   */
  @Post(':id/messages')
  async addMessage(
    @Req() request: Request,
    @Param('id') id: string,
    @Body() dto: CreateInquiryMessageDto,
    @Headers('locale') locale: responseUtils.Locale = 'en',
  ) {
    const userId: string = request['user']?.id;

    if (!userId) {
      throw new UnauthorizedException('No active session found');
    }

    return this.inquiriesService.addMessage(id, dto, {
      senderRole: 'USER',
      userId,
      email: request['user']?.email,
      locale,
    });
  }

  /**
   * Add a response from the support owner.
   */
  @Post(':id/respond')
  async respond(
    @Req() request: Request,
    @Param('id') id: string,
    @Body() dto: CreateInquiryMessageDto,
    @Headers('locale') locale: responseUtils.Locale = 'en',
  ) {
    return this.inquiriesService.addMessage(id, dto, {
      senderRole: 'OWNER',
      email: request['user']?.email,
      locale,
    });
  }
}
