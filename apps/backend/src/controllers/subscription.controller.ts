import { Request, Response } from 'express';
import { SubscriptionService } from '../services/subscription.service';
import { handleError } from '../middleware/error-handler';
import { createResponse, StatusCode } from '../utils/status';

export class SubscriptionController {
  static async handleSubscriptionWebhook(req: Request, res: Response) {
    try {
      const signature = req.headers['paddle-signature'] as string;
      const rawBody = req.body?.raw; // see note below on raw body parsing

      if (!signature || !rawBody) {
        return res.status(400).json({ error: 'Missing signature or body' });
      }

      const result = await SubscriptionService.processWebhook(
        rawBody,
        signature
      );
      return res.json(
        createResponse({
          status: StatusCode.SUCCESS,
          message: 'Webhook processed',
          data: result,
        })
      );
    } catch (error) {
      return handleError(res, error);
    }
  }
}
