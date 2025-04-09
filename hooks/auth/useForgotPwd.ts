import useMutation from '../common/useMutation';
import { agent } from '@/lib/agent';

async function requestReset(email: string) {
  const response = await agent('/auth/request-reset', {
    method: 'POST',
    body: JSON.stringify({ email }),
  });

  return response.data;
}

async function verifyReset(params: { email: string; token: string }) {
  const response = await agent('/auth/verify-reset', {
    method: 'POST',
    body: JSON.stringify(params),
  });

  return response.data;
}

export const useResetPwd = () => {
  const sendRequest = useMutation({
    mutationFn: requestReset,
  });

  const verifyRequest = useMutation({
    mutationFn: verifyReset,
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
