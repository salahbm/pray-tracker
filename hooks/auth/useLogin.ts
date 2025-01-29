import { Session, User } from '@supabase/supabase-js';

import useMutation from '../common/useMutation';
import { supabase } from '@/lib/supabase';

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
  return useMutation({
    mutationFn: signInWithEmail,
  });
};
