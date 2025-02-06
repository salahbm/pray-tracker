import { keepPreviousData, useQuery } from '@tanstack/react-query';

import { approvedFriendsList } from '@/constants/query-keys';
import { agent } from '@/lib/agent';
import { ApprovedFriendsList } from '@/types/friends';

const getFriends = async (userId: string): Promise<ApprovedFriendsList> => {
  const { data } = await agent(`/friends/approved?userId=${userId}`, {
    method: 'GET',
  });

  return data;
};

export const useGetApprovedFriends = (userId: string) =>
  useQuery({
    queryKey: [approvedFriendsList, userId],
    queryFn: () => getFriends(userId),
    placeholderData: keepPreviousData,
    enabled: !!userId,
  });
