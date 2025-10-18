export type TUser = {
  id: string;
  email: string;
  name: string;
  image?: string | null;
  emailVerified: boolean;
  createdAt: string;
  updatedAt: string;
  locale?: string;

  // Legacy fields (optional for backward compatibility)
  password?: string;
  username?: string;
  firstName?: string;
  lastName?: string;
  photo?: string;
  totalPoints?: number;
  deviceToken?: string;

  prays?: TPray[];
  awards?: TAward[];
  prayerStats?: TPrayerStats;

  sentRequests?: TFriend[];
  receivedRequests?: TFriend[];

  customer?: TCustomer;

  createdAt: Date;
  updatedAt: Date;
};

export type TPray = {
  id: string;
  userId: string;
  date: Date;
  fajr: number;
  dhuhr: number;
  asr: number;
  maghrib: number;
  isha: number;
  nafl: number;
  createdAt: Date;
  updatedAt: Date;
};

export type TFriend = {
  id: string;
  userId: string;
  friendId: string;
  status: 'PENDING' | 'APPROVED' | 'REJECTED';
};
