import { useMutation } from '@tanstack/react-query';
import agent from '@/lib/agent';

interface SavePushTokenResponse {
  message: string;
  success: boolean;
}

export const useSavePushToken = () => {
  return useMutation({
    mutationFn: async (pushToken: string): Promise<SavePushTokenResponse> => {
      const response = await agent.post<SavePushTokenResponse>('/users/me/push-token', {
        pushToken,
      });
      return response;
    },
    onError: error => {
      console.error('❌ Failed to register push token:', error);
    },
  });
};
