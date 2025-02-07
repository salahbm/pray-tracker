import { FriendStatus } from '@prisma/client';

import { IPrays } from './prays';
import { TUser } from './user';

export interface IFriend {
  id: string;
  userId: string;
  friendId: string;
  status: string;
}

type ApprovedFriend = {
  friend: TUser;
  prays: IPrays[];
};

type ApprovedFriendsList = ApprovedFriend[];

// Pending Friends

export interface PendingFriend {
  friendAvatar: string;
  friendEmail: string;
  friendId: string;
  friendUsername: string;
  id: string;
  status: keyof typeof FriendStatus;
}
