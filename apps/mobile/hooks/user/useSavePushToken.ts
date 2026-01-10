import { useMutation } from '@tanstack/react-query';
import agent from '@/lib/agent';

interface SavePushTokenResponse {
  message: string;
  success: boolean;
}

export const useSavePushToken = () => {
  return useMutation({
    mutationFn: async (pushToken: string): Promise<SavePushTokenResponse> => {
      // Agent already has 60s timeout, but we want faster failure for push tokens
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 10000); // 10 second timeout

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
        // Don't throw - silently fail to prevent app blocking
        console.log('⏭️ Push token registration failed (backend may be sleeping)');
        return { success: false, message: 'Timeout' };
      }
    },
    retry: false, // Don't retry to avoid blocking
    onError: error => {
      // Silently log - don't block app startup
      console.log('⏭️ Push token error:', error);
    },
  });
};
