// Level System Configuration
export const LEVEL_CONFIG = {
  // Base XP needed for level 1
  BASE_XP: 100,
  // XP multiplier for each level
  MULTIPLIER: 1.5,
  // Maximum level
  MAX_LEVEL: 50,
};

// Points awarded for different actions
export const ACTION_POINTS = {
  // Core prayer actions
  PRAYER_ON_TIME: 10,
  PRAYER_EARLY: 15,
  PRAYER_LATE: 5,
  NAFL_PRAYER: 20,

  // Streaks
  DAILY_STREAK: 25,
  WEEKLY_STREAK: 100,
  MONTHLY_STREAK: 250,

  // Special achievements
  CONSISTENCY_BONUS: 50,
  EARLY_FAJR_BONUS: 30,
};

/**
 * Calculate XP needed for a specific level
 * Uses exponential growth formula: BASE_XP * (MULTIPLIER ^ (level - 1))
 */
export const getXPForLevel = (level: number): number => {
  if (level <= 1) return LEVEL_CONFIG.BASE_XP;
  return Math.floor(
    LEVEL_CONFIG.BASE_XP * Math.pow(LEVEL_CONFIG.MULTIPLIER, level - 1),
  );
};

/**
 * Calculate total XP needed from level 1 to target level
 */
export const getTotalXPForLevel = (level: number): number => {
  let total = 0;
  for (let i = 1; i <= level; i++) {
    total += getXPForLevel(i);
  }
  return total;
};

/**
 * Calculate current level based on total XP
 */
export const calculateLevel = (totalXP: number): number => {
  let level = 1;
  let xpNeeded = LEVEL_CONFIG.BASE_XP;

  while (totalXP >= xpNeeded && level < LEVEL_CONFIG.MAX_LEVEL) {
    totalXP -= xpNeeded;
    level++;
    xpNeeded = getXPForLevel(level);
  }

  return level;
};

/**
 * Get progress percentage towards next level
 */
export const getLevelProgress = (totalXP: number): number => {
  const currentLevel = calculateLevel(totalXP);
  const currentLevelXP = getTotalXPForLevel(currentLevel);
  const nextLevelXP = getTotalXPForLevel(currentLevel + 1);

  const progress =
    ((totalXP - currentLevelXP) / (nextLevelXP - currentLevelXP)) * 100;
  return Math.min(Math.max(progress, 0), 100); // Ensure between 0-100
};
