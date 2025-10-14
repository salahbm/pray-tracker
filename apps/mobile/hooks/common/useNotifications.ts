// usePushNotifications.ts
import Constants from 'expo-constants';
import * as Device from 'expo-device';
import * as Notifications from 'expo-notifications';
import { useState, useEffect, useRef, useCallback } from 'react';
import { Platform } from 'react-native';

import { usePutUser } from '../user/usePutUser';

import { fireToast } from '@/providers/toaster';
import { useAuthStore } from '@/store/auth/auth-session';
import { useNotificationStore } from '@/store/defaults/notification';
import { useThemeStore } from '@/store/defaults/theme';

export interface PushNotificationState {
  expoPushToken?: string;
  notification?: Notifications.Notification;
}

export const usePushNotifications = (): PushNotificationState & {
  isNotificationEnabled: boolean;
  toggleNotifications: (enabled: boolean) => void;
} => {
  // Setup notification handler
  Notifications.setNotificationHandler({
    handleNotification: async () => ({
      shouldPlaySound: true,
      shouldShowAlert: true,
      shouldSetBadge: false,
    }),
  });

  const [expoPushToken, setExpoPushToken] = useState<string>();
  const [notification, setNotification] =
    useState<Notifications.Notification>();
  const notificationListener = useRef<Notifications.EventSubscription>();
  const responseListener = useRef<Notifications.EventSubscription>();

  const { user, setUser } = useAuthStore();
  const { mutateAsync: updateUser } = usePutUser();
  const { colors } = useThemeStore();
  const { isNotificationEnabled, setNotificationEnabled } =
    useNotificationStore();

  // On mount, detect if user already has a token -> set store to true
  useEffect(() => {
    if (user?.deviceToken) {
      setExpoPushToken(user.deviceToken);
      setNotificationEnabled(true);
    }
  }, [user?.deviceToken, setNotificationEnabled]);

  const registerForPushNotificationsAsync = useCallback(async () => {
    try {
      if (!Device.isDevice) {
        setNotificationEnabled(false);
        return;
      }
      const { status: existingStatus } =
        await Notifications.getPermissionsAsync();
      let finalStatus = existingStatus;
      if (existingStatus !== 'granted') {
        const { status } = await Notifications.requestPermissionsAsync();
        finalStatus = status;
      }
      if (finalStatus !== 'granted') {
        fireToast.error('Permissions not granted');
        setNotificationEnabled(false);
        return;
      }

      const projectId = Constants.expoConfig?.extra?.eas?.projectId || '';
      const token = await Notifications.getExpoPushTokenAsync({ projectId });
      if (Platform.OS === 'android') {
        await Notifications.setNotificationChannelAsync('default', {
          name: 'default',
          importance: Notifications.AndroidImportance.MAX,
          vibrationPattern: [0, 250, 250, 250],
          lightColor: colors['--primary'],
        });
      }

      if (user?.id && token.data && token.data !== user.deviceToken) {
        await updateUser({
          id: user.id,
          deviceToken: token.data,
          toast: false,
        }).catch(() => {
          fireToast.error('Server update failed');
        });
        setUser({ ...user, deviceToken: token.data, password: '' });
        setNotificationEnabled(true);
      }
      return token.data;
    } catch {
      return undefined;
    }
  }, [colors, user, setUser, updateUser, setNotificationEnabled]);

  // Register for notifications only if user wants them enabled
  useEffect(() => {
    if (!isNotificationEnabled) return;

    registerForPushNotificationsAsync().then((t) => {
      if (t) setExpoPushToken(t);
    });
    notificationListener.current =
      Notifications.addNotificationReceivedListener((n) => setNotification(n));
    responseListener.current =
      Notifications.addNotificationResponseReceivedListener((r) =>
        console.info(r),
      );

    return () => {
      if (notificationListener.current) {
        Notifications.removeNotificationSubscription(
          notificationListener.current,
        );
      }
      if (responseListener.current) {
        Notifications.removeNotificationSubscription(responseListener.current);
      }
    };
  }, [isNotificationEnabled, registerForPushNotificationsAsync]);

  const toggleNotifications = useCallback(
    async (enabled: boolean) => {
      if (!user?.id) return;
      if (!enabled) {
        await updateUser({
          id: user.id,
          deviceToken: null,
          toast: false,
        }).catch(() => {
          fireToast.error('Failed to remove token');
        });
        setUser({ ...user, deviceToken: null, password: '' });
        setNotificationEnabled(false);
        setExpoPushToken(undefined);
      } else {
        const newToken = await registerForPushNotificationsAsync();
        if (newToken) {
          setExpoPushToken(newToken);
          setNotificationEnabled(true);
        }
      }
    },
    [
      user,
      setUser,
      updateUser,
      registerForPushNotificationsAsync,
      setNotificationEnabled,
    ],
  );

  return {
    expoPushToken,
    notification,
    isNotificationEnabled,
    toggleNotifications,
  };
};
