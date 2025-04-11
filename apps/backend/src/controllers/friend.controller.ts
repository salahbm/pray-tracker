// src/controllers/friend.controller.ts

import { handleError } from '../middleware/error-handler';
import { FriendService } from '../services/friend.service';
import { createResponse, StatusCode, MessageCodes } from '../utils/status';
import type { Request, Response } from 'express';

export class FriendController {
  static async getApprovedFriends(req: Request, res: Response) {
    try {
      const { userId } = req.query;
      const data = await FriendService.getApprovedFriends(userId as string);
      res.json(
        createResponse({
          status: StatusCode.SUCCESS,
          message: 'Approved friends and their prayers fetched successfully',
          code: MessageCodes.FRIEND_FETCHED,
          data,
        })
      );
    } catch (error) {
      handleError(res, error);
    }
  }

  static async getPendingRequests(req: Request, res: Response) {
    try {
      const { userId } = req.query;
      const data = await FriendService.getPendingFriendRequests(
        userId as string
      );
      res.json(
        createResponse({
          status: StatusCode.SUCCESS,
          message: 'Pending friend requests fetched successfully',
          code: MessageCodes.FRIEND_FETCHED,
          data,
        })
      );
    } catch (error) {
      handleError(res, error);
    }
  }

  static async sendFriendRequest(req: Request, res: Response) {
    try {
      const data = await FriendService.sendFriendRequest(req.body);
      res.json(
        createResponse({
          status: StatusCode.SUCCESS,
          message: 'Friend request sent successfully',
          code: MessageCodes.FRIEND_REQUESTED,
          data,
        })
      );
    } catch (error) {
      handleError(res, error);
    }
  }

  static async approveFriendRequest(req: Request, res: Response) {
    try {
      const data = await FriendService.approveFriendRequest(req.body);
      res.json(
        createResponse({
          status: StatusCode.SUCCESS,
          message: 'Friend request approved successfully',
          code: MessageCodes.FRIEND_APPROVED,
          data,
        })
      );
    } catch (error) {
      handleError(res, error);
    }
  }

  static async rejectFriendRequest(req: Request, res: Response) {
    try {
      const data = await FriendService.rejectFriendRequest(req.body);
      res.json(
        createResponse({
          status: StatusCode.SUCCESS,
          message: 'Friend request rejected successfully',
          code: MessageCodes.FRIEND_REJECTED,
          data,
        })
      );
    } catch (error) {
      handleError(res, error);
    }
  }

  static async deleteFriend(req: Request, res: Response) {
    try {
      const data = await FriendService.deleteFriend(req.body);
      res.json(
        createResponse({
          status: StatusCode.SUCCESS,
          message: 'Friend deleted successfully',
          code: MessageCodes.FRIEND_DELETED,
          data,
        })
      );
    } catch (error) {
      handleError(res, error);
    }
  }
}
