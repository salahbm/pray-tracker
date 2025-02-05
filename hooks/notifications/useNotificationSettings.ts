import AsyncStorage from '@react-native-async-storage/async-storage';
import Constants from 'expo-constants';
import * as Notifications from 'expo-notifications';
import { useEffect, useCallback } from 'react';

import { useUpdateUser } from '../auth/usePutUser';
import { fireToast } from '@/providers/toaster';
import { useAuthStore } from '@/store/auth/auth-session';
import { useNotificationStore } from '@/store/defaults/notification';

export const useNotificationSettings = () => {
  const { mutateAsync: updateUser } = useUpdateUser();
  const { user, setUser } = useAuthStore(); // Retrieve user from Zustand store
  const { isNotificationEnabled, setNotificationEnabled } =
    useNotificationStore();

  /**
   * Enables push notifications and registers device token
   */

  const enableNotifications = async (): Promise<boolean> => {
    try {
      if (!user?.id) {
        fireToast.error('User not found.');
        return false;
      }

      // Determine if the project ID is available
      const projectId =
        Constants.expoConfig?.extra?.eas?.projectId ||
        Constants.easConfig?.projectId;

      // Use different logic based on Expo Go or standalone build
      const tokenData = projectId
        ? await Notifications.getExpoPushTokenAsync({ projectId }) // Standalone or EAS build
        : await Notifications.getExpoPushTokenAsync(); // Expo Go (No projectId)

      const token = tokenData.data;
      console.log('Generated Push Token:', token); // ✅ Debug log

      if (!token) {
        fireToast.error('Failed to get push token.');
        return false;
      }

      // Send token to backend
      const response = await updateUser({ id: user.id, deviceToken: token });

      if (response.success && response.data?.deviceToken) {
        setNotificationEnabled(true);
        await AsyncStorage.setItem('notificationsEnabled', 'true');
        fireToast.success('Notifications enabled successfully.');
        setUser({ ...user, deviceToken: token });
        return true;
      } else {
        fireToast.error('Failed to enable notifications.');
        return false;
      }
    } catch (error) {
      fireToast.error('Error enabling notifications: ' + error);
      return false;
    }
  };

  /**
   * Disables push notifications and removes device token
   */
  const disableNotifications = async (): Promise<void> => {
    try {
      if (!user?.id) {
        fireToast.error('User not found.');
        return;
      }

      const response = await updateUser({
        id: user.id, // Pass user ID
        deviceToken: null,
      });

      if (response.success) {
        setNotificationEnabled(false);
        await AsyncStorage.setItem('notificationsEnabled', 'false');
        fireToast.success('Notifications disabled successfully.');
        setUser({
          ...user,
          deviceToken: null,
        });
      } else {
        fireToast.error('Failed to unregister device for notifications.');
      }
    } catch (error) {
      console.log('error:', error);
      fireToast.error('An error occurred while disabling notifications.');
    }
  };

  /**
   * Checks if notifications are enabled from AsyncStorage
   */
  const checkIfNotificationsEnabled = useCallback(async () => {
    try {
      const notificationsEnabled = await AsyncStorage.getItem(
        'notificationsEnabled',
      );
      if (notificationsEnabled === 'true') {
        setNotificationEnabled(true);
      } else {
        setNotificationEnabled(false);
      }
    } catch (error) {
      console.log('error:', error);
      fireToast.error(
        'An error occurred while checking notifications status. ',
      );
    }
  }, [setNotificationEnabled]);

  useEffect(() => {
    checkIfNotificationsEnabled();
  }, [checkIfNotificationsEnabled]);

  return {
    isNotificationEnabled,
    enableNotifications,
    disableNotifications,
  };
};
