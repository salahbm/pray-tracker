import { UserStats } from '@/types/stats';
import { AWARDS } from '../constants/awards';
import { SALAHS, AWARD_POINTS } from '../constants/enums';
import prisma from '@/lib/prisma';

// Cache for stats to avoid recalculating within the same day
const statsCache = new Map<string, { stats: UserStats; timestamp: number }>();
const CACHE_DURATION = 24 * 60 * 60 * 1000; // 24 hours

export async function calculateUserStats(userId: string): Promise<UserStats> {
  // Check cache first
  const cached = statsCache.get(userId);
  if (cached && Date.now() - cached.timestamp < CACHE_DURATION) {
    return cached.stats;
  }

  const today = new Date();
  const thirtyDaysAgo = new Date(today.getTime() - 30 * 24 * 60 * 60 * 1000);

  // Get all prayers for the user
  const prayers = await prisma.prays.findMany({
    where: {
      userId,
      date: { gte: thirtyDaysAgo },
    },
    orderBy: { date: 'desc' },
  });

  // Get or create PrayerStats
  let prayerStats = await prisma.prayerStats.findUnique({
    where: { userId },
  });

  if (!prayerStats || isStatsOutdated(prayerStats.lastCalculated)) {
    // Update prayer stats
    prayerStats = await updatePrayerStats(userId, prayers);
  }

  // Calculate current stats
  const stats: UserStats = {
    totalPrayers: prayerStats.totalPrayers,
    totalDays: new Set(prayers.map((p) => p.date.toDateString())).size,
    currentStreak: prayerStats.currentStreak,
    longestStreak: prayerStats.longestStreak,
    daysWithAllPrayers: prayerStats.daysWithAllPrayers,
    onTimePercentage: prayerStats.onTimePercentage,
    jamaatCount: prayerStats.jamaatCount,
    monthlyTahajjudCount: calculateMonthlyTahajjud(prayers),
    consecutiveFajrDays: calculateConsecutiveFajrDays(prayers),
    earlyFajrPercentage: prayerStats.earlyFajrPercentage,
    fajrOnTimePercentage: prayerStats.fajrOnTimePercentage,
    tahajjudCount: prayerStats.tahajjudCount,
    consecutiveTahajjudNights: calculateConsecutiveTahajjudNights(prayers),
    sunnahPrayers: prayerStats.sunnahPrayers,
    consecutiveSunnahDays: calculateConsecutiveSunnahDays(prayers),
    duhaCount: prayerStats.duhaCount,
    morningAdhkarDays: 0, // To be implemented
    eveningAdhkarDays: 0, // To be implemented
    consecutiveDhikrDays: 0, // To be implemented
    weeklyQuranDays: 0, // To be implemented
    monthlyQuranDays: 0, // To be implemented
    ramadanPrayerCount: calculateRamadanPrayerCount(prayers),
    ramadanPerfectDays: calculateRamadanPerfectDays(prayers),
    lastTenNightsPrayers: calculateLastTenNightsPrayers(prayers),
    eidPrayersCount: prayerStats.eidPrayersCount,
    consecutiveJumuahCount: calculateConsecutiveJumuah(prayers),
    menteeCount: 0, // To be implemented
    prayerCircleMembers: 0, // To be implemented
    learningSessionsCount: 0, // To be implemented
    helpedUsers: 0, // To be implemented
    monthlyMasjidVisits: calculateMasjidVisits(prayers, thirtyDaysAgo),
    dailyIstighfarCount: 0, // To be implemented
    gratitudeDhikrCount: 0, // To be implemented
    sunnahAdherenceScore: calculateSunnahAdherence(prayers, prayerStats.sunnahPrayers),
    spiritualityScore: 0, // To be implemented
    consecutivePerfectDays: calculateConsecutivePerfectDays(prayers),
  };

  // Cache the results
  statsCache.set(userId, { stats, timestamp: Date.now() });

  return stats;
}

export async function checkAndAssignAwards(userId: string): Promise<string[]> {
  const stats = await calculateUserStats(userId);

  // Batch fetch existing awards
  const existingAwards = await prisma.award.findMany({
    where: { userId },
    select: { title: true },
  });

  const existingAwardTitles = new Set(existingAwards.map((a) => a.title));

  // Filter eligible awards
  const eligibleAwards = AWARDS.filter(
    (award) =>
      !existingAwardTitles.has(award.title) &&
      award.criteria(stats) &&
      award.requiredStats.every((stat) => stats[stat] !== undefined),
  );

  if (eligibleAwards.length === 0) return [];

  // Calculate points for each award
  const awardsWithPoints = eligibleAwards.map((award) => ({
    ...award,
    points: getAwardPoints(award.title),
  }));

  // Batch create new awards
  await prisma.$transaction([
    prisma.award.createMany({
      data: awardsWithPoints.map((award) => ({
        userId,
        title: award.title,
        points: award.points,
        awardedAt: new Date(),
      })),
    }),
    prisma.user.update({
      where: { id: userId },
      data: {
        totalPoints: {
          increment: awardsWithPoints.reduce(
            (sum, award) => sum + award.points,
            0,
          ),
        },
      },
    }),
  ]);

  return eligibleAwards.map((award) => award.title);
}

