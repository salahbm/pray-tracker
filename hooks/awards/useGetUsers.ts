import { keepPreviousData, useQuery } from '@tanstack/react-query';

import { usersListKey } from '@/constants/query-keys';
import { agent } from '@/lib/agent';
import { TUser } from '@/types/user';

const getUsers = async (): Promise<TUser[]> => {
  const data = await agent('/users', {
    method: 'GET',
  });

  return data.data;
};

export const useGetUsersList = () =>
  useQuery({
    queryKey: [usersListKey],
    queryFn: getUsers,
    placeholderData: keepPreviousData,
  });
