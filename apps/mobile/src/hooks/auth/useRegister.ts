import { useQueryClient } from '@tanstack/react-query';

import { userKeys } from '@/constants/query-keys';
import useMutation from '@/hooks/common/useMutation';
import { agent } from '@/lib/agent';
import { useAuthStore } from '@/store/auth/auth-session';
import { IResponse } from '@/types/api';
import { TUser } from '@/types/user';

interface IUserPostParams {
  email: string;
  username: string;
  password: string;
}

interface IVerifyOTPParams {
  email: string;
  token: string;
  type: 'signup' | 'email';
}

// Register user and send OTP
const registerUser = async (
  params: IUserPostParams,
): Promise<IResponse<TUser>> => {
  const response = await agent('/auth/register', {
    method: 'POST',
    body: JSON.stringify(params),
  });
  return response;
};

// Verify OTP and complete registration
const verifyOTP = async (params: IVerifyOTPParams) => {
  const response = await agent('/auth/verify-otp', {
    method: 'POST',
    body: JSON.stringify(params),
  });
  return response.data;
};

// Custom hook for managing user registration
export const useRegister = () => {
  const queryClient = useQueryClient();
  const { setUser, setSession } = useAuthStore();

  const registerMutation = useMutation({
    mutationFn: registerUser,
  });

  const verifyMutation = useMutation({
    mutationFn: verifyOTP,
    options: {
      onSuccess: (data) => {
        setSession({
          access_token: data.access_token,
          refresh_token: data.refresh_token,
        });
        setUser(data.user);
        queryClient.invalidateQueries(userKeys);
      },
    },
  });

  return {
    register: registerMutation.mutateAsync,
    verify: verifyMutation.mutateAsync,
    isRegisterPending: registerMutation.isPending,
    isRegisterError: registerMutation.isError,
    isRegisterSuccess: registerMutation.isSuccess,
    isVerifyPending: verifyMutation.isPending,
    isVerifyError: verifyMutation.isError,
    isVerifySuccess: verifyMutation.isSuccess,
  };
};