// Helper function to determine award points
function getAwardPoints(title: string): number {
  // First Steps Awards
  if (title.startsWith('first_')) {
    return AWARD_POINTS.BASIC;
  }

  // Regular Achievements
  if (title.startsWith('fifty_') || title.startsWith('hundred_')) {
    return AWARD_POINTS.REGULAR;
  }

  // Advanced Achievements
  if (title.includes('streak') || title.includes('master')) {
    return AWARD_POINTS.ADVANCED;
  }

  // Expert Achievements
  if (title.includes('perfect_month') || title.includes('devotee')) {
    return AWARD_POINTS.EXPERT;
  }

  // Master Achievements
  if (
    title.includes('spiritual_excellence') ||
    title.includes('prophetic_way')
  ) {
    return AWARD_POINTS.MASTER;
  }

  // Default to regular points
  return AWARD_POINTS.REGULAR;
}

// Helper functions
function isStatsOutdated(lastCalculated: Date): boolean {
  const now = new Date();
  return (
    now.getDate() !== lastCalculated.getDate() ||
    now.getMonth() !== lastCalculated.getMonth() ||
    now.getFullYear() !== lastCalculated.getFullYear()
  );
}

async function updatePrayerStats(userId: string, prayers: any[]) {
  // Calculate basic stats
  const totalPrayers = prayers.reduce((sum, p) => 
    sum + p.fajr + p.dhuhr + p.asr + p.maghrib + p.isha + p.nafl, 0);

  const daysWithAllPrayers = prayers.filter(p => 
    p.fajr > 0 && p.dhuhr > 0 && p.asr > 0 && p.maghrib > 0 && p.isha > 0
  ).length;

  // Calculate on-time percentages
  const onTimeCount = prayers.reduce((sum, p) => 
    sum + (p.fajr === 2 ? 1 : 0) + (p.dhuhr === 2 ? 1 : 0) + 
    (p.asr === 2 ? 1 : 0) + (p.maghrib === 2 ? 1 : 0) + (p.isha === 2 ? 1 : 0), 0);
  
  const onTimePercentage = totalPrayers > 0 ? (onTimeCount / totalPrayers) * 100 : 0;

  // Calculate Jamaat prayers
  const jamaatCount = prayers.reduce((sum, p) => 
    sum + (p.fajr === 3 ? 1 : 0) + (p.dhuhr === 3 ? 1 : 0) + 
    (p.asr === 3 ? 1 : 0) + (p.maghrib === 3 ? 1 : 0) + (p.isha === 3 ? 1 : 0), 0);

  // Calculate Fajr-specific stats
  const fajrPrayers = prayers.filter(p => p.fajr > 0).length;
  const fajrOnTime = prayers.filter(p => p.fajr >= 2).length;
  const earlyFajr = prayers.filter(p => p.fajr === 2).length;
  const fajrOnTimePercentage = fajrPrayers > 0 ? (fajrOnTime / fajrPrayers) * 100 : 0;
  const earlyFajrPercentage = fajrPrayers > 0 ? (earlyFajr / fajrPrayers) * 100 : 0;

  // Calculate streaks
  const currentStreak = calculateCurrentStreak(prayers);
  const longestStreak = Math.max(currentStreak, prayers[0]?.longestStreak || 0);

  // Update PrayerStats
  return await prisma.prayerStats.upsert({
    where: { userId },
    create: {
      userId,
      totalPrayers,
      currentStreak,
      longestStreak,
      daysWithAllPrayers,
      onTimePercentage,
      jamaatCount,
      sunnahPrayers: prayers.reduce((sum, p) => sum + (p.nafl || 0), 0),
      duhaCount: 0, // To be implemented with SunnahPrays
      tahajjudCount: prayers.filter(p => p.nafl > 0).length,
      fajrOnTimePercentage,
      earlyFajrPercentage,
      ramadanPrayerCount: calculateRamadanPrayerCount(prayers),
      ramadanPerfectDays: calculateRamadanPerfectDays(prayers),
      lastTenNightsPrayers: calculateLastTenNightsPrayers(prayers),
      eidPrayersCount: 0, // To be implemented
      jumuahCount: 0, // To be implemented
      masjidVisits: jamaatCount, // Using jamaat prayers as a proxy for masjid visits
      lastCalculated: new Date(),
    },
    update: {
      totalPrayers,
      currentStreak,
      longestStreak,
      daysWithAllPrayers,
      onTimePercentage,
      jamaatCount,
      sunnahPrayers: prayers.reduce((sum, p) => sum + (p.nafl || 0), 0),
      duhaCount: 0, // To be implemented with SunnahPrays
      tahajjudCount: prayers.filter(p => p.nafl > 0).length,
      fajrOnTimePercentage,
      earlyFajrPercentage,
      ramadanPrayerCount: calculateRamadanPrayerCount(prayers),
      ramadanPerfectDays: calculateRamadanPerfectDays(prayers),
      lastTenNightsPrayers: calculateLastTenNightsPrayers(prayers),
      eidPrayersCount: 0, // To be implemented
      jumuahCount: 0, // To be implemented
      masjidVisits: jamaatCount, // Using jamaat prayers as a proxy for masjid visits
      lastCalculated: new Date(),
    },
  });
}

