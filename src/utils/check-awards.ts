import { AwardCheckResult, awardRules } from './award-helpers';
import {
  ACTION_POINTS,
  calculateLevel,
  getLevelProgress,
} from './level-system';
import prisma from '../lib/prisma';

export const checkAndAssignAwards = async (
  userId: string,
): Promise<AwardCheckResult> => {
  // Step 1: Get or create stats
  let stats = await prisma.prayerStats.findUnique({ where: { userId } });

  if (!stats) {
    stats = await prisma.prayerStats.create({
      data: {
        userId,
        totalPrayers: 0,
        missedPrayers: 0,
        naflCount: 0,
        currentStreak: 0,
        longestStreak: 0,
        fajrStreak: 0,
        onTimePercentage: 0,
        earlyFajrPercentage: 0,
        fajrOnTimePercentage: 0,
        dhuhrOnTimePercentage: 0,
        asrOnTimePercentage: 0,
        maghribOnTimePercentage: 0,
        ishaOnTimePercentage: 0,
        fajrStrike10: 0,
        fajrStrike50: 0,
        fajrStrike100: 0,
        fajrStrike150: 0,
        dhuhrStrike10: 0,
        dhuhrStrike50: 0,
        dhuhrStrike100: 0,
        dhuhrStrike150: 0,
        asrStrike10: 0,
        asrStrike50: 0,
        asrStrike100: 0,
        asrStrike150: 0,
        maghribStrike10: 0,
        maghribStrike50: 0,
        maghribStrike100: 0,
        maghribStrike150: 0,
        ishaStrike10: 0,
        ishaStrike50: 0,
        ishaStrike100: 0,
        ishaStrike150: 0,
        naflStrike10: 0,
        naflStrike50: 0,
        naflStrike100: 0,
        naflStrike150: 0,
        consistencyPercentage: 0,
        missedPrayerStreak: 0,
        level: 0,
        totalXP: 0,
      },
    });
  }

  // Step 2: Fetch existing awards
  const existingAwards = await prisma.award.findMany({ where: { userId } });
  const existingAwardTitles = new Set(existingAwards.map((a) => a.title));
  const newAwards = [];

  // Step 3: XP calculation
  let earnedXP = 0;

  earnedXP += stats.onTimePercentage > 0 ? ACTION_POINTS.PRAYER_ON_TIME : 0;
  earnedXP += stats.earlyFajrPercentage > 0 ? ACTION_POINTS.PRAYER_EARLY : 0;
  earnedXP += stats.naflCount > 0 ? ACTION_POINTS.NAFL_PRAYER : 0;

  earnedXP +=
    stats.currentStreak >= 30
      ? ACTION_POINTS.MONTHLY_STREAK
      : stats.currentStreak >= 7
        ? ACTION_POINTS.WEEKLY_STREAK
        : stats.currentStreak > 0
          ? ACTION_POINTS.DAILY_STREAK
          : 0;

  earnedXP +=
    stats.consistencyPercentage >= 80 ? ACTION_POINTS.CONSISTENCY_BONUS : 0;
  earnedXP +=
    stats.earlyFajrPercentage >= 90 ? ACTION_POINTS.EARLY_FAJR_BONUS : 0;

  // Step 4: Recalculate level
  const newTotalXP = stats.totalXP + earnedXP;
  const newLevel = calculateLevel(newTotalXP);
  const levelProgress = getLevelProgress(newTotalXP);

  // Step 5: Update level/xp if changed
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

  // Step 6: Evaluate award rules
  for (const rule of awardRules) {
    const alreadyAwarded = existingAwardTitles.has(rule.title);
    const conditionPassed = rule.condition(stats);

    if (conditionPassed && !alreadyAwarded) {
      const award = await prisma.award.create({
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

      newAwards.push(award);
    }
  }

  // Step 7: Return result
  return {
    awards: newAwards,
    levelInfo: {
      level: newLevel,
      progress: levelProgress,
      xpEarned: earnedXP,
    },
  };
};
