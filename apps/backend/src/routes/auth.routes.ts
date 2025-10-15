import express from 'express';
import { createAuthMiddleware } from '@prayer/auth';

const router = express.Router();

// Delegate every /api/auth request to the Better Auth handler.
router.use(createAuthMiddleware({ basePath: '/api/auth' }));

export default router;
