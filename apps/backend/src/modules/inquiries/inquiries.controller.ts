import {
  Body,
  BadRequestException,
  Controller,
  Get,
  Headers,
  Param,
  Post,
  Query,
  UnauthorizedException,
} from '@nestjs/common';
import type { Request } from 'express';
import { Public } from '@/common/decorators/public.decorator';
import { CreateInquiryDto } from './dto/create-inquiry.dto';
import { CreateInquiryMessageDto } from './dto/create-inquiry-message.dto';
import { InquiriesService } from './inquiries.service';
import { type Locale } from '@/common/utils/response.utils';

@Controller('inquiries')
export class InquiriesController {
  constructor(private readonly inquiriesService: InquiriesService) {}

  /**
   * Create a new inquiry with an initial message.
   */
  @Post()
  @Public()
  async create(@Body() dto: CreateInquiryDto) {
    return this.inquiriesService.create(dto);
  }

  /**
   * List inquiries for the provided email.
   */
  @Get()
  @Public()
  async listByEmail(@Query('email') email?: string) {
    if (!email) {
      throw new BadRequestException('Email is required');
    }

    return this.inquiriesService.listByEmail(email);
  }

  /**
   * Get inquiry detail (user or support owner).
   */
  @Get(':id')
  @Public()
  async findOne(
    @Param('id') id: string,
    @Headers('locale') locale: Locale = 'en',
    @Query('email') email?: string,
  ) {
    if (!email) {
      throw new BadRequestException('Email is required');
    }

    return this.inquiriesService.findOne(id, email, locale);
  }

  /**
   * Add a message from the current user.
   */
  @Post(':id/messages')
  async addMessage(
    @Headers('x-user-id') userId: string,
    @Param('id') id: string,
    @Body() dto: CreateInquiryMessageDto,
    @Headers('locale') locale: Locale = 'en',
  ) {
    console.log(userId);
    if (!userId) {
      throw new UnauthorizedException('No active session found');
    }
    return this.inquiriesService.addMessage(id, dto, {
      userId,
      email: dto.email,
      locale,
    });
  }
}
