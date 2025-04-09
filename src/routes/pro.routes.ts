import express from 'express';
import { ProController } from '../controllers/pro.controller';

const router = express.Router();

router.get('/', ProController.getPro);

export default router;
