import { Router } from 'express';
import { PrayerController } from '../controllers/prayer.controller';

const router = Router();

// Match original serverless paths
router.get('/:id/today', PrayerController.getTodaysPrayers);
router.post('/:id/post', PrayerController.updatePrayer);
router.get('/:id/stats', PrayerController.getPrayerStats);

export default router;
