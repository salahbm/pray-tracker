import { Session, User } from '@supabase/supabase-js';
import { useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';

import { useGetUser } from './useGetUser';
import useMutation from '../common/useMutation';
import { userKeys } from '@/constants/query-keys';
import { supabase } from '@/lib/supabase';
import { useAuthStore } from '@/store/auth/auth-session';
import { ApiError } from '@/utils/error';
import {
  DEFAULT_MESSAGE_CODE,
  MessageCodes,
  StatusCode,
  SupabaseErrorMap,
} from '@/utils/status';

interface IUserLogin {
  email: string;
  password: string;
}

async function signInWithEmail(
  prams: IUserLogin,
): Promise<{ user: User; session: Session }> {
  const { email, password } = prams;

  if (!email || !password) {
    throw new ApiError({
      message: 'Missing required fields',
      status: StatusCode.BAD_REQUEST,
      code: MessageCodes.MISSING_REQUIRED_FIELDS,
    });
  }

  const { error, data } = await supabase.auth.signInWithPassword({
    email: email,
    password: password,
  });

  if (error) {
    // Get the message code from the error map, default to UNKNOWN_ERROR if not found
    const messageCode = SupabaseErrorMap[error?.code] || DEFAULT_MESSAGE_CODE;
    throw new ApiError({
      message: error?.message,
      status: StatusCode.INTERNAL_ERROR,
      code: messageCode,
      details: error,
    });
  }

  return data as { user: User; session: Session };
}

export const useLoginUser = () => {
  const queryClient = useQueryClient();
  const { setUser } = useAuthStore();
  const [id, setId] = useState<string | null>(null);
  const { refetch } = useGetUser(id);
  return useMutation({
    mutationFn: signInWithEmail,
    options: {
      onSuccess: async (data) => {
        // Set the user ID after successful login
        setId(data.user.id);

        await new Promise((resolve) => {
          setTimeout(() => {
            resolve(true);
          }, 200);
        });

        const { data: fetchedUserData } = await refetch();

        if (fetchedUserData) {
          setUser(fetchedUserData);
          queryClient.invalidateQueries(userKeys);
        }
      },
    },
  });
};
