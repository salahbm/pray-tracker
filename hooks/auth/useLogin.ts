import { useQueryClient } from '@tanstack/react-query';

import useMutation from '../common/useMutation';
import { userKeys } from '@/constants/query-keys';
import { supabase } from '@/lib/supabase';
import { fireToast } from '@/providers/toaster';

interface IUserLogin {
  email: string;
  password: string;
}

async function signInWithEmail(prams: IUserLogin) {
  const { email, password } = prams;
  const { error, data } = await supabase.auth.signInWithPassword({
    email: email,
    password: password,
  });
  if (error) {
    throw new Error(error.message);
  }

  if (data) {
    await supabase.auth.setSession({
      access_token: data.session.access_token,
      refresh_token: data.session.refresh_token,
    });
    await supabase.auth.refreshSession();
  }

  return data;
}

export const useLoginUser = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: signInWithEmail,
    options: {
      onSuccess: async () => {
        queryClient.invalidateQueries(userKeys);
        fireToast.success('Welcome back. ');
      },
    },
  });
};
