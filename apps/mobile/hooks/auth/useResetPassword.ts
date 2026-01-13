import { useMutation } from '@tanstack/react-query';
import agent from '@/lib/agent';

interface ResetPasswordParams {
  token: string;
  newPassword: string;
}

async function resetPassword({ token, newPassword }: ResetPasswordParams) {
  await agent.post('/api/auth/reset-password', { token, newPassword });
}

export const useResetPassword = () =>
  useMutation({
    mutationFn: resetPassword,
  });
