import { keepPreviousData, useQuery } from '@tanstack/react-query';

import {
  approvedFriendsList,
  pendingFriendsList,
} from '@/constants/query-keys';
import { agent } from '@/lib/agent';
import { PendingFriend } from '@/types/friends';

const getFriends = async (userId: string): Promise<PendingFriend[]> => {
  const { data } = await agent(`/friends/pending?userId=${userId}`, {
    method: 'GET',
  });

  return data;
};

export const useGetPendingFriends = (userId: string) =>
  useQuery({
    queryKey: [approvedFriendsList, pendingFriendsList, userId],
    queryFn: () => getFriends(userId),
    placeholderData: keepPreviousData,
    enabled: !!userId,
  });
