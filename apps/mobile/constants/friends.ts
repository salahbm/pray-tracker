import { FRIENDS } from "./images";
import { ApprovedFriend } from "@/types/friends";

export const FRIENDS_DATA: ApprovedFriend[] = [
  {
    friend: {
      friendshipId: "1",
      id: "2",
      username: "Ahmed Ali",
      email: "ahmed.ali@naver.kr",
      photo: FRIENDS.friend_1,
      deviceToken: "ExpoPushNotificationToken[this is fake token]",
      status: "APPROVED",
    },
    prays: [
      {
        fajr: 2,
        dhuhr: 1,
        asr: 2,
        maghrib: 1,
        isha: 0,
        nafl: 1,
        userId: "1",
        date: new Date(),
      },
    ],
  },
  {
    friend: {
      friendshipId: "2",
      id: "3",
      username: "Aisha Khan",
      email: "aisha.khan@gmail.com",
      photo: FRIENDS.friend_5,
      deviceToken: "ExpoPushNotificationToken[this is fake token]",
      status: "APPROVED",
    },
    prays: [
      {
        fajr: 1,
        dhuhr: 2,
        asr: 0,
        maghrib: 1,
        isha: 2,
        nafl: 0,
        userId: "1",
        date: new Date(),
      },
    ],
  },
  {
    friend: {
      friendshipId: "3",
      id: "4",
      username: "Mohamed Yusuf",
      email: "mohamed.yusuf@mail.ru",
      photo: FRIENDS.friend_3,
      deviceToken: "ExpoPushNotificationToken[this is fake token]",
      status: "APPROVED",
    },
    prays: [
      {
        fajr: 0,
        dhuhr: 1,
        asr: 1,
        maghrib: 2,
        isha: 1,
        nafl: 2,
        userId: "1",
        date: new Date(),
      },
    ],
  },
  {
    friend: {
      friendshipId: "4",
      id: "5",
      username: "Fatima Zahra",
      email: "fatima.zahra@gmail.com",
      photo: FRIENDS.friend_4,
      deviceToken: "ExpoPushNotificationToken[this is fake token]",
      status: "APPROVED",
    },
    prays: [
      {
        fajr: 2,
        dhuhr: 2,
        asr: 0,
        maghrib: 1,
        isha: 1,
        nafl: 0,
        userId: "1",
        date: new Date(),
      },
    ],
  },
  {
    friend: {
      friendshipId: "5",
      id: "6",
      username: "Omar Salahiddin",
      email: "omar.salah@yahoo.com",
      photo: FRIENDS.friend_2,
      deviceToken: "ExpoPushNotificationToken[this is fake token]",
      status: "APPROVED",
    },
    prays: [
      {
        fajr: 1,
        dhuhr: 0,
        asr: 2,
        maghrib: 2,
        isha: 1,
        nafl: 2,
        userId: "1",
        date: new Date(),
      },
    ],
  },
];
