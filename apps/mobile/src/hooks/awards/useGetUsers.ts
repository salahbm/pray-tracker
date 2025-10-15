import { keepPreviousData, useQuery } from '@tanstack/react-query';

import { usersListKey } from '@/constants/query-keys';
import { agent } from '@/lib/agent';
import { IResponseArray } from '@/types/api';
import { TUser } from '@/types/user';

const getUsers = async (): Promise<IResponseArray<TUser>> => {
  const response = await agent('/users/top', {
    method: 'GET',
  });

  return response;
};

export const useGetUsersList = () =>
  useQuery({
    queryKey: [usersListKey],
    queryFn: getUsers,
    placeholderData: keepPreviousData,
  });
