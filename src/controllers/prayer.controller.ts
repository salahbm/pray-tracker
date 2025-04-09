import { PrismaClient } from '@prisma/client';
import { createResponse, MessageCodes, StatusCode } from '../utils/status';
import { PrayerService } from '../services/prayer.service';
import type { Request, Response } from 'express';
import { ApiError } from '../middleware/error-handler';

const prisma = new PrismaClient();
const prayerService = new PrayerService(prisma);

export class PrayerController {
  static async getTodaysPrayers(req: Request, res: Response) {
    try {
      const { id: userId } = req.params;
      const { today } = req.query;

      if (!userId) {
        return res.status(StatusCode.UNAUTHORIZED).json(
          createResponse({
            status: StatusCode.UNAUTHORIZED,
            message: 'Please, Sign In to fetch Prays',
            code: MessageCodes.UNAUTHORIZED,
            data: null,
          })
        );
      }

      const pray = await prayerService.getTodaysPrayers(
        userId,
        today as string
      );

      if (!pray) {
        return res.status(StatusCode.SUCCESS).json(
          createResponse({
            status: StatusCode.SUCCESS,
            message: 'No Pray found for today',
            code: MessageCodes.PRAY_NOT_FOUND,
            data: null,
          })
        );
      }

      return res.status(StatusCode.SUCCESS).json(
        createResponse({
          status: StatusCode.SUCCESS,
          message: 'Today`s Pray fetched successfully',
          code: MessageCodes.PRAY_FETCHED,
          data: pray,
        })
      );
    } catch (error) {
      console.error('Error in getTodaysPrayers:', error);
      return res.status(StatusCode.INTERNAL_ERROR).json(
        createResponse({
          status: StatusCode.INTERNAL_ERROR,
          message:
            error instanceof ApiError
              ? error.message
              : 'Failed to fetch today`s prayers',
          code: MessageCodes.SOMETHING_WENT_WRONG,
          data: null,
        })
      );
    }
  }

  static async updatePrayer(req: Request, res: Response) {
    try {
      const { id: userId } = req.params;
      const { prayerName, status, date } = req.body;

      if (!userId) {
        return res.status(StatusCode.UNAUTHORIZED).json(
          createResponse({
            status: StatusCode.UNAUTHORIZED,
            message: 'Please, Sign In to update Prays',
            code: MessageCodes.UNAUTHORIZED,
            data: null,
          })
        );
      }

      const prayer = await prayerService.updatePrayer(userId, {
        prayerName,
        status,
        date: new Date(date),
      });

      return res.status(StatusCode.SUCCESS).json(
        createResponse({
          status: StatusCode.SUCCESS,
          message: 'Prayer updated successfully',
          code: MessageCodes.PRAY_UPDATED,
          data: prayer,
        })
      );
    } catch (error) {
      console.error('Error in updatePrayer:', error);
      return res.status(StatusCode.INTERNAL_ERROR).json(
        createResponse({
          status: StatusCode.INTERNAL_ERROR,
          message:
            error instanceof ApiError
              ? error.message
              : 'Failed to update prayer',
          code: MessageCodes.SOMETHING_WENT_WRONG,
          data: null,
        })
      );
    }
  }

  static async getPrayerStats(req: Request, res: Response) {
    try {
      const { id: userId } = req.params;

      if (!userId) {
        return res.status(StatusCode.UNAUTHORIZED).json(
          createResponse({
            status: StatusCode.UNAUTHORIZED,
            message: 'Please, Sign In to view stats',
            code: MessageCodes.UNAUTHORIZED,
            data: null,
          })
        );
      }

      const stats = await prayerService.getPrayerStats(userId);

      return res.status(StatusCode.SUCCESS).json(
        createResponse({
          status: StatusCode.SUCCESS,
          message: 'Prayer stats fetched successfully',
          data: stats,
        })
      );
    } catch (error) {
      console.error('Error in getPrayerStats:', error);
      return res.status(StatusCode.INTERNAL_ERROR).json(
        createResponse({
          status: StatusCode.INTERNAL_ERROR,
          message:
            error instanceof ApiError
              ? error.message
              : 'Failed to fetch prayer stats',
          code: MessageCodes.SOMETHING_WENT_WRONG,
          data: null,
        })
      );
    }
  }
}
