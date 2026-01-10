import { useMutation } from '@tanstack/react-query';
import agent from '@/lib/agent';

interface SavePushTokenResponse {
  message: string;
  success: boolean;
}

export const useSavePushToken = () => {
  return useMutation({
    mutationFn: async (pushToken: string): Promise<SavePushTokenResponse> => {
      // Add timeout to prevent blocking app startup
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 5000); // 5 second timeout

      try {
        const response = await agent.post<SavePushTokenResponse>(
          '/users/me/push-token',
          { pushToken },
          { signal: controller.signal }
        );
        clearTimeout(timeoutId);
        return response;
      } catch (error) {
        clearTimeout(timeoutId);
        throw error;
      }
    },
    retry: 1, // Only retry once
    retryDelay: 1000, // Wait 1 second before retry
    onError: error => {
      // Silently fail - don't block app startup
      console.log('⏭️ Push token registration failed (backend may be sleeping):', error);
    },
  });
};
