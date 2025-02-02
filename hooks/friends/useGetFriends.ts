import { useQuery } from '@tanstack/react-query';

import { friendsList } from '@/constants/query-keys';
import { agent } from '@/lib/agent';

interface Friend {
  id: string;
  username: string;
  status: string;
}

const getFriends = async (userId: string): Promise<Friend[]> => {
  const { data } = await agent(`/friends/get?userId=${userId}`, {
    method: 'GET',
  });

  return data.data ?? [];
};

export const useGetFriends = (userId: string) =>
  useQuery({
    queryKey: [friendsList, userId],
    queryFn: () => getFriends(userId),
    enabled: !!userId,
  });
