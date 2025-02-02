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
