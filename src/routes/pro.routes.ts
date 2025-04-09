import express from 'express';
import { ProController } from '../controllers/pro.controller';

const router = express.Router();

// GET /api/pro
router.get('/', ProController.getPro);

export default router;
