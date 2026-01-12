import { useMutation } from '@tanstack/react-query';
import agent from '@/lib/agent';
import { User } from '@/types/user';
import { useAuthStore } from '@/store/auth/auth-session';

interface ISignUpParams {
  email: string;
  password: string;
  name?: string;
}

interface ISignUpResponse {
  user: User;
  token: string;
}

/**
 * Handles new user registration using Better Auth
 */
export const useSignUp = () => {
  const { setUser, setSession } = useAuthStore();

  return useMutation({
    mutationFn: async (params: ISignUpParams) =>
      agent.post<ISignUpResponse>('/auth/sign-up/email', params),
    onSuccess: data => {
      // Better Auth auto-signs in after successful registration
      if (data?.user) {
        setUser(data.user);
        setSession({ token: data.token });
      }
    },
  });
};
