import { useMutation } from '@tanstack/react-query';
import agent from '@/lib/agent';

interface UpdatePasswordPayload {
  currentPassword: string;
  newPassword: string;
}

interface ChangePasswordResponse {
  success: boolean;
  message: string;
}

export const useUpdatePassword = () => {
  return useMutation({
    mutationFn: async (data: UpdatePasswordPayload): Promise<ChangePasswordResponse> =>
      await agent.post<ChangePasswordResponse>('/auth/change-password', {
        currentPassword: data.currentPassword,
        newPassword: data.newPassword,
      }),
  });
};
