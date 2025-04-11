import express from 'express';
import { AuthController } from '../controllers/auth.controller';

const router = express.Router();

router.post('/login', AuthController.login);
router.post('/register', AuthController.register);
router.post('/verify-otp', AuthController.verifyOtp);
router.post('/update-password', AuthController.updatePassword);
router.post('/request-reset', AuthController.requestPasswordReset);
router.post('/refresh', AuthController.refreshSession);
router.delete('/delete', AuthController.deleteUser);

export default router;
