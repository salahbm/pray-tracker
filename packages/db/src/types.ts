export enum FriendStatus {
  PENDING = 'PENDING',
  APPROVED = 'APPROVED',
  REJECTED = 'REJECTED',
}

export interface User {
  id: string;
  supabaseId: string;
  email: string;
  password: string;
  username: string;
  firstName?: string | null;
  lastName?: string | null;
  photo?: string | null;
  locale?: string | null;
  totalPoints: number;
  deviceToken?: string | null;
  createdAt: Date;
  updatedAt: Date;
}

export interface Pro {
  id: string;
  isProVisible: boolean;
}

export interface Friend {
  id: string;
  userId: string;
  friendId: string;
  status: FriendStatus;
  user: User;
  friend: User;
}

export interface Prays {
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
  user?: User;
}

export interface Award {
  id: string;
  userId: string;
  title: string;
  awardedAt: Date;
  points: number;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface Customer {
  id: string;
  customerId: string;
  email: string;
  userId: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Subscription {
  id: string;
  subscriptionId: string;
  customerId: string;
  status: string;
  priceId: string;
  productId: string;
  scheduledChange?: Date | null;
  createdAt: Date;
  updatedAt: Date;
}

export interface PrayerStats {
  id: string;
  userId: string;
  totalPrayers: number;
  naflCount: number;
  missedPrayers: number;
  currentStreak: number;
  longestStreak: number;
  fajrStreak: number;
  isTodayStreakBroken: boolean;
  onTimePercentage: number;
  earlyFajrPercentage: number;
  fajrOnTimePercentage: number;
  dhuhrOnTimePercentage: number;
  asrOnTimePercentage: number;
  maghribOnTimePercentage: number;
  ishaOnTimePercentage: number;
  createdAt?: Date;
  updatedAt?: Date;
}
