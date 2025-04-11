import type { Request, Response } from 'express';
import { handleError } from '../middleware/error-handler';
import { createResponse, StatusCode } from '../utils/status';
import { ProService } from '../services/pro.service';
import { UserService } from '../services/user.service';

export class ProController {
  static async getPro(_req: Request, res: Response) {
    try {
      const pro = await ProService.getPro();
      res.json(
        createResponse({
          status: StatusCode.SUCCESS,
          message: 'Pro fetched successfully',
          data: pro,
        })
      );
    } catch (error) {
      handleError(res, error);
    }
  }
}
