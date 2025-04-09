import type { Request, Response } from 'express';
import { AuthService } from '../services/auth.service';
import { createResponse, MessageCodes, StatusCode } from '../utils/status';
import { ApiError, handleError } from '../middleware/error-handler';
import { UserService } from '../services/user.service';

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

      return res.json(
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
}
