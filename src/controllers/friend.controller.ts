import type { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import { createResponse, MessageCodes, StatusCode } from '../utils/status';
import { FriendService } from '../services/friend.service';

const prisma = new PrismaClient();
const friendService = new FriendService(prisma);

export class FriendController {
  static async getApprovedFriends(req: Request, res: Response) {
    try {
      const { userId } = req.query;

      if (!userId || typeof userId !== 'string') {
        return res.status(StatusCode.BAD_REQUEST).json(
          createResponse({
            status: StatusCode.BAD_REQUEST,
            message: 'Missing required fields',
            code: MessageCodes.BAD_REQUEST,
            data: { userId },
          })
        );
      }

      const friends = await friendService.getApprovedFriends(userId);

      return res.status(StatusCode.SUCCESS).json(
        createResponse({
          status: StatusCode.SUCCESS,
          message: 'Approved friends fetched successfully',
          data: friends,
        })
      );
    } catch (error) {
      console.error('Error in getApprovedFriends:', error);
      return res.status(StatusCode.INTERNAL_ERROR).json(
        createResponse({
          status: StatusCode.INTERNAL_ERROR,
          message: 'Failed to fetch approved friends',
          code: MessageCodes.SOMETHING_WENT_WRONG,
          data: null,
        })
      );
    }
  }

  static async getPendingRequests(req: Request, res: Response) {
    try {
      const { userId } = req.query;

      if (!userId || typeof userId !== 'string') {
        return res.status(StatusCode.BAD_REQUEST).json(
          createResponse({
            status: StatusCode.BAD_REQUEST,
            message: 'Missing required fields',
            code: MessageCodes.BAD_REQUEST,
            data: { userId },
          })
        );
      }

      const requests = await friendService.getPendingRequests(userId);

      return res.status(StatusCode.SUCCESS).json(
        createResponse({
          status: StatusCode.SUCCESS,
          message: 'Pending requests fetched successfully',
          data: requests,
        })
      );
    } catch (error) {
      console.error('Error in getPendingRequests:', error);
      return res.status(StatusCode.INTERNAL_ERROR).json(
        createResponse({
          status: StatusCode.INTERNAL_ERROR,
          message: 'Failed to fetch pending requests',
          code: MessageCodes.SOMETHING_WENT_WRONG,
          data: null,
        })
      );
    }
  }

  static async sendRequest(req: Request, res: Response) {
    try {
      const { userId, friendId } = req.body;

      if (!userId || !friendId) {
        return res.status(StatusCode.BAD_REQUEST).json(
          createResponse({
            status: StatusCode.BAD_REQUEST,
            message: 'Missing required fields',
            code: MessageCodes.BAD_REQUEST,
            data: { userId, friendId },
          })
        );
      }

      const request = await friendService.sendRequest(userId, friendId);

      return res.status(StatusCode.SUCCESS).json(
        createResponse({
          status: StatusCode.SUCCESS,
          message: 'Friend request sent successfully',
          code: MessageCodes.FRIEND_REQUESTED,
          data: request,
        })
      );
    } catch (error) {
      console.error('Error in sendRequest:', error);
      return res.status(StatusCode.INTERNAL_ERROR).json(
        createResponse({
          status: StatusCode.INTERNAL_ERROR,
          message: 'Failed to send friend request',
          code: MessageCodes.SOMETHING_WENT_WRONG,
          data: null,
        })
      );
    }
  }

  static async approveRequest(req: Request, res: Response) {
    try {
      const { requestId } = req.body;

      if (!requestId) {
        return res.status(StatusCode.BAD_REQUEST).json(
          createResponse({
            status: StatusCode.BAD_REQUEST,
            message: 'Missing required fields',
            code: MessageCodes.BAD_REQUEST,
            data: { requestId },
          })
        );
      }

      const friendship = await friendService.approveRequest(requestId);

      return res.status(StatusCode.SUCCESS).json(
        createResponse({
          status: StatusCode.SUCCESS,
          message: 'Friend request approved successfully',
          code: MessageCodes.FRIEND_APPROVED,
          data: friendship,
        })
      );
    } catch (error) {
      console.error('Error in approveRequest:', error);
      return res.status(StatusCode.INTERNAL_ERROR).json(
        createResponse({
          status: StatusCode.INTERNAL_ERROR,
          message: 'Failed to approve friend request',
          code: MessageCodes.SOMETHING_WENT_WRONG,
          data: null,
        })
      );
    }
  }

  static async rejectRequest(req: Request, res: Response) {
    try {
      const { requestId } = req.body;

      if (!requestId) {
        return res.status(StatusCode.BAD_REQUEST).json(
          createResponse({
            status: StatusCode.BAD_REQUEST,
            message: 'Missing required fields',
            code: MessageCodes.BAD_REQUEST,
            data: { requestId },
          })
        );
      }

      await friendService.rejectRequest(requestId);

      return res.status(StatusCode.SUCCESS).json(
        createResponse({
          status: StatusCode.SUCCESS,
          message: 'Friend request rejected successfully',
          code: MessageCodes.FRIEND_REJECTED,
          data: null,
        })
      );
    } catch (error) {
      console.error('Error in rejectRequest:', error);
      return res.status(StatusCode.INTERNAL_ERROR).json(
        createResponse({
          status: StatusCode.INTERNAL_ERROR,
          message: 'Failed to reject friend request',
          code: MessageCodes.SOMETHING_WENT_WRONG,
          data: null,
        })
      );
    }
  }
}
