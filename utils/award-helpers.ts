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

  // Get or create PrayerStats
  let prayerStats = await prisma.prayerStats.findUnique({
    where: { userId }
  });

  if (!prayerStats || isStatsOutdated(prayerStats.lastCalculated)) {
    // Fetch only recent prayers for performance
    const recentPrayers = await prisma.prays.findMany({
      where: { 
        userId,
        date: { gte: thirtyDaysAgo }
      },
      orderBy: { date: 'desc' },
    });

    // Update prayer stats
    prayerStats = await updatePrayerStats(userId, recentPrayers);
  }

  // Calculate current stats
  const stats: UserStats = {
    ...prayerStats,
    // Add calculated fields
    onTimePercentage: calculatePercentage(prayerStats.onTimePrayers, prayerStats.totalPrayers),
    earlyFajrPercentage: await calculateFajrPercentage(userId),
    // Add other calculated fields...
    totalPrayers: prayerStats.totalPrayers,
    totalDays: new Set(prayerStats.prayers.map((p) => p.date.toDateString())).size,
    currentStreak: prayerStats.currentStreak,
    daysWithAllPrayers: prayerStats.daysWithAllPrayers,
    consecutivePerfectDays: calculateConsecutivePerfectDays(prayerStats.prayers),
    onTimePrayers: prayerStats.onTimePrayers,
    jamaatCount: prayerStats.jamaatPrayers,
    monthlyTahajjudCount: calculateMonthlyTahajjud(prayerStats.prayers),
    consecutiveFajrDays: calculateConsecutiveFajrDays(prayerStats.prayers),
    fajrOnTimePercentage: await calculateFajrPercentage(userId),
    tahajjudCount: calculateTotalTahajjud(prayerStats.prayers),
    consecutiveTahajjudNights: calculateConsecutiveTahajjudNights(prayerStats.prayers),
    consecutiveSunnahDays: calculateConsecutiveSunnahDays(prayerStats.prayers),
    duhaCount: await prisma.sunnahPrays.count({ where: { userId, type: 'duha' } }),
    morningAdhkarDays: calculateAdhkarDays(prayerStats.dhikrRecords, 'morning'),
    eveningAdhkarDays: calculateAdhkarDays(prayerStats.dhikrRecords, 'evening'),
    consecutiveDhikrDays: calculateConsecutiveDhikrDays(prayerStats.dhikrRecords),
    weeklyQuranDays: calculateQuranDays(prayerStats.quranRecords, 7),
    monthlyQuranDays: calculateQuranDays(prayerStats.quranRecords, 30),
    ramadanPrayerCount: prayerStats.ramadanPrayerCount,
    ramadanPerfectDays: prayerStats.ramadanPerfectDays,
    lastTenNightsPrayers: calculateLastTenNightsPrayers(prayerStats.prayers),
    eidPrayersCount: calculateEidPrayers(prayerStats.prayers),
    consecutiveJumuahCount: calculateConsecutiveJumuah(prayerStats.prayers),
    menteeCount: prayerStats.menteeCount,
    prayerCircleMembers: prayerStats.prayerCircleMembers,
    learningSessionsCount: prayerStats.learningSessionsCount,
    helpedUsers: prayerStats.helpedUsers,
    monthlyMasjidVisits: calculateMasjidVisits(prayerStats.prayers, thirtyDaysAgo),
    dailyIstighfarCount: calculateDailyIstighfar(prayerStats.dhikrRecords),
    gratitudeDhikrCount: calculateGratitudeDhikr(prayerStats.dhikrRecords),
    sunnahAdherenceScore: calculateSunnahAdherence(prayerStats.prayers, prayerStats.sunnahPrayersCount),
    spiritualityScore: calculateSpiritualityScore(prayerStats.prayers, prayerStats.dhikrRecords, prayerStats.quranRecords),
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
    select: { title: true }
  });

  const existingAwardTitles = new Set(existingAwards.map(a => a.title));
  
  // Filter eligible awards
  const eligibleAwards = AWARDS.filter(award => 
    !existingAwardTitles.has(award.title) &&
    award.criteria(stats) &&
    award.requiredStats.every(stat => stats[stat] !== undefined)
  );

  if (eligibleAwards.length === 0) return [];

  // Calculate points for each award
  const awardsWithPoints = eligibleAwards.map(award => ({
    ...award,
    points: getAwardPoints(award.title)
  }));

  // Batch create new awards
  await prisma.$transaction([
    prisma.award.createMany({
      data: awardsWithPoints.map(award => ({
        userId,
        title: award.title,
        points: award.points,
        awardedAt: new Date()
      }))
    }),
    prisma.user.update({
      where: { id: userId },
      data: {
        totalPoints: {
          increment: awardsWithPoints.reduce((sum, award) => sum + award.points, 0)
        }
      }
    })
  ]);

  return eligibleAwards.map(award => award.title);
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
  if (title.includes('spiritual_excellence') || title.includes('prophetic_way')) {
    return AWARD_POINTS.MASTER;
  }
  
  // Default to regular points
  return AWARD_POINTS.REGULAR;
}

