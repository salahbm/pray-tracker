import { useQuery } from '@tanstack/react-query';
import agent from '@/lib/agent';
import { User } from '@/types/index';

const getUser = async (userId: string): Promise<User> => {
  if (!userId) return {} as User;
  const data = await agent.get<User>(`/users/${userId}`);
  return data;
};

export const useGetUser = (userId: string) =>
  useQuery({
    queryKey: ['users', 'detail', userId],
    queryFn: () => getUser(userId),
    enabled: !!userId,
  });
