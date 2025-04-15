export type Stats = {
  totalPrayers: number;
  missedPrayers: number;
  naflCount: number;
  currentStreak: number;
  longestStreak: number;
  fajrStreak: number;
  onTimePercentage: number;
  earlyFajrPercentage: number;
  fajrOnTimePercentage: number;
  dhuhrOnTimePercentage: number;
  asrOnTimePercentage: number;
  maghribOnTimePercentage: number;
  ishaOnTimePercentage: number;
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
  consistencyPercentage: number;
  lastActiveDay?: Date;
  lastFajrTime?: Date;
  lastNaflDate?: Date;
  missedPrayerStreak: number;
  level: number;
  totalXP: number;
};

export type AwardRule = {
  emoji: string;
  title: string;
  description: string;
  condition: (stats: Stats) => boolean;
  points: number;
};

export const awardRules: AwardRule[] = [
  {
    emoji: '🕌',
    title: 'FirstPrayerLogged',
    description: 'FirstPrayerLoggedDescription',
    condition: (stats) => stats.totalPrayers >= 1,
    points: 10,
  },
  {
    emoji: '🕋',
    title: 'CompletedFirstFullDay',
    description: 'CompletedFirstFullDayDescription',
    condition: (stats) =>
      stats.fajrStrike10 >= 1 &&
      stats.dhuhrStrike10 >= 1 &&
      stats.asrStrike10 >= 1 &&
      stats.maghribStrike10 >= 1 &&
      stats.ishaStrike10 >= 1,
    points: 15,
  },
  {
    emoji: '🔥',
    title: 'SevenDayStreak',
    description: 'SevenDayStreakDescription',
    condition: (stats) => stats.currentStreak >= 7,
    points: 20,
  },
  {
    emoji: '📿',
    title: 'FourteenDayStreak',
    description: 'FourteenDayStreakDescription',
    condition: (stats) => stats.currentStreak >= 14,
    points: 30,
  },
  {
    emoji: '🌙',
    title: 'ThirtyDayStreak',
    description: 'ThirtyDayStreakDescription',
    condition: (stats) => stats.currentStreak >= 30,
    points: 50,
  },
  {
    emoji: '🕊️',
    title: 'NinetyDayStreak',
    description: 'NinetyDayStreakDescription',
    condition: (stats) => stats.currentStreak >= 90,
    points: 100,
  },
  {
    emoji: '🌄',
    title: 'EarlyFajrMaster',
    description: 'EarlyFajrMasterDescription',
    condition: (stats) => stats.earlyFajrPercentage >= 90,
    points: 50,
  },
  {
    emoji: '⚔️',
    title: 'OnTimeWarrior',
    description: 'OnTimeWarriorDescription',
    condition: (stats) => stats.onTimePercentage >= 90,
    points: 75,
  },
  ...['fajr', 'dhuhr', 'asr', 'maghrib', 'isha', 'nafl'].flatMap((prayer) => {
    const capitalized = prayer[0].toUpperCase() + prayer.slice(1);
    const emojiMap: Record<string, string> = {
      fajr: '🌅',
      dhuhr: '☀️',
      asr: '🌇',
      maghrib: '🌠',
      isha: '🌌',
      nafl: '✨',
    };
    return [10, 50, 100, 150].map((count) => ({
      emoji: emojiMap[prayer],
      title: `${capitalized}Strike${count}`,
      description: `${capitalized}Strike${count}Description`,
      condition: (stats) => stats[`${prayer}Strike${count}`] >= 1,
      points: count <= 50 ? 20 : count <= 100 ? 40 : 60,
    }));
  }),
  {
    emoji: '🏆',
    title: 'ConsistencyChamp',
    description: 'ConsistencyChampDescription',
    condition: (stats) => stats.consistencyPercentage >= 80,
    points: 50,
  },
  {
    emoji: '👑',
    title: 'TheDevoted',
    description: 'TheDevotedDescription',
    condition: (stats) =>
      stats.consistencyPercentage >= 90 &&
      stats.onTimePercentage >= 90 &&
      stats.currentStreak >= 30,
    points: 100,
  },
  {
    emoji: '🧎‍♂️',
    title: 'NaflInitiator',
    description: 'NaflInitiatorDescription',
    condition: (stats) => !!stats.lastNaflDate,
    points: 30,
  },
  ...[5, 10, 15, 20, 25, 30, 35, 40, 45, 50].map((level) => ({
    emoji: '🎯',
    title: `Level${level}Achieved`,
    description: `Level${level}AchievedDescription`,
    condition: (stats) => stats.level >= level,
    points: level * 5,
  })),
  {
    emoji: '💪',
    title: 'BounceBack',
    description: 'BounceBackDescription',
    condition: (stats) =>
      stats.missedPrayerStreak >= 3 && stats.currentStreak >= 5,
    points: 30,
  },
];

export type AwardCheckResult = {
  awards: {
    id: string;
    userId: string;
    title: string;
    points: number;
  }[];
  levelInfo: {
    level: number;
    progress: number;
    xpEarned: number;
  };
};
