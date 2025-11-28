import {
  Controller,
  Get,
  Post,
  Body,
  Headers,
  HttpCode,
  HttpStatus,
  UnauthorizedException,
} from '@nestjs/common';
import { SubscriptionsService } from './subscriptions.service';

@Controller('subscriptions')
export class SubscriptionsController {
  constructor(private readonly subscriptionsService: SubscriptionsService) {}

  /**
   * Get current user's subscription status
   * GET /subscriptions/status
   */
  @Get('status')
  async getSubscriptionStatus(@Headers('x-user-id') userId: string) {
    if (!userId) {
      throw new UnauthorizedException('User ID is required');
    }

    const subscription =
      await this.subscriptionsService.getUserSubscription(userId);

    return {
      success: true,
      data: subscription,
    };
  }

  /**
   * RevenueCat webhook endpoint
   * POST /subscriptions/webhook
   */
  @Post('webhook')
  @HttpCode(HttpStatus.OK)
  async handleWebhook(
    @Body() event: any,
    @Headers('authorization') authHeader: string,
  ) {
    // Verify webhook signature (RevenueCat sends a shared secret)
    const revenueCatSecret = process.env.REVENUECAT_WEBHOOK_SECRET;

    if (revenueCatSecret && authHeader !== `Bearer ${revenueCatSecret}`) {
      throw new UnauthorizedException('Invalid webhook signature');
    }

    await this.subscriptionsService.handleWebhook(event);

    return {
      success: true,
      message: 'Webhook processed successfully',
    };
  }

  /**
   * Check if user is premium
   * GET /subscriptions/is-premium
   */
  @Get('is-premium')
  async isPremium(@Headers('x-user-id') userId: string) {
    if (!userId) {
      throw new UnauthorizedException('User ID is required');
    }

    const isPremium = await this.subscriptionsService.isPremiumUser(userId);

    return {
      success: true,
      data: { isPremium },
    };
  }
}
