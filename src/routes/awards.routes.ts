import express from 'express';
import { AwardController } from '../controllers/award.controller';

const router = express.Router();

// GET /api/awards
router.get('/:id', AwardController.getUserAwards);

export default router;
