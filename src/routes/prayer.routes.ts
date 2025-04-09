// src/routes/prayer.routes.ts
import express from 'express';
import { PrayerController } from '../controllers/prayer.controller';

const router = express.Router();

router.get('/:id/year', PrayerController.getPrayersByYear);
router.get('/:id/today', PrayerController.getTodaysPrayer);
router.post('/', PrayerController.upsertPrayer);

export default router;
