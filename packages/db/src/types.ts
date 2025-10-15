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
  emailVerified: boolean;
  totalPoints: number;
  deviceToken?: string | null;
  createdAt: Date;
  updatedAt: Date;
  sessions?: Session[];
  accounts?: Account[];
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

export interface Session {
  id: string;
  token: string;
  userId: string;
  expiresAt: Date;
  ipAddress?: string | null;
  userAgent?: string | null;
  createdAt: Date;
  updatedAt: Date;
}

export interface Account {
  id: string;
  userId: string;
  providerId: string;
  accountId: string;
  accessToken?: string | null;
  refreshToken?: string | null;
  idToken?: string | null;
  accessTokenExpiresAt?: Date | null;
  refreshTokenExpiresAt?: Date | null;
  scope?: string | null;
  password?: string | null;
  createdAt: Date;
  updatedAt: Date;
}

export interface Verification {
  id: string;
  identifier: string;
  value: string;
  expiresAt: Date;
  userId?: string | null;
  createdAt: Date;
  updatedAt: Date;
}
