export const sendPushNotification = async ({
  to,
  title,
  body,
}: {
  to: string;
  title: string;
  body: string;
}) => {
  await fetch('https://exp.host/--/api/v2/push/send', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Accept-Encoding': 'gzip, deflate',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      to,
      sound: 'default',
      title,
      body,
    }),
  });
};
