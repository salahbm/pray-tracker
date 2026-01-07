import { Injectable, NotFoundException } from '@nestjs/common';
import { Inquiry, InquiryMessage, Prisma } from '../../generated/prisma';
import { PrismaService } from '@/db/prisma.service';
import { CreateInquiryDto } from './dto/create-inquiry.dto';
import { CreateInquiryMessageDto } from './dto/create-inquiry-message.dto';
import { getLocalizedMessage } from '@/common/i18n/error-messages';
import { Locale } from '@/common/utils/response.utils';

export type InquiryListItem = Inquiry & {
  lastMessage: InquiryMessage | null;
  messageCount: number;
};

export type InquiryWithMessages = Prisma.InquiryGetPayload<{
  include: {
    messages: true;
  };
}>;

@Injectable()
export class InquiriesService {
  constructor(private readonly prisma: PrismaService) {}

  private async getInquiryOrThrow(id: string, locale: Locale) {
    const inquiry = await this.prisma.inquiry.findUnique({
      where: { id },
    });

    if (!inquiry) {
      throw new NotFoundException({
        error: 'NOT_FOUND',
        message: getLocalizedMessage('NOT_FOUND', locale),
      });
    }

    return inquiry;
  }

  async create(
    dto: CreateInquiryDto,
    userId?: string,
  ): Promise<InquiryWithMessages> {
    return this.prisma.inquiry.create({
      data: {
        userId,
        email: dto.email,
        subject: dto.subject,
        status: 'OPEN',
        messages: {
          create: {
            senderRole: 'USER',
            body: dto.message,
            userId,
          },
        },
      },
      include: {
        messages: {
          orderBy: { createdAt: 'asc' },
        },
      },
    });
  }

  async listByEmail(email: string): Promise<InquiryListItem[]> {
    const inquiries = await this.prisma.inquiry.findMany({
      where: { email },
      orderBy: { updatedAt: 'desc' },
      include: {
        messages: {
          orderBy: { createdAt: 'desc' },
          take: 1,
        },
        _count: { select: { messages: true } },
      },
    });

    return inquiries.map(({ messages, _count, ...inquiry }) => ({
      ...inquiry,
      lastMessage: messages[0] ?? null,
      messageCount: _count.messages,
    }));
  }

  async findOne(
    id: string,
    email: string,
    locale: Locale,
  ): Promise<InquiryWithMessages> {
    const inquiry = await this.prisma.inquiry.findUnique({
      where: { id },
      include: {
        messages: {
          orderBy: { createdAt: 'asc' },
        },
      },
    });

    if (!inquiry) {
      throw new NotFoundException({
        error: 'NOT_FOUND',
        message: getLocalizedMessage('NOT_FOUND', locale),
      });
    }

    if (inquiry.email !== email) {
      throw new NotFoundException({
        error: 'NOT_FOUND',
        message: getLocalizedMessage('NOT_FOUND', locale),
      });
    }

    return inquiry;
  }

  async addMessage(
    inquiryId: string,
    dto: CreateInquiryMessageDto,
    params: {
      userId?: string;
      email: string;
      locale: Locale;
    },
  ): Promise<InquiryMessage> {
    const inquiry = await this.getInquiryOrThrow(inquiryId, params.locale);

    if (inquiry.email !== params.email) {
      throw new NotFoundException({
        error: 'NOT_FOUND',
        message: getLocalizedMessage('NOT_FOUND', params.locale),
      });
    }

    return this.prisma.$transaction(async tx => {
      const message = await tx.inquiryMessage.create({
        data: {
          inquiryId,
          senderRole: 'USER',
          body: dto.message,
          userId: params.userId,
        },
      });

      await tx.inquiry.update({
        where: { id: inquiryId },
        data: { updatedAt: new Date() },
      });

      return message;
    });
  }
}
