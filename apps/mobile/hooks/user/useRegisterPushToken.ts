import * as Notifications from 'expo-notifications';
import { useEffect } from 'react';
import { useSavePushToken } from './useSavePushToken';
import { useAuthStore } from '@/store/auth/auth-session';

const projectId = 'a3cc0051-f95d-4139-934d-27b073f49f78';

/**
 * Hook to register Expo push token with backend
 * Uses existing notification permission system
 */
export const useRegisterPushToken = () => {
  const { mutate: savePushToken } = useSavePushToken();
  const user = useAuthStore(state => state.user);

  useEffect(() => {
    if (!user) return;

    const registerToken = async () => {
      try {
        // Check if permissions are already granted
        const { status } = await Notifications.getPermissionsAsync();

        if (status !== 'granted') {
          console.log('⏭️ Skipping push token registration - permissions not granted');
          return;
        }

        // Get Expo push token
        // In managed workflow, projectId is inferred from app.json
        const pushTokenString = (
          await Notifications.getExpoPushTokenAsync({
            projectId,
          })
        ).data;

        // Save token to backend
        savePushToken(pushTokenString, {
          onSuccess: () => {
            console.log('✅ Push token registered:', pushTokenString);
          },
          onError: error => {
            console.error('❌ Failed to register push token:', error);
          },
        });
      } catch (error) {
        console.error('Error registering push token:', error);
      }
    };

    registerToken();
  }, [user, savePushToken]);
};
