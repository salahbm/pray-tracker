import express from 'express';
import { AuthController } from '../controllers/auth.controller';
import { authMiddleware } from '../middleware/auth';

const router = express.Router();

router.post('/login', AuthController.login);
router.post('/register', AuthController.register);
router.post('/update-password', AuthController.updatePassword);
router.post('/request-reset', AuthController.requestPasswordReset);
router.post('/verify-reset', AuthController.verifyResetToken);
router.post('/refresh', AuthController.refreshSession);

export default router;
