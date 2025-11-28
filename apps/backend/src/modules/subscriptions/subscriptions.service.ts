import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from '@/db/prisma.service';

export enum SubscriptionStatus {
  ACTIVE = 'ACTIVE',
  EXPIRED = 'EXPIRED',
  CANCELLED = 'CANCELLED',
  TRIAL = 'TRIAL',
}

export enum SubscriptionPlan {
  MONTHLY = 'MONTHLY',
  YEARLY = 'YEARLY',
}

@Injectable()
export class SubscriptionsService {
  private readonly logger = new Logger(SubscriptionsService.name);

  constructor(private readonly prisma: PrismaService) {}

  /**
   * Get user's subscription status
   */
  async getUserSubscription(userId: string) {
    const subscription = await this.prisma.subscription.findUnique({
      where: { userId },
    });

    if (!subscription) {
      return {
        isPremium: false,
        status: null,
        plan: null,
        expiresAt: null,
      };
    }

    const isPremium =
      subscription.status === SubscriptionStatus.ACTIVE ||
      subscription.status === SubscriptionStatus.TRIAL;

    return {
      isPremium,
      status: subscription.status,
      plan: subscription.plan,
      expiresAt: subscription.expiresAt,
      revenueCatId: subscription.revenueCatId,
    };
  }

  /**
   * Handle RevenueCat webhook events
   */
  async handleWebhook(event: any) {
    this.logger.log(`Processing webhook event: ${event.type}`);

    const {
      type,
      app_user_id,
      product_id,
      expiration_at_ms,
      cancellation_at_ms,
    } = event;

    try {
      switch (type) {
        case 'INITIAL_PURCHASE':
        case 'RENEWAL':
        case 'UNCANCELLATION':
          await this.activateSubscription(
            app_user_id,
            product_id,
            expiration_at_ms,
          );
          break;

        case 'CANCELLATION':
          await this.cancelSubscription(app_user_id, cancellation_at_ms);
          break;

        case 'EXPIRATION':
          await this.expireSubscription(app_user_id);
          break;

        case 'PRODUCT_CHANGE':
          await this.changeSubscriptionPlan(
            app_user_id,
            product_id,
            expiration_at_ms,
          );
          break;

        default:
          this.logger.warn(`Unhandled webhook event type: ${type}`);
      }

      return { success: true };
    } catch (error) {
      this.logger.error(
        `Error processing webhook: ${error.message}`,
        error.stack,
      );
      throw error;
    }
  }

  /**
   * Activate or renew subscription
   */
  private async activateSubscription(
    userId: string,
    productId: string,
    expirationMs: number,
  ) {
    const plan = this.getPlanFromProductId(productId);
    const expiresAt = new Date(expirationMs);

    await this.prisma.subscription.upsert({
      where: { userId },
      create: {
        userId,
        status: SubscriptionStatus.ACTIVE,
        plan,
        expiresAt,
        revenueCatId: productId,
      },
      update: {
        status: SubscriptionStatus.ACTIVE,
        plan,
        expiresAt,
        revenueCatId: productId,
      },
    });

    this.logger.log(`Activated ${plan} subscription for user ${userId}`);
  }

  /**
   * Cancel subscription (but keep active until expiration)
   */
  private async cancelSubscription(userId: string, cancellationMs: number) {
    await this.prisma.subscription.update({
      where: { userId },
      data: {
        status: SubscriptionStatus.CANCELLED,
        cancelledAt: new Date(cancellationMs),
      },
    });

    this.logger.log(`Cancelled subscription for user ${userId}`);
  }

  /**
   * Expire subscription
   */
  private async expireSubscription(userId: string) {
    await this.prisma.subscription.update({
      where: { userId },
      data: {
        status: SubscriptionStatus.EXPIRED,
      },
    });

    this.logger.log(`Expired subscription for user ${userId}`);
  }

  /**
   * Change subscription plan
   */
  private async changeSubscriptionPlan(
    userId: string,
    productId: string,
    expirationMs: number,
  ) {
    const plan = this.getPlanFromProductId(productId);
    const expiresAt = new Date(expirationMs);

    await this.prisma.subscription.update({
      where: { userId },
      data: {
        plan,
        expiresAt,
        revenueCatId: productId,
      },
    });

    this.logger.log(`Changed subscription plan to ${plan} for user ${userId}`);
  }

  /**
   * Map RevenueCat product ID to subscription plan
   */
  private getPlanFromProductId(productId: string): SubscriptionPlan {
    if (productId.includes('monthly')) {
      return SubscriptionPlan.MONTHLY;
    } else if (productId.includes('yearly')) {
      return SubscriptionPlan.YEARLY;
    }
    return SubscriptionPlan.MONTHLY; // default
  }

  /**
   * Check if user has premium access
   */
  async isPremiumUser(userId: string): Promise<boolean> {
    const subscription = await this.getUserSubscription(userId);
    return subscription.isPremium;
  }
}
