import { useQueryClient } from '@tanstack/react-query';

import { userKeys } from '@/constants/query-keys';
import useMutation from '@/hooks/common/useMutation';
import { agent } from '@/lib/fetch';
import { supabase } from '@/lib/supabase';
import { fireToast } from '@/providers/toaster';
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
  console.log('data:', data);

  if (error) throw new Error(error.message);

  return data;
};

// Post user data to the backend
const postUser = async (params: IUserPostParams) => {
  const response = await agent('/user', {
    method: 'POST',
    body: JSON.stringify(params),
  });

  // If response is already parsed, check the `ok` field if necessary
  if (!response.ok) {
    throw new Error(response.message || 'Failed to create user.');
  }

  return response; // Return the already parsed response
};

// Verify OTP and post user to the backend
const onPressVerify = async (params: IUserPostParams) => {
  console.log('params:', params);
  const { username, email, password, token } = params;

  const { data, error } = await supabase.auth.verifyOtp({
    email,
    token: token.toString(),
    type: 'signup',
  });
  console.log('data:', data);

  if (error) {
    if (error.message.includes('Token has expired')) {
      fireToast.error('The token has expired. Please request a new code.');
    } else {
      fireToast.error(error.message);
    }
  }

  if (data?.user) {
    const hashedPassword = await hashPassword(password);
    const payload: IUserPostParams = {
      username,
      email,
      supabaseId: data.user.id,
      password: hashedPassword,
    };

    console.log('Payload to postUser:', payload); // Debugging log

    await postUser(payload);
  }
};

const handleResendCode = async (_form: IUserPostParams) => {
  // const {email, username, password} = form;
  // const { data, error } = await supabase.auth.signUp({
  //   email,
  //   password,
  //   options: { data: { username } },
  // })
  // if (error) {
  //   if (error.message.includes('Token has expired')) {
  //     fireToast.error('The token has expired. Please request a new code.');
  //   } else {
  //     fireToast.error(error.message);
  //   }
  // }
};

// Custom hook for managing user creation
export const usePostUser = () => {
  const queryClient = useQueryClient();

  const mutationSupabaseSignUp = useMutation({
    mutationFn: supabaseSignUp,
    options: {
      onSuccess: async () => {
        fireToast.success('Verification email sent. 📥');
      },
    },
  });
  const mutationOnPressVerify = useMutation({
    mutationFn: onPressVerify,
    options: {
      onSuccess: async () => {
        await queryClient.invalidateQueries(userKeys);
        fireToast.success('User created successfully.');
      },
    },
  });

  const mutationResendCode = useMutation({
    mutationFn: handleResendCode,
    options: {
      onSuccess: async () => {
        fireToast.success('Verification email sent. 📥');
      },
    },
  });

  return {
    supabaseSignUp: mutationSupabaseSignUp.mutateAsync,
    onPressVerify: mutationOnPressVerify.mutateAsync,
    resendCode: mutationResendCode.mutateAsync,
    isPendingSupabaseSignUp: mutationSupabaseSignUp.isPending,
    isErrorSupabaseSignUp: mutationSupabaseSignUp.isError,
    isPendingOnPressVerify: mutationOnPressVerify.isPending,
    isErrorOnPressVerify: mutationOnPressVerify.isError,
    isPendingResendCode: mutationResendCode.isPending,
    isErrorResendCode: mutationResendCode.isError,
  };
};
