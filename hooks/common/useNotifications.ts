import Constants from 'expo-constants';
import * as Device from 'expo-device';
import * as Notifications from 'expo-notifications';
import { useState, useEffect, useRef, useCallback } from 'react';
import { Platform } from 'react-native';

import { usePutUser } from '../auth/usePutUser';
import { fireToast } from '@/providers/toaster';
import { useAuthStore } from '@/store/auth/auth-session';
import { useThemeStore } from '@/store/defaults/theme';

export interface PushNotificationState {
  expoPushToken?: Notifications.ExpoPushToken;
  notification?: Notifications.Notification;
}

export const usePushNotifications = (): PushNotificationState & {
  isNotificationEnabled: boolean;
} => {
  // INIT
  Notifications.setNotificationHandler({
    handleNotification: async () => ({
      shouldPlaySound: true,
      shouldShowAlert: true,
      shouldSetBadge: false,
    }),
  });

  // STATES
  const [expoPushToken, setExpoPushToken] = useState<
    Notifications.ExpoPushToken | undefined
  >();

  const [notification, setNotification] = useState<
    Notifications.Notification | undefined
  >();

  const [isNotificationEnabled, setIsNotificationEnabled] =
    useState<boolean>(false);

  // REFS
  const notificationListener = useRef<Notifications.EventSubscription>();
  const responseListener = useRef<Notifications.EventSubscription>();

  // HOOKS
  const { colors } = useThemeStore();
  const { mutateAsync: updateUser } = usePutUser();
  const { user, setUser } = useAuthStore(); // Retrieve user from Zustand store

  // CALLBACKS
  const registerForPushNotificationsAsync = useCallback(async () => {
    let token: Notifications.ExpoPushToken | undefined;
    if (Device.isDevice) {
      const { status: existingStatus } =
        await Notifications.getPermissionsAsync();
      let finalStatus = existingStatus;

      if (existingStatus !== 'granted') {
        const { status } = await Notifications.requestPermissionsAsync();
        finalStatus = status;
      }
      if (finalStatus !== 'granted') {
        fireToast.error('Failed to get push token for push notification');
        setIsNotificationEnabled(false);
        return;
      }

      token = await Notifications.getExpoPushTokenAsync({
        projectId: Constants.expoConfig?.extra?.eas.projectId,
      });
      if (token && user?.id) {
        await updateUser({ id: user.id, deviceToken: token.data });
        setUser({ ...user, deviceToken: token.data, password: '' });
        setIsNotificationEnabled(true);
      }
    } else {
      fireToast.error('Must be using a physical device for Push notifications');
      setIsNotificationEnabled(false);
      return;
    }

    if (Platform.OS === 'android') {
      Notifications.setNotificationChannelAsync('default', {
        name: 'default',
        importance: Notifications.AndroidImportance.MAX,
        vibrationPattern: [0, 250, 250, 250],
        lightColor: colors['--primary'],
      });
    }

    return token;
  }, [colors, setUser, updateUser, user]);

  useEffect(() => {
    registerForPushNotificationsAsync().then((token) => {
      setExpoPushToken(token);
    });

    notificationListener.current =
      Notifications.addNotificationReceivedListener((notification) => {
        setNotification(notification);
      });

    responseListener.current =
      Notifications.addNotificationResponseReceivedListener((response) => {
        console.info(response);
      });

    return () => {
      Notifications.removeNotificationSubscription(
        notificationListener.current!,
      );

      Notifications.removeNotificationSubscription(responseListener.current!);
    };
  }, [registerForPushNotificationsAsync]);

  return {
    expoPushToken,
    notification,
    isNotificationEnabled,
  };
};
