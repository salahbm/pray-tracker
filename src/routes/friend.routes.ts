import { Router } from 'express';
import { FriendController } from '../controllers/friend.controller';

const router = Router();

// Match original serverless paths
router.get('/approved', FriendController.getApprovedFriends);
router.get('/pending', FriendController.getPendingRequests);
router.post('/request', FriendController.sendRequest);
router.post('/approve', FriendController.approveRequest);
router.delete('/reject', FriendController.rejectRequest);

export default router;
