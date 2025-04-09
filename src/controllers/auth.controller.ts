import type { Request, Response } from 'express';
import { AuthService } from '../services/auth.service';
import { createResponse, MessageCodes, StatusCode } from '../utils/status';
import { ApiError, handleError } from '../middleware/error-handler';
import { UserService } from '../services/user.service';
import { supabase } from '../lib/supabase';

export class AuthController {
  static async register() {}

  static async login(req: Request, res: Response) {
    try {
      const { email, password } = req.body;

      if (!email || !password) {
        throw new ApiError({
          status: StatusCode.BAD_REQUEST,
          code: MessageCodes.MISSING_REQUIRED_FIELDS,
          message: 'Email and password are required',
          details: { email, password },
        });
      }

      const { user, session } = await AuthService.login(email, password);

      if (!user || !session) {
        throw new ApiError({
          status: StatusCode.INTERNAL_ERROR,
          code: MessageCodes.SIGN_IN_FAILED,
          message: 'Failed to login',
        });
      }

      const fullUser = await UserService.getUserBySupabaseId(user.id);

      res.json(
        createResponse({
          status: StatusCode.SUCCESS,
          message: 'User logged in successfully',
          data: { user: fullUser, session },
        })
      );
    } catch (error) {
      handleError(res, error);
    }
  }

  static async updatePassword(req: Request, res: Response) {
    try {
      const { email, newPassword } = req.body;

      const result = await AuthService.updatePassword(email, newPassword);

      res.status(200).json(
        createResponse({
          status: StatusCode.SUCCESS,
          code: MessageCodes.USER_UPDATED,
          message: 'Password updated successfully',
          data: result,
        })
      );
    } catch (error) {
      handleError(res, error);
    }
  }

  static async requestPasswordReset(req: Request, res: Response) {
    try {
      const { email } = req.body;
      const data = await AuthService.requestPasswordReset(email);

      res.status(200).json(
        createResponse({
          status: StatusCode.SUCCESS,
          message: 'Reset email sent',
          data,
        })
      );
    } catch (error) {
      handleError(res, error);
    }
  }

  static async verifyResetToken(req: Request, res: Response) {
    try {
      const { email, token } = req.body;
      const data = await AuthService.verifyResetOtp({ email, token });
      if (!data.user || !data.session) {
        throw new ApiError({
          status: StatusCode.BAD_REQUEST,
          code: MessageCodes.VALIDATION_FAILED,
          message: 'Invalid OTP',
        });
      }

      const user = await UserService.getUserBySupabaseId(data.user.id);

      await supabase.auth.setSession({
        access_token: data.session.access_token,
        refresh_token: data.session.refresh_token,
      });

      res.status(200).json(
        createResponse({
          status: StatusCode.SUCCESS,
          message: 'OTP verified successfully',
          code: MessageCodes.SUCCESS,
          data: {
            session: data.session,
            user: user,
          },
        })
      );
    } catch (error) {
      handleError(res, error);
    }
  }
}
