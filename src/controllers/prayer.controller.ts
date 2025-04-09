// src/controllers/prayer.controller.ts

import { PrayerService } from '../services/prayer.service';
import { ApiError, handleError } from '../middleware/error-handler';
import { createResponse, MessageCodes, StatusCode } from '../utils/status';
import type { Request, Response } from 'express';

export class PrayerController {
  static async getPrayersByYear(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const { year } = req.query;
      if (!id) {
        throw new ApiError({
          status: StatusCode.BAD_REQUEST,
          code: MessageCodes.UNAUTHORIZED,
          message: 'User ID is required',
        });
      }

      const data = await PrayerService.getPrayersByYear(id, year as string);

      res.json(
        createResponse({
          status: StatusCode.SUCCESS,
          message: 'Prays fetched successfully',
          code: MessageCodes.PRAY_FETCHED,
          data,
        })
      );
    } catch (error) {
      handleError(res, error);
    }
  }

  static async getTodaysPrayer(req: Request, res: Response) {
    try {
      const { id } = req.params;

      if (!id) {
        throw new ApiError({
          status: StatusCode.BAD_REQUEST,
          code: MessageCodes.UNAUTHORIZED,
          message: 'User ID is required',
        });
      }

      const data = await PrayerService.getTodaysPrayer(id);

      res.json(
        createResponse({
          status: StatusCode.SUCCESS,
          message: "Today's prayer fetched successfully",
          code: MessageCodes.PRAY_FETCHED,
          data,
        })
      );
    } catch (error) {
      handleError(res, error);
    }
  }

  static async upsertPrayer(req: Request, res: Response) {
    try {
      const updated = await PrayerService.upsertPrayer(req.body);

      res.json(
        createResponse({
          status: StatusCode.SUCCESS,
          message: 'Prayer record saved',
          code: MessageCodes.PRAY_UPDATED,
          data: updated,
        })
      );
    } catch (error) {
      handleError(res, error);
    }
  }

  static async getPrayerTimes(req: Request, res: Response) {
    try {
      const { lat, lng, tz } = req.query;

      if (!lat || !lng || !tz) {
        throw new ApiError({
          status: StatusCode.BAD_REQUEST,
          code: MessageCodes.MISSING_REQUIRED_FIELDS,
          message: 'Latitude, longitude, and timezone are required',
        });
      }

      const data = await PrayerService.getPrayerTimes({
        tz: tz as string,
        lat: lat as string,
        lng: lng as string,
      });

      res.status(200).json(
        createResponse({
          status: StatusCode.SUCCESS,
          message: 'Prayer times fetched successfully',
          data,
        })
      );
    } catch (error) {
      handleError(res, error);
    }
  }
}
