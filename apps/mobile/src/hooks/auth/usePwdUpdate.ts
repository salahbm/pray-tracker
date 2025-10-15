import useMutation from '../common/useMutation';
import { agent } from '@/lib/agent';

interface UpdatePasswordPayload {
  email: string;
  newPassword: string;
}

const updatePassword = async (data: UpdatePasswordPayload) => {
  const res = await agent('/auth/update-password', {
    method: 'POST',
    body: JSON.stringify(data),
  });
  return res;
};

export const useUpdatePassword = () => {
  return useMutation({
    mutationFn: updatePassword,
  });
};
