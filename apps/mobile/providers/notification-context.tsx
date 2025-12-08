import { useEffect } from 'react';
import * as Notifications from 'expo-notifications';
import { router } from 'expo-router';
import { useRegisterPushToken } from '@/hooks/user/useRegisterPushToken';

// Foreground notification display settings must be set before component renders
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true,
    shouldShowBanner: true,
    shouldShowList: true,
  }),
});

export default function NotificationProvider() {
  useRegisterPushToken();

  const handleNavigation = (data: any) => {
    if (!data) return;

    switch (data.type) {
      case 'prayer_reminder':
        router.push({
          pathname: '/(tabs)/qibla',
          params: { tab: 'salahs' },
        });
        break;

      case 'FRIEND_REQUEST':
      case 'FRIEND_REQUEST_ACCEPTED':
        router.push('/(screens)/friends/all-friends');
        break;

      case 'ADDED_TO_GROUP':
        router.push('/(tabs)/friends');
        break;

      default:
        if (data.navigateTo) router.push(data.navigateTo);
        break;
    }
  };

  // Cold start / background open
  useEffect(() => {
    (async () => {
      const last = await Notifications.getLastNotificationResponseAsync();
      if (last) {
        const data = last.notification.request.content.data;
        handleNavigation(data);
      }
    })();

    const sub = Notifications.addNotificationResponseReceivedListener(response => {
      const data = response.notification.request.content.data;
      handleNavigation(data);
    });

    return () => sub.remove();
  }, []);

  // Foreground listener
  useEffect(() => {
    const notificationListener = Notifications.addNotificationReceivedListener(n => {
      console.log('FOREGROUND', n);
    });

    const responseListener = Notifications.addNotificationResponseReceivedListener(r => {
      console.log('INTERACTION', r);
    });

    return () => {
      notificationListener.remove();
      responseListener.remove();
    };
  }, []);

  return null;
}
