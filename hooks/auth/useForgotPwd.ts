import * as Linking from 'expo-linking';

import useMutation from '../common/useMutation';
import { supabase } from '@/lib/supabase';

async function signInWithEmail(email: string) {
  const resetPasswordURL = Linking.createURL('/ResetPassword');
  const { error, data } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: resetPasswordURL,
  });

  if (error) {
    throw new Error(error.message);
  }

  return data;
}

interface IPwdVerifyToken {
  email: string;
  token: string;
}

// Verify OTP and post user to the backend
const verifyOtp = async (params: IPwdVerifyToken) => {
  const { email, token } = params;

  // Step 1: Verify OTP
  const { data, error } = await supabase.auth.verifyOtp({
    email,
    token: token.toString(),
    type: 'email',
  });

  if (error) {
    throw new Error(error.message);
  }

  return data;
};

export const useResetPwd = () => {
  const sendRequest = useMutation({
    mutationFn: signInWithEmail,
  });
  const verifyRequest = useMutation({
    mutationFn: verifyOtp,
  });
  return {
    sendRequest,
    verifyRequest,
    isRequestPending: sendRequest.isPending,
    isRequestSuccess: sendRequest.isSuccess,
    isVerifyPending: verifyRequest.isPending,
    isVerifySuccess: verifyRequest.isSuccess,
  };
};
