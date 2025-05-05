import {
  CustomerCreatedEvent,
  CustomerUpdatedEvent,
  EventEntity,
  EventName,
  SubscriptionCreatedEvent,
  SubscriptionUpdatedEvent,
} from '@paddle/paddle-node-sdk';
import { getPaddleInstance } from '../utils/paddle/get-paddle-instance';
import { prisma } from '../lib/prisma'; // or wherever your Prisma client is
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
      case EventName.SubscriptionCreated:
      case EventName.SubscriptionUpdated:
        await this.updateSubscription(
          eventData as SubscriptionCreatedEvent | SubscriptionUpdatedEvent
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

    // Find user by email (assuming the Paddle customer email matches your user)
    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      throw new ApiError({
        message: `No user found with email: ${email}`,
        status: StatusCode.NOT_FOUND,
        code: MessageCodes.USER_NOT_FOUND,
      });
    }

    await prisma.customer.upsert({
      where: { customerId: id },
      update: {
        email,
        userId: user.id,
      },
      create: {
        customerId: id,
        email,
        userId: user.id,
      },
    });
  }

  private static async updateSubscription(
    event: SubscriptionCreatedEvent | SubscriptionUpdatedEvent
  ) {
    const sub = event.data;

    // Make sure the customer exists first
    const customer = await prisma.customer.findUnique({
      where: { customerId: sub.customerId },
    });

    if (!customer) {
      throw new ApiError({
        message: `No customer found with ID: ${sub.customerId}`,
        status: StatusCode.NOT_FOUND,
      });
    }

    await prisma.subscription.upsert({
      where: { subscriptionId: sub.id },
      update: {
        status: sub.status,
        priceId: sub.items[0].price?.id ?? '',
        productId: sub.items[0].price?.productId ?? '',
        scheduledChange: sub.scheduledChange?.effectiveAt ?? null,
      },
      create: {
        subscriptionId: sub.id,
        status: sub.status,
        customerId: sub.customerId,
        priceId: sub.items[0].price?.id ?? '',
        productId: sub.items[0].price?.productId ?? '',
        scheduledChange: sub.scheduledChange?.effectiveAt ?? null,
      },
    });
  }
}
