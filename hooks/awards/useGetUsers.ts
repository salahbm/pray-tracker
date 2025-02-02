import { useQuery } from '@tanstack/react-query';

import { usersListKey } from '@/constants/query-keys';
import { agent } from '@/lib/agent';
import { User } from '@/types/user';

const getUsers = async (): Promise<User[]> => {
  const data = await agent('/users', {
    method: 'GET',
  });

  return data.data;
};

export const useGetUsersList = () =>
  useQuery({
    queryKey: [usersListKey],
    queryFn: getUsers,
  });
