import { useQueryClient } from '@tanstack/react-query';
import { Session } from 'inspector';

import { userKeys } from '@/constants/query-keys';
import { agent } from '@/lib/agent';
import { useAuthStore } from '@/store/auth/auth-session';
import { TUser } from '@/types/user';

import useMutation from '../common/useMutation';

interface IUserLogin {
  email: string;
  password: string;
}

async function signInWithEmail(prams: IUserLogin): Promise<{ user: TUser; session: Session }> {
  const { email, password } = prams;

  const res = await agent('/auth/login', {
    method: 'POST',
    body: JSON.stringify({ email, password }),
  });
  return res.data as { user: TUser; session: Session };
}

export const useLoginUser = () => {
  const queryClient = useQueryClient();
  const { setUser, setSession } = useAuthStore();
  return useMutation({
    mutationFn: signInWithEmail,
    options: {
      onSuccess: async data => {
        setUser(data.user);
        setSession(data.session as any);
        queryClient.invalidateQueries(userKeys);
      },
    },
  });
};
