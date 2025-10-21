import { FriendActivity } from '@/types/friends';

export type TabKey = 'all' | 'requests' | 'friends';

export interface TabCounts {
  all: number;
  requests: number;
  friends: number;
}

export interface FriendItemProps {
  item: FriendActivity;
  index: number;
}
