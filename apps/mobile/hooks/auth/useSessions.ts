import { useQuery } from '@tanstack/react-query';
import { useEffect } from 'react';

import { userKeys } from '@/constants/query-keys';
import agent from '@/lib/agent';
import { useAuthStore } from '@/store/auth/auth-session';
import { User } from '@/types/user';

interface SessionResponse {
  access_token: string;
  refresh_token: string;
  expires_at: number;
  user: User;
}

export const getSession = async (): Promise<SessionResponse> => {
  try {
    const response = await agent.get<SessionResponse>('/auth/me');
    return response;
  } catch (error) {
    return {} as SessionResponse;
  }
};

export const useSession = () => {
  const { setUser, user, setSession } = useAuthStore();

  const { data, isFetched } = useQuery({
    queryKey: [userKeys, 'session'],
    queryFn: getSession,
    staleTime: 1000 * 60 * 5,
    retry: 1,
    enabled: !!user?.id,
  });

  useEffect(() => {
    if (data && isFetched && data.user) {
      setUser(data.user);
      if (data.access_token) {
        setSession({
          access_token: data.access_token,
          refresh_token: data.refresh_token,
        });
      }
    }
  }, [data, setUser, setSession, isFetched]);
};
