import type { Response } from 'express';
import { handleError } from '../middleware/error-handler';
import { createResponse, StatusCode } from '../utils/status';
import { ProService } from '../services/pro.service';

export class ProController {
  static async getPro(res: Response) {
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
