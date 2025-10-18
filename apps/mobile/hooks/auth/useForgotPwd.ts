import { useMutation } from '@tanstack/react-query';
import agent from '@/lib/agent';

// TODO: Implement password reset with Better Auth
// Better Auth supports password reset but needs to be configured
async function requestReset(email: string) {
  // Placeholder - will be implemented when backend supports it
  console.log('Password reset requested for:', email);
  return { success: true, message: 'Password reset not yet implemented' };
}

async function verifyReset(params: { email: string; token: string; type: 'email' | 'signup' }) {
  // Placeholder - will be implemented when backend supports it
  console.log('Verify reset:', params);
  return { success: true, message: 'Verification not yet implemented' };
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
