import { useQuery } from '@tanstack/react-query';
import { useEffect } from 'react';

import { userKeys } from '@/constants/query-keys';
import { agent } from '@/lib/agent';
import { useAuthStore } from '@/store/auth/auth-session';
import { TUser } from '@/types/user';

interface SessionResponse {
  access_token: string;
  refresh_token: string;
  expires_at: number;
  user: TUser;
}

export const refreshSession = async (
  refresh_token: string,
): Promise<SessionResponse> => {
  if (!refresh_token) return;
  const res = await agent('/auth/refresh', {
    method: 'POST',
    body: JSON.stringify({ refresh_token }),
  });

  return res.data;
};

export const useSession = () => {
  const { setUser, session, setSession } = useAuthStore();

  const { data, isFetched } = useQuery({
    queryKey: [userKeys],
    queryFn: () => refreshSession(session?.refresh_token ?? ''),
    staleTime: 1000 * 60 * 5,
    retry: 1,
    enabled: !!session?.refresh_token,
  });

  useEffect(() => {
    if (data && isFetched) {
      setUser(data.user);
      setSession({
        access_token: data.access_token,
        refresh_token: data.refresh_token,
      });
    }
  }, [data, setUser, setSession, isFetched]);
};
