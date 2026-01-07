import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import {
  Inquiry,
  InquiryMessage,
  InquirySenderRole,
  Prisma,
} from '../../generated/prisma';
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

  private getSupportOwnerEmails(): string[] {
    return (process.env.SUPPORT_OWNER_EMAILS || '')
      .split(',')
      .map((email) => email.trim())
      .filter(Boolean);
  }

  private isSupportOwner(email?: string | null): boolean {
    if (!email) return false;
    const owners = this.getSupportOwnerEmails();
    return owners.includes(email);
  }

  private ensureOwner(email: string | undefined, locale: Locale) {
    if (!this.isSupportOwner(email)) {
      throw new ForbiddenException({
        error: 'FORBIDDEN',
        message: getLocalizedMessage('FORBIDDEN', locale),
      });
    }
  }

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

  private ensureInquiryAccess(
    inquiry: Inquiry,
    userId: string | undefined,
    email: string | undefined,
    locale: Locale,
  ) {
    if (this.isSupportOwner(email)) return;

    if (!userId || inquiry.userId !== userId) {
      throw new ForbiddenException({
        error: 'FORBIDDEN',
        message: getLocalizedMessage('FORBIDDEN', locale),
      });
    }
  }

  async create(
    userId: string,
    dto: CreateInquiryDto,
  ): Promise<InquiryWithMessages> {
    return this.prisma.inquiry.create({
      data: {
        userId,
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

  async listByUser(userId: string): Promise<InquiryListItem[]> {
    const inquiries = await this.prisma.inquiry.findMany({
      where: { userId },
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

  async listAll(params: {
    skip?: number;
    take?: number;
    userId?: string;
  }): Promise<InquiryListItem[]> {
    const inquiries = await this.prisma.inquiry.findMany({
      where: params.userId ? { userId: params.userId } : undefined,
      skip: params.skip,
      take: params.take,
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

  async count(where?: Prisma.InquiryWhereInput): Promise<number> {
    return this.prisma.inquiry.count({ where });
  }

  async findOne(
    id: string,
    userId: string | undefined,
    email: string | undefined,
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

    this.ensureInquiryAccess(inquiry, userId, email, locale);

    return inquiry;
  }

  async addMessage(
    inquiryId: string,
    dto: CreateInquiryMessageDto,
    params: {
      senderRole: InquirySenderRole;
      userId?: string;
      email?: string;
      locale: Locale;
    },
  ): Promise<InquiryMessage> {
    const inquiry = await this.getInquiryOrThrow(inquiryId, params.locale);

    if (params.senderRole === 'OWNER') {
      this.ensureOwner(params.email, params.locale);
    } else {
      this.ensureInquiryAccess(
        inquiry,
        params.userId,
        params.email,
        params.locale,
      );
    }

    return this.prisma.$transaction(async (tx) => {
      const message = await tx.inquiryMessage.create({
        data: {
          inquiryId,
          senderRole: params.senderRole,
          body: dto.message,
          userId: params.senderRole === 'USER' ? params.userId : undefined,
        },
      });

      await tx.inquiry.update({
        where: { id: inquiryId },
        data: { updatedAt: new Date() },
      });

      return message;
    });
  }

  ensureOwnerAccess(email: string | undefined, locale: Locale) {
    this.ensureOwner(email, locale);
  }
}
