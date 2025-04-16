import express from 'express';
import { AuthController } from '../controllers/auth.controller';

const router = express.Router();

router.post('/login', AuthController.login);
router.post('/register', AuthController.register);
router.post('/verify-otp', AuthController.verifyOtp); // for both signup and password reset, verifies the OTP, type can be 'signup' or 'email'
router.post('/update-password', AuthController.updatePassword); // when logged in
router.post('/request-reset', AuthController.requestPasswordReset); // when not logged in, sends reset code
router.post('/refresh', AuthController.refreshSession);
router.delete('/delete', AuthController.deleteUser);

export default router;
