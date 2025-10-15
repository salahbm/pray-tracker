import { FriendStatus } from '@prayer/db';

import { IPrays } from './prays';

export interface IFriend {
  friendshipId: string;
  id: string;
  deviceToken: string;
  username: string;
  email: string;
  photo: string;
  status: string;
}

export type ApprovedFriend = {
  friend: IFriend;
  prays: Omit<IPrays, 'id' | 'createdAt' | 'updatedAt'>[];
};

// Pending friend (before acceptance)
export interface PendingFriend {
  id: string; // friendship ID
  userId: string; // sender
  friendId: string; // receiver
  username: string;
  email: string;
  photo: string;
  status: FriendStatus;
}

// Final grouped pending response
export interface FriendRequestResponse {
  sentBy: PendingFriend[]; // requests received
  requests: PendingFriend[]; // requests sent
}
