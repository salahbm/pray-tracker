import { AwardCheckResult, awardRules } from './award-helpers';
import {
  ACTION_POINTS,
  calculateLevel,
  getLevelProgress,
} from './level-system';

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
