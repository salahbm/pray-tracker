import { useQuery } from '@tanstack/react-query';

import { userKeys } from '@/constants/query-keys';
import agent from '@/lib/agent';
import { TUser } from '@/types/user';

const getUser = async (userId: string): Promise<TUser> => {
  if (!userId) return {} as TUser;
  const data = await agent.get<TUser>(`/users/${userId}`);
  return data;
};

export const useGetUser = (userId: string) =>
  useQuery({
    queryKey: [userKeys.detail(userId)],
    queryFn: () => getUser(userId),
    enabled: !!userId,
  });
