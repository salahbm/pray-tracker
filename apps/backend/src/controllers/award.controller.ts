// src/controllers/award.controller.ts

import type { Request, Response } from 'express';
import { ApiError, handleError } from '../middleware/error-handler';
import { createResponse, MessageCodes, StatusCode } from '../utils/status';
import { AwardService } from '../services/award.service';

export class AwardController {
  static async getUserAwards(req: Request, res: Response) {
    try {
      const userId = req.params.id;

      if (!userId || typeof userId !== 'string') {
        throw new ApiError({
          status: StatusCode.BAD_REQUEST,
          code: MessageCodes.UNAUTHORIZED,
          message: 'User ID is required',
        });
      }

      const awards = await AwardService.getUserAwards(userId);
      res.json(
        createResponse({
          status: StatusCode.SUCCESS,
          message: 'Awards fetched successfully',
          code: MessageCodes.AWARD_FETCHED,
          data: awards,
        })
      );
    } catch (error) {
      handleError(res, error);
    }
  }
}
