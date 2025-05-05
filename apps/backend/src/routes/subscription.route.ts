import express from 'express';
import { SubscriptionController } from '../controllers/subscription.controller';

const router = express.Router();

router.post('/checkout-webhook', async (req, res) => {
  await SubscriptionController.handleSubscriptionWebhook(req, res);
});

export default router;
