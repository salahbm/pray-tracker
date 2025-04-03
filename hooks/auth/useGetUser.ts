import { useQuery } from '@tanstack/react-query';

import { userKeys } from '@/constants/query-keys';
import { agent } from '@/lib/agent';
import { TUser } from '@/types/user';

const getUser = async (supabaseId: string): Promise<TUser> => {
  if (!supabaseId) return null;
  const data = await agent(`/user?id=${supabaseId}`, {
    method: 'GET',
  });

  return data.data;
};

export const useGetUser = (supabaseId: string) =>
  useQuery({
    queryKey: [userKeys.detail(supabaseId)],
    queryFn: () => getUser(supabaseId),
    enabled: !!supabaseId,
  });
