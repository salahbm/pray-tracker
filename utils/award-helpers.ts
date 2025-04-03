import {
  ACTION_POINTS,
  calculateLevel,
  getLevelProgress,
} from './level-system';
import { sendPushNotification } from './notification';
import prisma from '@/lib/prisma';

type Stats = {
  // Core Stats
  totalPrayers: number;
  missedPrayers: number;
  naflCount: number;

  // Streaks
  currentStreak: number;
  longestStreak: number;
  fajrStreak: number;

  // On-time Percentages
  onTimePercentage: number;
  earlyFajrPercentage: number;
  fajrOnTimePercentage: number;
  dhuhrOnTimePercentage: number;
  asrOnTimePercentage: number;
  maghribOnTimePercentage: number;
  ishaOnTimePercentage: number;

  // Per-Prayer Strike Achievements
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
};

export type AwardRule = {
  title: string;
  condition: (stats: Stats) => boolean;
  points: number;
};

export const awardRules: AwardRule[] = [
  // Beginner Milestones
  {
    title: 'First Prayer Logged',
    condition: (stats) => stats.totalPrayers >= 1,
    points: 10,
  },
  {
    title: 'Completed First Full Day',
    condition: (stats) =>
      stats.fajrStreak >= 1 &&
      stats.dhuhrStrike10 >= 1 &&
      stats.asrStrike10 >= 1 &&
      stats.maghribStrike10 >= 1 &&
      stats.ishaStrike10 >= 1,
    points: 15,
  },

  // Streak Achievements
  {
    title: '7 Day Streak',
    condition: (stats) => stats.currentStreak >= 7,
    points: 20,
  },
  {
    title: '14 Day Streak',
    condition: (stats) => stats.currentStreak >= 14,
    points: 30,
  },
  {
    title: '30 Day Streak',
    condition: (stats) => stats.currentStreak >= 30,
    points: 50,
  },
  {
    title: '90 Day Streak',
    condition: (stats) => stats.currentStreak >= 90,
    points: 100,
  },

  // On-time Achievements
  {
    title: 'Early Fajr Master',
    condition: (stats) => stats.earlyFajrPercentage >= 90,
    points: 50,
  },
  {
    title: 'On Time Warrior',
    condition: (stats) => stats.onTimePercentage >= 90,
    points: 75,
  },

  // Per-Prayer Streaks
  ...['fajr', 'dhuhr', 'asr', 'maghrib', 'isha', 'nafl'].flatMap((prayer) => {
    const capitalized = prayer[0].toUpperCase() + prayer.slice(1);
    return [10, 50, 100, 150].map((count) => ({
      title: `${capitalized} Strike ${count}`,
      condition: (stats) => stats[`${prayer}Strike${count}`] >= 1,
      points: count <= 50 ? 20 : count <= 100 ? 40 : 60,
    }));
  }),

  // Consistency Awards
  {
    title: 'Consistency Champ',
    condition: (stats) => stats.consistencyPercentage >= 80,
    points: 50,
  },
  {
    title: 'The Devoted',
    condition: (stats) =>
      stats.consistencyPercentage >= 90 &&
      stats.onTimePercentage >= 90 &&
      stats.currentStreak >= 30,
    points: 100,
  },

  // Advanced Gamification
  {
    title: 'Nafl Initiator',
    condition: (stats) => !!stats.lastNaflDate,
    points: 30,
  },
  {
    title: 'Level 5 Achieved',
    condition: (stats) => stats.level >= 5,
    points: 25,
  },
  {
    title: 'Level 10 Achieved',
    condition: (stats) => stats.level >= 10,
    points: 50,
  },
  {
    title: 'Level 15 Achieved',
    condition: (stats) => stats.level >= 15,
    points: 100,
  },
  {
    title: 'Level 20 Achieved',
    condition: (stats) => stats.level >= 20,
    points: 150,
  },
  {
    title: 'Level 25 Achieved',
    condition: (stats) => stats.level >= 25,
    points: 200,
  },
  {
    title: 'Level 30 Achieved',
    condition: (stats) => stats.level >= 30,
    points: 250,
  },
  {
    title: 'Level 35 Achieved',
    condition: (stats) => stats.level >= 35,
    points: 300,
  },
  {
    title: 'Level 40 Achieved',
    condition: (stats) => stats.level >= 40,
    points: 350,
  },
  {
    title: 'Level 45 Achieved',
    condition: (stats) => stats.level >= 45,
    points: 400,
  },
  {
    title: 'Level 50 Achieved',
    condition: (stats) => stats.level >= 50,
    points: 450,
  },

  // Recovery Milestones
  {
    title: 'Bounce Back',
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

export const checkAndAssignAwards = async (
  userId: string,
): Promise<AwardCheckResult> => {
  const stats = await prisma.prayerStats.findUnique({
    where: { userId },
  });

  if (!stats)
    return { awards: [], levelInfo: { level: 0, progress: 0, xpEarned: 0 } };

  const existingAwards = await prisma.award.findMany({
    where: { userId },
  });

  const existingAwardTitles = new Set(existingAwards.map((a) => a.title));
  const newAwards = [];

  // Calculate XP based on recent actions
  let earnedXP = 0;

  // Prayer-based XP
  if (stats.onTimePercentage > 0) earnedXP += ACTION_POINTS.PRAYER_ON_TIME;
  if (stats.earlyFajrPercentage > 0) earnedXP += ACTION_POINTS.PRAYER_EARLY;
  if (stats.naflCount > 0) earnedXP += ACTION_POINTS.NAFL_PRAYER;

  // Streak-based XP
  if (stats.currentStreak >= 30) earnedXP += ACTION_POINTS.MONTHLY_STREAK;
  else if (stats.currentStreak >= 7) earnedXP += ACTION_POINTS.WEEKLY_STREAK;
  else if (stats.currentStreak > 0) earnedXP += ACTION_POINTS.DAILY_STREAK;

  // Bonus XP
  if (stats.consistencyPercentage >= 80)
    earnedXP += ACTION_POINTS.CONSISTENCY_BONUS;
  if (stats.earlyFajrPercentage >= 90)
    earnedXP += ACTION_POINTS.EARLY_FAJR_BONUS;

  // Calculate new level
  const newLevel = calculateLevel(earnedXP + stats.totalXP);
  const levelProgress = getLevelProgress(earnedXP + stats.totalXP);

  // Update user's level and XP if changed
  if (newLevel !== stats.level || earnedXP > 0) {
    await prisma.prayerStats.update({
      where: { userId },
      data: {
        level: newLevel,
        totalXP: {
          increment: earnedXP,
        },
      },
    });
  }

  // Check for awards
  for (const rule of awardRules) {
    if (rule.condition(stats) && !existingAwardTitles.has(rule.title)) {
      const newAward = await prisma.award.create({
        data: {
          userId,
          title: rule.title,
          points: rule.points,
        },
      });

      await prisma.user.update({
        where: { id: userId },
        data: {
          totalPoints: {
            increment: rule.points,
          },
        },
      });

      const user = await prisma.user.findUnique({ where: { id: userId } });

      if (user?.deviceToken) {
        // Send award notification
        await sendPushNotification({
          to: user.deviceToken,
          title: ' New Award Unlocked!',
          body: `${rule.title} — You've earned ${rule.points} points!`,
        });

        // If level up occurred, send level up notification
        if (newLevel > stats.level) {
          await sendPushNotification({
            to: user.deviceToken,
            title: ' Level Up!',
            body: `Congratulations! You've reached Level ${newLevel}! Keep up the great work!`,
          });
        }
      }

      newAwards.push(newAward);
    }
  }

  return {
    awards: newAwards,
    levelInfo: {
      level: newLevel,
      progress: levelProgress,
      xpEarned: earnedXP,
    },
  };
};
