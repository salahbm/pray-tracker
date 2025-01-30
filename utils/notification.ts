// NOTIFICATION

// async function registerForPushNotificationsAsync() {
//   const { status: existingStatus } = await Notifications.getPermissionsAsync();
//   let finalStatus = existingStatus;
//   if (existingStatus !== 'granted') {
//     const { status } = await Notifications.requestPermissionsAsync();
//     finalStatus = status;
//   }
//   if (finalStatus !== 'granted') {
//     alert('Failed to get push token for push notification!');
//     return;
//   }
//   const token = (await Notifications.getExpoPushTokenAsync()).data;
//   return token;
// }

// // This function calls Expo push API:
// export async function sendAwardNotification(userId: string, awardTitle: string) {
//   // Usually you'll store user push tokens in your DB. Retrieve user push token:
//   const user = await prisma.user.findUnique({ where: { id: userId } });
//   if (!user || !user.expoPushToken) return;

//   await axios.post('https://exp.host/--/api/v2/push/send', {
//     to: user.expoPushToken,
//     title: '🎉 New Achievement!',
//     body: `You've earned the '${awardTitle}' award! Keep going!`,
//     sound: 'default',
//   });
// }
