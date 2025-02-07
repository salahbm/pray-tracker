import { FriendStatus } from '@prisma/client';

import { IPrays } from './prays';

export interface IFriend {
  friendshipId: string;
  friendId: string;
  friendUsername: string;
  friendEmail: string;
  friendPhoto: string;
  status: string;
}

export type ApprovedFriend = {
  friend: IFriend;
  prays: IPrays[];
};

// Pending Friends

export interface PendingFriend {
  friendAvatar: string;
  friendEmail: string;
  friendId: string;
  userId: string;
  friendUsername: string;
  id: string;
  status: keyof typeof FriendStatus;
}
