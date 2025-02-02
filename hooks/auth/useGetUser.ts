import { useQuery } from '@tanstack/react-query';

import { userKeys } from '@/constants/query-keys';
import { agent } from '@/lib/agent';
import { User } from '@/types/user';

const getUser = async (supabaseId: string): Promise<User> => {
  const data = await agent(`/user?id=${supabaseId}`, {
    method: 'GET',
  });

  return data.data;
};

export const useGetUser = (supabaseId: string) =>
  useQuery({
    queryKey: [userKeys],
    queryFn: () => getUser(supabaseId),
    enabled: !!supabaseId,
  });
