'use client';

import { useMutation } from '@/hooks/common/useMutation';
import { agent } from '@/lib/agent';

import { User } from './useGetUser';

interface UpdateUserData {
  firstName?: string;
  lastName?: string;
  photo?: string;
  username?: string;
}

const updateUser = async (userId: string, data: UpdateUserData): Promise<User> => {
  const response = await agent(`/users/${userId}`, {
    method: 'PUT',
    body: JSON.stringify(data),
  });
  return response.data;
};

export const useUpdateUser = (userId: string) => {
  return useMutation({
    mutationFn: (data: UpdateUserData) => updateUser(userId, data),
  });
};
