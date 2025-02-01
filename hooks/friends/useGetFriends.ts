import { useQuery } from '@tanstack/react-query';

import { friendsList } from '@/constants/query-keys';
import { agent } from '@/lib/fetch';

interface Friend {
  id: string;
  username: string;
  status: string;
}

type TParams = {
  userId: string;
};

const getFriends = async (params: TParams): Promise<Friend[]> => {
  const { data } = await agent(`/friends/get?userId=${params.userId}`, {
    method: 'GET',
  });

  return data.data;
};

export const useGetFriends = (userId: string) =>
  useQuery({
    queryKey: [friendsList],
    queryFn: () => getFriends({ userId }),
    enabled: !!userId,
  });
