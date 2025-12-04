import { useMutation } from '@tanstack/react-query';
import agent from '@/lib/agent';

interface UpdatePasswordPayload {
  currentPassword: string;
  newPassword: string;
  revokeOtherSessions?: boolean;
}

interface ChangePasswordResponse {
  status: boolean;
  message?: string;
}

const updatePassword = async (data: UpdatePasswordPayload): Promise<ChangePasswordResponse> => {
  const response = await agent.post<ChangePasswordResponse>('/api/auth/change-password', {
    currentPassword: data.currentPassword,
    newPassword: data.newPassword,
    revokeOtherSessions: data.revokeOtherSessions ?? true,
  });

  return response;
};

export const useUpdatePassword = () => {
  return useMutation({
    mutationFn: updatePassword,
  });
};
