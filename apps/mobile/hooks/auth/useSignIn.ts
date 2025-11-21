import { useMutation, useQueryClient } from '@tanstack/react-query';

import QueryKeys from '@/constants/query-keys';
import agent from '@/lib/agent';
import { useAuthStore } from '@/store/auth/auth-session';
import { User } from '@/types/user';

interface IUserLogin {
  email: string;
  password: string;
}

interface ISignInResponse {
  user: User;
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
      setSession({
        token: data.session.token,
        expiresAt: data.session.expiresAt,
      });
      queryClient.invalidateQueries({ queryKey: QueryKeys.users.all });
    },
  });
};
