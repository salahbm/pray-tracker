import { useMutation, useQueryClient } from '@tanstack/react-query';

import { userKeys } from '@/constants/query-keys';
import agent from '@/lib/agent';
import { useAuthStore } from '@/store/auth/auth-session';
import { TUser } from '@/types/user';

interface IUserLogin {
  email: string;
  password: string;
}

interface ISignInResponse {
  user: TUser;
  session: {
    token: string;
    expiresAt: number;
  };
}

async function signInWithEmail(params: IUserLogin): Promise<ISignInResponse> {
  const response = await agent.post<ISignInResponse>('/api/auth/sign-in/email', params);
  return response;
}

export const useLoginUser = () => {
  const queryClient = useQueryClient();
  const { setUser, setSession } = useAuthStore();

  return useMutation({
    mutationFn: signInWithEmail,
    onSuccess: async data => {
      setUser(data.user);
      setSession(data.session as any);
      queryClient.invalidateQueries({ queryKey: [userKeys] });
    },
  });
};
