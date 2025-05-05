// services/subscription.service.ts
import {
  CustomerCreatedEvent,
  CustomerUpdatedEvent,
  EventEntity,
  EventName,
  TransactionCreatedEvent,
  TransactionCompletedEvent,
} from '@paddle/paddle-node-sdk';
import { getPaddleInstance } from '../utils/paddle/get-paddle-instance';
import { prisma } from '../lib/prisma';
import { ApiError } from '../middleware/error-handler';
import { MessageCodes, StatusCode } from '../utils/status';

export class SubscriptionService {
  static async processWebhook(rawBody: string, signature: string) {
    const privateKey = process.env.PADDLE_NOTIFICATION_WEBHOOK_SECRET || '';
    const paddle = getPaddleInstance();

    const eventData: EventEntity = await paddle.webhooks.unmarshal(
      rawBody,
      privateKey,
      signature
    );

    if (!eventData?.eventType) {
      throw new ApiError({
        message: 'Invalid Paddle event data',
        status: StatusCode.BAD_REQUEST,
      });
    }

    switch (eventData.eventType) {
      case EventName.TransactionCreated:
      case EventName.TransactionCompleted:
        await this.handleTransaction(
          eventData as TransactionCreatedEvent | TransactionCompletedEvent
        );
        break;

      case EventName.CustomerCreated:
      case EventName.CustomerUpdated:
        await this.updateCustomer(
          eventData as CustomerCreatedEvent | CustomerUpdatedEvent
        );
        break;
    }

    return { event: eventData.eventType };
  }

  private static async updateCustomer(
    event: CustomerCreatedEvent | CustomerUpdatedEvent
  ) {
    const { id, email } = event.data;

    const user = await prisma.user.findUnique({ where: { email } });

    if (!user) {
      throw new ApiError({
        message: `No user found with email: ${email}`,
        status: StatusCode.NOT_FOUND,
        code: MessageCodes.USER_NOT_FOUND,
      });
    }

    await prisma.customer.upsert({
      where: { customerId: id },
      update: { email, userId: user.id },
      create: { customerId: id, email, userId: user.id },
    });
  }

  private static async handleTransaction(
    event: TransactionCreatedEvent | TransactionCompletedEvent
  ) {
    const transaction = event.data;

    const customer = await prisma.customer.findUnique({
      where: { customerId: transaction.customerId! },
    });

    if (!customer) {
      throw new ApiError({
        message: `No customer found with ID: ${transaction.customerId}`,
        status: StatusCode.NOT_FOUND,
      });
    }

    await prisma.subscription.upsert({
      where: { subscriptionId: transaction.id },
      update: {
        status: transaction.status === 'completed' ? 'active' : 'pending',
        priceId: transaction.items[0].price?.id ?? '',
        productId: transaction.items[0].price?.productId ?? '',
        scheduledChange: null,
      },
      create: {
        subscriptionId: transaction.id,
        status: transaction.status === 'completed' ? 'active' : 'pending',
        customerId: customer.id,
        priceId: transaction.items[0].price?.id ?? '',
        productId: transaction.items[0].price?.productId ?? '',
        scheduledChange: null,
      },
    });

    if (transaction.status === 'completed') {
      await prisma.user.update({
        where: { id: customer.userId },
        data: {
          /* Add subscription benefit flags if needed */
        },
      });
    }
  }
}
