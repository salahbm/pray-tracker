import { IPrays } from './prays';

export interface IFriend {
  friendshipId: string;
  id: string;
  deviceToken: string;
  username: string;
  email: string;
  photo: string;
  status: string;
  createdAt: Date;
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
  status: 'PENDING' | 'ACCEPTED' | 'REJECTED';
  createdAt: Date;
}

// Final grouped pending response
export interface FriendRequestResponse {
  sentBy: PendingFriend[]; // requests received
  receivedBy: PendingFriend[]; // requests sent
}

// Unified friend activity type for all friends view
export interface FriendActivity {
  id: string; // friendship ID
  userId: string;
  friendId: string;
  username: string;
  email: string;
  photo: string;
  status: 'PENDING' | 'ACCEPTED' | 'REJECTED';
  type: 'sent' | 'received' | 'friend'; // sent = request sent by me, received = request received by me, friend = accepted
  createdAt: Date;
  // For accepted friends, include prayers
  prays?: Omit<IPrays, 'id' | 'createdAt' | 'updatedAt'>[];
}
