// src/routes/friend.routes.ts
import express from 'express';
import { FriendController } from '../controllers/friend.controller';

const router = express.Router();

router.get('/approved', FriendController.getApprovedFriends);
router.get('/pending', FriendController.getPendingRequests);
router.post('/request', FriendController.sendFriendRequest);
router.post('/approve', FriendController.approveFriendRequest);
router.delete('/reject', FriendController.rejectFriendRequest);
router.delete('/remove', FriendController.deleteFriend);

export default router;
