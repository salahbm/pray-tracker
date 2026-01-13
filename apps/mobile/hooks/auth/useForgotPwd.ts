import { useMutation } from '@tanstack/react-query';
import agent from '@/lib/agent';

async function requestReset(email: string) {
  await agent.post('/api/auth/forget-password', { email });
}

export const useResetPwd = () =>
  useMutation({
    mutationFn: requestReset,
  });
