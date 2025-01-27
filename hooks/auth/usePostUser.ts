// post user
import { useMutation, useQueryClient } from '@tanstack/react-query';

import { userKeys } from '@/constants/query-keys';
import { agent } from '@/lib/fetch';
import { fireToast } from '@/providers/toaster';
import { ErrorData } from '@/types/api';

interface IUserPostParams {
  email: string;
  supabaseId: string;
  username: string;
  password: string;
}

const postUser = async (params: IUserPostParams) => {
  const response = await agent('/user', {
    method: 'POST',
    body: JSON.stringify({
      username: params.username,
      email: params.email,
      supabaseId: params.supabaseId,
      password: params.password,
    }),
  });
  return response;
};

export const usePostUser = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: postUser,
    onSuccess: async (data) => {
      await queryClient.invalidateQueries({
        queryKey: [userKeys],
      });
      fireToast.success(data.message);
    },
    onError: (error: ErrorData) => {
      fireToast.error(error.message);
    },
  });
};
