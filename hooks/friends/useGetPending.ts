import { keepPreviousData, useQuery } from '@tanstack/react-query';

import {
  approvedFriendsList,
  pendingFriendsList,
} from '@/constants/query-keys';
import { agent } from '@/lib/agent';
import { IResponseArray } from '@/types/api';
import { PendingFriend } from '@/types/friends';

const getFriends = async (
  userId: string,
): Promise<IResponseArray<PendingFriend>> => {
  const response = await agent(`/friends/pending?userId=${userId}`, {
    method: 'GET',
  });

  return response;
};

export const useGetPendingFriends = (userId: string) =>
  useQuery({
    queryKey: [approvedFriendsList, pendingFriendsList],
    queryFn: () => getFriends(userId),
    placeholderData: keepPreviousData,
    enabled: !!userId,
  });