function calculateCurrentStreak(prayers: any[]): number {
  if (!prayers.length) return 0;

  let streak = 0;
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  // Sort prayers by date in descending order
  const sortedPrayers = [...prayers].sort((a, b) => 
    new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  // Check if the most recent prayer was today or yesterday
  const mostRecentDate = new Date(sortedPrayers[0].date);
  mostRecentDate.setHours(0, 0, 0, 0);
  const daysDiff = Math.floor((today.getTime() - mostRecentDate.getTime()) / (1000 * 60 * 60 * 24));
  
  if (daysDiff > 1) return 0; // Streak is broken if more than 1 day gap

  // Count consecutive days with all prayers
  let currentDate = mostRecentDate;
  for (const prayer of sortedPrayers) {
    const prayerDate = new Date(prayer.date);
    prayerDate.setHours(0, 0, 0, 0);

    if (currentDate.getTime() !== prayerDate.getTime()) {
      // Check if this is the next consecutive day
      const expectedPrevDate = new Date(currentDate);
      expectedPrevDate.setDate(expectedPrevDate.getDate() - 1);
      
      if (prayerDate.getTime() !== expectedPrevDate.getTime()) {
        break; // Streak is broken
      }
      currentDate = prayerDate;
    }

    // Check if all prayers were performed
    if (prayer.fajr > 0 && prayer.dhuhr > 0 && prayer.asr > 0 && 
        prayer.maghrib > 0 && prayer.isha > 0) {
      streak++;
    } else {
      break; // Streak is broken if any prayer is missed
    }
  }

  return streak;
}

function calculateDaysWithAllPrayers(prayers: any[]): number {
  if (!prayers.length) return 0;

  return prayers.filter(
    prayer => 
      prayer.fajr && 
      prayer.dhuhr && 
      prayer.asr && 
      prayer.maghrib && 
      prayer.isha
  ).length;
}

function calculatePercentage(value: number, total: number): number {
  if (total === 0 || value === 0) return 0;
  return Math.round((value / total) * 100);
}

async function calculateFajrPercentage(userId: string): Promise<number> {
  const fajrStats = await prisma.prays.aggregate({
    _count: {
      fajr: true,
    },
    _sum: {
      fajr: true,
    },
    where: {
      userId,
      fajr: {
        gt: 0  // Count only days where Fajr was prayed
      }
    }
  });

  // Calculate percentage of on-time or jamaat prayers (values 2 or 3)
  const totalFajr = fajrStats._count.fajr || 0;
  const fajrPoints = fajrStats._sum.fajr || 0;
  
  // If no prayers, return 0
  if (totalFajr === 0) return 0;

  // Calculate percentage of on-time/jamaat prayers (values 2 or 3)
  // Each prayer worth 1 point, on-time worth 2, jamaat worth 3
  const onTimeOrJamaatCount = fajrPoints - totalFajr;
  return Math.round((onTimeOrJamaatCount / totalFajr) * 100);
}

function calculateConsecutivePerfectDays(prayers: any[]): number {
  // Implementation
  return 0;
}

function calculateMonthlyTahajjud(prayers: any[]): number {
  // Implementation
  return 0;
}

function calculateConsecutiveFajrDays(prayers: any[]): number {
  // Implementation
  return 0;
}



function calculateConsecutiveTahajjudNights(prayers: any[]): number {
  // Implementation
  return 0;
}

function calculateConsecutiveSunnahDays(prayers: any[]): number {
  // Implementation
  return 0;
}


function calculateLastTenNightsPrayers(prayers: any[]): number {
  // Implementation
  return 0;
}


function calculateConsecutiveJumuah(prayers: any[]): number {
  // Implementation
  return 0;
}

function calculateMasjidVisits(prayers: any[], since: Date): number {
  // Implementation
  return 0;
}

function calculateSunnahAdherence(prayers: any[], sunnahCount: number): number {
  // Implementation
  return 0;
}



function calculateRamadanPrayerCount(prayers: any[]): number {
  // Implementation
  return 0;
}

function calculateRamadanPerfectDays(prayers: any[]): number {
  // Implementation
  return 0;
}
