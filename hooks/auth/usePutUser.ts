import { useMutation, useQueryClient } from '@tanstack/react-query';

import { userKeys } from '@/constants/query-keys';
import { agent } from '@/lib/fetch';
import { fireToast } from '@/providers/toaster';
import { ErrorData } from '@/types/global';

interface IUserParams {
  id: string;
  username?: string;
  firstName?: string;
  lastName?: string;
  photo?: string;
}

const updateUser = async (params: IUserParams) => {
  const response = await agent('/user', {
    method: 'PUT',
    body: JSON.stringify({
      id: params.id,
      username: params.username,
      firstName: params.firstName,
      lastName: params.lastName,
      photo: params.photo,
    }),
  });
  return response;
};

export const useUpdateUser = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updateUser,
    onSuccess: async (data) => {
      await queryClient.invalidateQueries({
        queryKey: [userKeys],
      });
      fireToast.success(data.message);
    },
  });
};

// post user

interface IUserPostParams {
  email: string;
  clerkId: string;
  username: string;
}

const postUser = async (params: IUserPostParams) => {
  const response = await agent('/user', {
    method: 'POST',
    body: JSON.stringify({
      username: params.username,
      email: params.email,
      clerkId: params.clerkId,
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
