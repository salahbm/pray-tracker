import { useQuery } from '@tanstack/react-query';

import { userKeys } from '@/constants/query-keys';
import { agent } from '@/lib/fetch';
import { supabase } from '@/lib/supabase';
import { User } from '@/types/user';

const getUser = async (): Promise<User> => {
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  if (error) {
    return null;
  }

  const data = await agent(`/user?id=${user.id}`, {
    method: 'GET',
  });

  return data.data;
};

export const useGetUser = () =>
  useQuery({
    queryKey: [userKeys],
    queryFn: () => getUser(),
  });
