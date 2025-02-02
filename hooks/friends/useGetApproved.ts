import { useQuery } from '@tanstack/react-query';

import { friendsList } from '@/constants/query-keys';
import { agent } from '@/lib/agent';

const getFriends = async (userId: string) => {
  const { data } = await agent(`/friends/approved?userId=${userId}`, {
    method: 'GET',
  });

  return data;
};

export const useGetApprovedFriends = (userId: string) =>
  useQuery({
    queryKey: [friendsList, userId],
    queryFn: () => getFriends(userId),
    enabled: !!userId,
  });
