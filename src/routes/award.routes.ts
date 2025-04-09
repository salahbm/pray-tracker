import express from 'express';
import { AwardController } from '../controllers/award.controller';

const router = express.Router();

// GET /api/awards?userId=<userId>
router.get('/', AwardController.getUserAwards);

export default router;
