import { useMutation, useQueryClient } from '@tanstack/react-query';

import { userKeys, usersListKey } from '@/constants/query-keys';
import { agent } from '@/lib/fetch';
import { supabase } from '@/lib/supabase';
import { fireToast } from '@/providers/toaster';
import { ErrorData } from '@/types/api';

interface IUserDelete {
  id: string;
  supabaseId: string;
}

const deleteUser = async (params: IUserDelete) => {
  const response = await agent('/user', {
    method: 'DELETE',
    body: JSON.stringify({
      id: params.id,
    }),
  });

  if (response.ok) {
    await supabase.auth.admin.deleteUser(params.supabaseId).then(() => {
      supabase.auth.signOut();
    });
  }
  return response;
};

export const useDeleteUser = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteUser,
    onSuccess: async (data) => {
      await queryClient.invalidateQueries({
        queryKey: [userKeys, usersListKey],
      });
      fireToast.success(data.message);
    },
    onError: (error: ErrorData) => {
      fireToast.error(error.message);
    },
  });
};
