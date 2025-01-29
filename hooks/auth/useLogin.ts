import { Session, User } from '@supabase/supabase-js';
import { useQueryClient } from '@tanstack/react-query';

import useMutation from '../common/useMutation';
import { userKeys } from '@/constants/query-keys';
import { supabase } from '@/lib/supabase';
import { fireToast } from '@/providers/toaster';

interface IUserLogin {
  email: string;
  password: string;
}

async function signInWithEmail(
  prams: IUserLogin,
): Promise<{ user: User; session: Session }> {
  const { email, password } = prams;
  const { error, data } = await supabase.auth.signInWithPassword({
    email: email,
    password: password,
  });

  if (error) {
    throw new Error(error.message);
  }

  return data as { user: User; session: Session };
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
