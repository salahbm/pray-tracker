import { useQueryClient } from '@tanstack/react-query';

import { userKeys } from '@/constants/query-keys';
import useMutation from '@/hooks/common/useMutation';
import { agent } from '@/lib/agent';
import { supabase } from '@/lib/supabase';
import { hashPassword } from '@/utils/helpers';

interface IUserPostParams {
  email: string;
  username: string;
  password: string;

  supabaseId?: string;
  token?: string;
}

// Sign up user using Supabase
const supabaseSignUp = async (params: IUserPostParams) => {
  const { email, password, username } = params;

  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: { data: { username } },
  });

  if (error) throw new Error(error.message);

  return data;
};

// Verify OTP and post user to the backend
const onPressVerify = async (params: IUserPostParams) => {
  const { email, token } = params;

  // Step 1: Verify OTP
  const { data, error } = await supabase.auth.verifyOtp({
    email,
    token: token.toString(),
    type: 'signup',
  });

  if (error) {
    throw new Error(error.message);
  }

  return data;
};

// Post user data to the backend
const postUser = async (params: IUserPostParams) => {
  const hashedPassword = await hashPassword(params.password);
  const payload: IUserPostParams = {
    username: params.username,
    email: params.email,
    supabaseId: params.supabaseId,
    password: hashedPassword,
  };

  const response = await agent('/user', {
    method: 'POST',
    body: JSON.stringify(payload),
  });

  // set session
  if (response.data) {
    await supabase.auth.setSession({
      access_token: response.data.accessToken,
      refresh_token: response.data.refreshToken,
    });
  }

  return response; // Return the already parsed response
};

// Custom hook for managing user creation
export const usePostUser = () => {
  const queryClient = useQueryClient();

  const mutationSupabaseSignUp = useMutation({
    mutationFn: supabaseSignUp,
  });
  const mutationOnPressVerify = useMutation({
    mutationFn: onPressVerify,
  });

  const mutationPostUser = useMutation({
    mutationFn: postUser,
    options: {
      onSuccess: async () => {
        await queryClient.invalidateQueries(userKeys);
      },
    },
  });

  return {
    supabaseSignUp: mutationSupabaseSignUp.mutateAsync,
    onPressVerify: mutationOnPressVerify.mutateAsync,
    postUser: mutationPostUser.mutateAsync,
    isPostUserSuccess: mutationPostUser.isSuccess,
    isPendingSupabaseSignUp: mutationSupabaseSignUp.isPending,
    isErrorSupabaseSignUp: mutationSupabaseSignUp.isError,
    isPendingOnPressVerify: mutationOnPressVerify.isPending,
    isErrorOnPressVerify: mutationOnPressVerify.isError,
    isPendingPostUser: mutationPostUser.isPending,
    isErrorPostUser: mutationPostUser.isError,
  };
};
