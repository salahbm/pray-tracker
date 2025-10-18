import { useMutation } from '@tanstack/react-query';
import agent from '@/lib/agent';

interface UpdatePasswordPayload {
  email: string;
  newPassword: string;
}

// TODO: Implement password update with Better Auth
const updatePassword = async (data: UpdatePasswordPayload) => {
  // Placeholder - will be implemented when backend supports it
  console.log('Password update requested for:', data.email);
  return { success: true, message: 'Password update not yet implemented' };
};

export const useUpdatePassword = () => {
  return useMutation({
    mutationFn: updatePassword,
  });
};