// Helper functions
function isStatsOutdated(lastCalculated: Date): boolean {
  const now = new Date();
  return now.getDate() !== lastCalculated.getDate() ||
         now.getMonth() !== lastCalculated.getMonth() ||
         now.getFullYear() !== lastCalculated.getFullYear();
}

async function updatePrayerStats(userId: string, prayers: any[]) {
  const stats = {
    totalPrayers: prayers.length,
    currentStreak: calculateCurrentStreak(prayers),
    daysWithAllPrayers: calculateDaysWithAllPrayers(prayers),
    onTimePrayers: prayers.filter(p => p.onTime).length,
    jamaatPrayers: prayers.filter(p => p.inJamaat).length,
    ramadanPrayerCount: calculateRamadanPrayerCount(prayers),
    ramadanPerfectDays: calculateRamadanPerfectDays(prayers),
    prayers,
    dhikrRecords: await prisma.dhikr.findMany({
      where: { userId, createdAt: { gte: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000) } },
    }),
    quranRecords: await prisma.quranReading.findMany({
      where: { userId, createdAt: { gte: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000) } },
    }),
    sunnahPrayersCount: await prisma.sunnahPrays.count({ where: { userId } }),
    menteeCount: await prisma.userCommunity.findUnique({
      where: { userId },
      select: { menteeCount: true },
    }).then((community) => community?.menteeCount || 0),
    prayerCircleMembers: await prisma.userCommunity.findUnique({
      where: { userId },
      select: { circleMembers: true },
    }).then((community) => community?.circleMembers || 0),
    learningSessionsCount: await prisma.userCommunity.findUnique({
      where: { userId },
      select: { learningSessions: true },
    }).then((community) => community?.learningSessions || 0),
    helpedUsers: await prisma.userCommunity.findUnique({
      where: { userId },
      select: { helpedUsers: true },
    }).then((community) => community?.helpedUsers || 0),
  };

  return prisma.prayerStats.upsert({
    where: { userId },
    create: {
      userId,
      ...stats,
      lastCalculated: new Date()
    },
    update: {
      ...stats,
      lastCalculated: new Date()
    }
  });
}

function calculatePercentage(value: number, total: number): number {
  return total > 0 ? (value / total) * 100 : 0;
}

async function calculateFajrPercentage(userId: string): Promise<number> {
  const fajrStats = await prisma.prays.aggregate({
    where: {
      userId,
      type: SALAHS.FAJR
    },
    _count: {
      id: true
    },
    _sum: {
      onTime: true
    }
  });

  return calculatePercentage(
    fajrStats._sum?.onTime || 0,
    fajrStats._count?.id || 0
  );
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

function calculateTotalTahajjud(prayers: any[]): number {
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

function calculateAdhkarDays(records: any[], type: string): number {
  // Implementation
  return 0;
}

function calculateConsecutiveDhikrDays(records: any[]): number {
  // Implementation
  return 0;
}

function calculateQuranDays(records: any[], days: number): number {
  // Implementation
  return 0;
}

function calculateLastTenNightsPrayers(prayers: any[]): number {
  // Implementation
  return 0;
}

function calculateEidPrayers(prayers: any[]): number {
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

function calculateDailyIstighfar(records: any[]): number {
  // Implementation
  return 0;
}

function calculateGratitudeDhikr(records: any[]): number {
  // Implementation
  return 0;
}

function calculateSunnahAdherence(prayers: any[], sunnahCount: number): number {
  // Implementation
  return 0;
}

function calculateSpiritualityScore(
  prayers: any[],
  dhikr: any[],
  quran: any[],
): number {
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

function calculateCurrentStreak(prayers: any[]): number {
  // Implementation
  return 0;
}

function calculateDaysWithAllPrayers(prayers: any[]): number {
  // Implementation
  return 0;
}