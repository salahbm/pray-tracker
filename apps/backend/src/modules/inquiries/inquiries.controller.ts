import {
  Body,
  BadRequestException,
  Controller,
  Get,
  Headers,
  Param,
  Patch,
  Post,
  Query,
  Req,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import type { Request } from 'express';
import { Public } from '@/common/decorators/public.decorator';
import { AuthGuard } from '@/common/guards/auth.guard';
import { CreateInquiryDto } from './dto/create-inquiry.dto';
import { CreateInquiryMessageDto } from './dto/create-inquiry-message.dto';
import { InquiriesService } from './inquiries.service';
import { type Locale } from '@/common/utils/response.utils';
import { parsePaginationParams, createPaginatedResponse } from '@/common/utils';
import { Prisma } from '../../generated/prisma';

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

  /**
   * Admin: Get all inquiries with pagination and filtering
   */
  @Get('admin/all')
  async getAllInquiries(
    @Query('page') page?: string,
    @Query('limit') limit?: string,
    @Query('status') status?: 'OPEN' | 'CLOSED',
  ) {
    const {
      skip,
      take,
      page: currentPage,
    } = parsePaginationParams({
      page,
      limit,
    });

    const where: Prisma.InquiryWhereInput | undefined = status
      ? { status }
      : undefined;

    const [inquiries, total] = await Promise.all([
      this.inquiriesService.findAll({
        skip,
        take,
        where,
        orderBy: { updatedAt: 'desc' },
      }),
      this.inquiriesService.count(where),
    ]);

    return createPaginatedResponse(inquiries, total, currentPage, take);
  }

  /**
   * Admin: Get inquiry detail by ID
   */
  @Get('admin/:id')
  @UseGuards(AuthGuard)
  async getInquiryById(
    @Param('id') id: string,
    @Headers('locale') locale: Locale = 'en',
  ) {
    return this.inquiriesService.findById(id, locale);
  }

  /**
   * Admin: Update inquiry status
   */
  @Patch('admin/:id/status')
  @UseGuards(AuthGuard)
  async updateInquiryStatus(
    @Param('id') id: string,
    @Body('status') status: 'OPEN' | 'CLOSED',
    @Headers('locale') locale: Locale = 'en',
  ) {
    return this.inquiriesService.updateStatus(id, status, locale);
  }

  /**
   * Admin: Reply to inquiry
   */
  @Post('admin/:id/reply')
  @UseGuards(AuthGuard)
  async replyToInquiry(
    @Req() request: Request,
    @Param('id') id: string,
    @Body('message') message: string,
    @Headers('locale') locale: Locale = 'en',
  ) {
    const userId = request.user?.id;
    if (!userId) {
      throw new UnauthorizedException('No active session found');
    }

    return this.inquiriesService.addAdminReply(id, message, userId, locale);
  }
}
