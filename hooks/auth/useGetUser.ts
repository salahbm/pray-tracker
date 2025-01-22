import { User } from '@prisma/client';
import { useQuery } from '@tanstack/react-query';

import { userKeys } from '@/constants/query-keys';
import { agent } from '@/lib/fetch';

type TUserParams = {
  id: string;
};

const getUser = async (params: TUserParams): Promise<User> => {
  const data = await agent(`/user?id=${params.id}`, {
    method: 'GET',
  });

  return data;
};

export const useGetUser = (id: string) =>
  useQuery({
    queryKey: [userKeys, id],
    queryFn: () => getUser({ id }),
    enabled: !!id,
  });
