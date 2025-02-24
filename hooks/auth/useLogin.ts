import { Session, User } from '@supabase/supabase-js';

import useMutation from '../common/useMutation';
import { supabase } from '@/lib/supabase';
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
  return useMutation({
    mutationFn: signInWithEmail,
  });
};
