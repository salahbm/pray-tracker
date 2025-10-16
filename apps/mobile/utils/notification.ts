import { format } from "date-fns";
import * as Notifications from "expo-notifications";

export const sendPushNotification = async ({
  to,
  title,
  body,
}: {
  to: string;
  title: string;
  body: string;
}) => {
  await fetch("https://exp.host/--/api/v2/push/send", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Accept-Encoding": "gzip, deflate",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      to,
      sound: "default",
      title,
      body,
    }),
  });
};

export const scheduleNextPrayerNotification = async (
  title: string,
  description: string,
  date: string,
) => {
  const parsedDate = new Date(date);

  await Notifications.scheduleNotificationAsync({
    content: {
      title,
      body: `${description} ${format(parsedDate, "HH:mm")}`,
      sound: "default",
    },
    trigger: {
      type: Notifications.SchedulableTriggerInputTypes.DATE,
      date: parsedDate,
    },
  });
};
