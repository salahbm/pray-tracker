import { agent } from '@/lib/agent';

import useMutation from '../common/useMutation';

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
