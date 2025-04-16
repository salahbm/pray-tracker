import type { Request, Response } from 'express';
import { AuthService } from '../services/auth.service';
import { UserService } from '../services/user.service';
import { createResponse, MessageCodes, StatusCode } from '../utils/status';
import { ApiError, handleError } from '../middleware/error-handler';
import type {
  IUserRegistrationParams,
  IVerifyOtpParams,
  IUserDelete,
} from '../types/auth';

export class AuthController {
  static async register(req: Request, res: Response) {
    try {
      const params = req.body as IUserRegistrationParams;

      const data = await AuthService.register(params);

      if (!data?.user) {
        throw new ApiError({
          status: StatusCode.BAD_REQUEST,
          code: MessageCodes.SIGN_UP_FAILED,
          message: 'Failed to create user',
        });
      }

      res.status(200).json(
        createResponse({
          status: StatusCode.SUCCESS,
          message: 'User registered successfully. Please verify your email.',
          data: data.user,
        })
      );
    } catch (error) {
      handleError(res, error);
    }
  }

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

  static async verifyOtp(req: Request, res: Response) {
    try {
      const params = req.body as IVerifyOtpParams;

      const data = await AuthService.verifyOtp(params);

      if (!data?.user) {
        throw new ApiError({
          status: StatusCode.BAD_REQUEST,
          code: MessageCodes.VALIDATION_FAILED,
          message: 'Failed to verify OTP',
        });
      }

      let user;
      if (params.type === 'signup') {
        try {
          user = await UserService.createUser({
            username: data.user.user_metadata?.username,
            email: data.user.email!,
            supabaseId: data.user.id,
          });

          res.status(200).json(
            createResponse({
              status: StatusCode.SUCCESS,
              message: 'User verified and created successfully',
              data: {
                user,
                access_token: data.session?.access_token,
                refresh_token: data.session?.refresh_token,
              },
            })
          );
        } catch (createError: any) {
          // Handle unique constraint violations
          if (createError.code === 'P2002') {
            throw new ApiError({
              status: StatusCode.CONFLICT,
              code: MessageCodes.USER_ALREADY_EXISTS,
              message: `User with this ${createError.meta?.target?.[0]} already exists`,
            });
          }
          throw createError;
        }
      } else if (params.type === 'email') {
        try {
          user = await UserService.getUserBySupabaseId(data.user.id);
          res.status(200).json(
            createResponse({
              status: StatusCode.SUCCESS,
              message: 'User verified successfully',
              data: {
                user,
                access_token: data.session?.access_token,
                refresh_token: data.session?.refresh_token,
              },
            })
          );
        } catch (error: any) {
          if (error.code === MessageCodes.USER_NOT_FOUND) {
            throw new ApiError({
              status: StatusCode.NOT_FOUND,
              code: MessageCodes.USER_NOT_FOUND,
              message: 'User not found in database',
            });
          }
          throw error;
        }
      }
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

  static async refreshSession(req: Request, res: Response) {
    try {
      const { refresh_token } = req.body;

      if (!refresh_token) {
        throw new ApiError({
          status: StatusCode.BAD_REQUEST,
          message: 'Refresh token is required',
        });
      }

      const data = await AuthService.refreshSession(refresh_token);

      if (!data.session || !data.user) {
        throw new ApiError({
          status: StatusCode.UNAUTHORIZED,
          message: 'Failed to refresh session',
        });
      }

      const user = await UserService.getUserBySupabaseId(data?.user?.id);

      res.status(200).json(
        createResponse({
          status: StatusCode.SUCCESS,
          message: 'Token refreshed',
          data: {
            access_token: data.session.access_token,
            refresh_token: data.session.refresh_token,
            expires_at: data.session.expires_at,
            user,
          },
        })
      );
    } catch (error) {
      handleError(res, error);
    }
  }

  static async deleteUser(req: Request, res: Response) {
    try {
      const params = req.body as IUserDelete;

      await AuthService.deleteUser(params);

      res.status(200).json(
        createResponse({
          status: StatusCode.SUCCESS,
          message: 'User deleted successfully',
          data: { success: true },
        })
      );
    } catch (error) {
      handleError(res, error);
    }
  }
}
