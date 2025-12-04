import * as Notifications from 'expo-notifications';
import { useEffect } from 'react';
import { useSavePushToken } from './useSavePushToken';
import { useAuthStore } from '@/store/auth/auth-session';

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
        const tokenData = await Notifications.getExpoPushTokenAsync();

        const token = tokenData.data;

        // Save token to backend
        savePushToken(token, {
          onSuccess: () => {
            console.log('✅ Push token registered:', token);
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
