import * as Notifications from 'expo-notifications';

export const sendTestNotification = async () => {
  await Notifications.scheduleNotificationAsync({
    content: {
      title: '🔔 Test Notification',
      body: 'This is a test notification from your app!',
      sound: 'default',
      data: { screen: 'HomeScreen' }, // Custom data for navigation
    },
    trigger: null, // Instant notification
  });
};
