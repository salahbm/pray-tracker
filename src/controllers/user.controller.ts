import type { Request, Response } from 'express';
import { createResponse, StatusCode, MessageCodes } from '../utils/status';
import { handleError } from '../middleware/error-handler';
import { UserService } from '../services/user.service';

export class UserController {
  static async getTopUsers(_req: Request, res: Response) {
    try {
      const users = await UserService.getTopUsers();
      res.json(
        createResponse({
          status: StatusCode.SUCCESS,
          message: 'Users fetched successfully',
          code: MessageCodes.USER_FETCHED,
          data: users,
        })
      );
    } catch (error) {
      handleError(res, error);
    }
  }

  static async getUser(req: Request, res: Response) {
    try {
      const supabaseId = req.query.id as string;

      if (!supabaseId) {
        throw {
          status: StatusCode.UNAUTHORIZED,
          message: 'Please, Sign In to fetch User',
        };
      }

      const user = await UserService.getUserBySupabaseId(supabaseId);
      res.json(
        createResponse({
          status: StatusCode.SUCCESS,
          message: 'User fetched successfully',
          code: MessageCodes.USER_FETCHED,
          data: user,
        })
      );
    } catch (error) {
      handleError(res, error);
    }
  }

  static async createUser(req: Request, res: Response) {
    try {
      const newUser = await UserService.createUser(req.body);
      res.json(
        createResponse({
          status: StatusCode.SUCCESS,
          message: 'User created successfully',
          code: MessageCodes.USER_CREATED,
          data: newUser,
        })
      );
    } catch (error) {
      handleError(res, error);
    }
  }

  static async updateUser(req: Request, res: Response) {
    try {
      const updatedUser = await UserService.updateUser(req.body);
      res.json(
        createResponse({
          status: StatusCode.SUCCESS,
          message: 'User updated successfully',
          code: req.body.toast ? undefined : MessageCodes.USER_UPDATED,
          data: updatedUser,
        })
      );
    } catch (error) {
      handleError(res, error);
    }
  }

  static async deleteUser(req: Request, res: Response) {
    try {
      const deleted = await UserService.deleteUser(req.body.id);
      res.json(
        createResponse({
          status: StatusCode.SUCCESS,
          message: 'User deleted successfully',
          code: MessageCodes.USER_DELETED,
          data: deleted,
        })
      );
    } catch (error) {
      handleError(res, error);
    }
  }
}
