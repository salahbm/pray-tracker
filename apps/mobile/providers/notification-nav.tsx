import { useEffect } from 'react';
import * as Notifications from 'expo-notifications';
import { router } from 'expo-router';

export default function NotificationNavProvider({ children }: { children: React.ReactNode }) {
  const handleNavigation = (data: any) => {
    if (!data) return;

    // Example navigation logic
    switch (data.type) {
      case 'prayer_reminder':
        router.push({
          pathname: '/(tabs)/qibla',
          params: {
            tab: 'salahs',
          },
        });
        break;

      case 'open_friends':
        router.push('/(tabs)/friends');
        break;

      default:
        if (data.navigateTo) router.push(data.navigateTo); // flexible routing
        break;
    }
  };

  useEffect(() => {
    // 1. Handle cold start notifications
    (async () => {
      const last = await Notifications.getLastNotificationResponseAsync();
      if (last) {
        const data = last.notification.request.content.data;
        handleNavigation(data);
      }
    })();

    // 2. Handle notification interactions when app is open or backgrounded
    const sub = Notifications.addNotificationResponseReceivedListener(response => {
      const data = response.notification.request.content.data;
      handleNavigation(data);
    });

    return () => sub.remove();
  }, []);

  return <>{children}</>;
}
