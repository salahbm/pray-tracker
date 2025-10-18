import { useMutation } from '@tanstack/react-query';
import agent from '@/lib/agent';
import { TUser } from '@/types/user';
import { useAuthStore } from '@/store/auth/auth-session';

interface ISignUpParams {
  email: string;
  password: string;
  name?: string;
}

interface ISignUpResponse {
  user: TUser;
}

/**
 * Handles new user registration using Better Auth
 */
export const useSignUp = () => {
  const { setUser } = useAuthStore();

  return useMutation({
    mutationFn: async (params: ISignUpParams) => agent.post<ISignUpResponse>('/api/auth/signup', params),
    onSuccess: (data) => {
      // Backend may not auto-login; only set user (no token yet)
      if (data?.user) setUser(data.user);
    },
  });

};
