import * as Notifications from 'expo-notifications';
import { useEffect, useRef } from 'react';

interface NotificationListenerProps {
  onNotificationReceived?: (notification: Notifications.Notification) => void;
  onNotificationResponse?: (
    response: Notifications.NotificationResponse,
  ) => void;
}

export const useNotificationListeners = ({
  onNotificationReceived,
  onNotificationResponse,
}: NotificationListenerProps) => {
  const notificationListener = useRef<Notifications.Subscription | null>(null);
  const responseListener = useRef<Notifications.Subscription | null>(null);

  useEffect(() => {
    // Listener for foreground notifications
    notificationListener.current =
      Notifications.addNotificationReceivedListener((notification) => {
        console.log('Notification Received:', notification);
        if (onNotificationReceived) {
          onNotificationReceived(notification);
        }
      });

    // Listener for user interaction with notifications (foreground, background, or killed)
    responseListener.current =
      Notifications.addNotificationResponseReceivedListener((response) => {
        console.log('Notification Response:', response);
        if (onNotificationResponse) {
          onNotificationResponse(response);
        }
      });

    return () => {
      // Clean up listeners when the component unmounts
      if (notificationListener.current) {
        Notifications.removeNotificationSubscription(
          notificationListener.current,
        );
      }
      if (responseListener.current) {
        Notifications.removeNotificationSubscription(responseListener.current);
      }
    };
  }, [onNotificationReceived, onNotificationResponse]); // Ensure effect re-runs if callback changes
};
