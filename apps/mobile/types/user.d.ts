export type TUser = {
  id: string;
  supabaseId: string;
  email: string;
  password: string;
  username: string;
  firstName?: string;
  lastName?: string;
  photo?: string;
  locale?: string;

  totalPoints: number;
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

// Type for stored user without password
export type TStoredUser = Omit<TUser, "password">;

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

export type TAward = {
  id: string;
  userId: string;
  title: string;
  awardedAt: Date;
  points: number;
};

export type TFriend = {
  id: string;
  userId: string;
  friendId: string;
  status: "PENDING" | "APPROVED" | "REJECTED";
};

export type TCustomer = {
  id: string;
  customerId: string;
  email: string;
  userId: string;
  createdAt: Date;
  updatedAt: Date;
  subscriptions?: TSubscription[];
};

export type TSubscription = {
  id: string;
  subscriptionId: string;
  customerId: string;
  status: string;
  priceId: string;
  productId: string;
  scheduledChange?: Date;
  createdAt: Date;
  updatedAt: Date;
};

export type TPrayerStats = {
  id: string;
  userId: string;

  // Core Stats
  totalPrayers: number;
  missedPrayers: number;
  naflCount: number;

  // Streaks
  currentStreak: number;
  longestStreak: number;
  fajrStreak: number;
  isTodayStreakBroken: boolean;

  // On-time Percentages
  onTimePercentage: number;
  earlyFajrPercentage: number;
  fajrOnTimePercentage: number;
  dhuhrOnTimePercentage: number;
  asrOnTimePercentage: number;
  maghribOnTimePercentage: number;
  ishaOnTimePercentage: number;

  // Per-Prayer Streak Achievements
  fajrStrike10: number;
  fajrStrike50: number;
  fajrStrike100: number;
  fajrStrike150: number;

  dhuhrStrike10: number;
  dhuhrStrike50: number;
  dhuhrStrike100: number;
  dhuhrStrike150: number;

  asrStrike10: number;
  asrStrike50: number;
  asrStrike100: number;
  asrStrike150: number;

  maghribStrike10: number;
  maghribStrike50: number;
  maghribStrike100: number;
  maghribStrike150: number;

  ishaStrike10: number;
  ishaStrike50: number;
  ishaStrike100: number;
  ishaStrike150: number;

  naflStrike10: number;
  naflStrike50: number;
  naflStrike100: number;
  naflStrike150: number;

  // Advanced Tracking
  consistencyPercentage: number;
  lastActiveDay?: Date;
  lastFajrTime?: Date;
  lastNaflDate?: Date;
  missedPrayerStreak: number;

  // Gamification
  level: number;
  totalXP: number;

  // Meta
  lastCalculated: Date;
};
