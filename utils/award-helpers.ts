
import { AWARDS } from '../constants/awards';
import { UserStats } from '../types/stats';
import { SALAHS } from '../constants/enums';
import prisma from '@/lib/prisma';

export async function calculateUserStats(userId: string): Promise<UserStats> {
  const today = new Date();
  const thirtyDaysAgo = new Date(today.getTime() - 30 * 24 * 60 * 60 * 1000);
  const ninetyDaysAgo = new Date(today.getTime() - 90 * 24 * 60 * 60 * 1000);

  // Fetch user's prayers
  const prayers = await prisma.prays.findMany({
    where: { userId },
    orderBy: { prayedAt: 'desc' },
  });

  // Calculate basic stats
  const totalPrayers = prayers.length;
  const uniqueDays = new Set(prayers.map(p => p.prayedAt.toDateString())).size;
  const currentStreak = calculateCurrentStreak(prayers);
  
  // Calculate prayer quality stats
  const onTimePrayers = prayers.filter(p => p.onTime).length;
  const onTimePercentage = totalPrayers > 0 ? (onTimePrayers / totalPrayers) * 100 : 0;
  const jamaatPrayers = prayers.filter(p => p.inJamaat).length;
  
  // Calculate Fajr stats
  const fajrPrayers = prayers.filter(p => p.type === SALAHS.FAJR);
  const onTimeFajr = fajrPrayers.filter(p => p.onTime).length;
  const earlyFajr = fajrPrayers.filter(p => p.earlyPrayer).length;
  const fajrPercentage = fajrPrayers.length > 0 ? (onTimeFajr / fajrPrayers.length) * 100 : 0;
  
  // Get Sunnah and additional prayers
  const sunnahPrayers = await prisma.sunnahPrays.count({ where: { userId } });
  const duhaPrayers = await prisma.sunnahPrays.count({
    where: { userId, type: 'duha' }
  });

  // Get Dhikr and Quran stats
  const dhikrRecords = await prisma.dhikr.findMany({
    where: { userId, createdAt: { gte: thirtyDaysAgo } }
  });
  const quranRecords = await prisma.quranReading.findMany({
    where: { userId, createdAt: { gte: thirtyDaysAgo } }
  });

  // Calculate Ramadan stats
  const ramadanPrayers = prayers.filter(p => isRamadan(p.prayedAt));
  const ramadanDays = calculateRamadanDays(ramadanPrayers);

  // Community stats
  const communityStats = await prisma.userCommunity.findUnique({
    where: { userId }
  });

  return {
    // Basic Stats
    totalPrayers,
    totalDays: uniqueDays,
    currentStreak,
    daysWithAllPrayers: calculateDaysWithAllPrayers(prayers),
    consecutivePerfectDays: calculateConsecutivePerfectDays(prayers),

    // Prayer Quality
    onTimePercentage,
    jamaatCount: jamaatPrayers,
    monthlyTahajjudCount: calculateMonthlyTahajjud(prayers),

    // Fajr Stats
    consecutiveFajrDays: calculateConsecutiveFajrDays(prayers),
    earlyFajrPercentage: fajrPrayers.length > 0 ? (earlyFajr / fajrPrayers.length) * 100 : 0,
    fajrOnTimePercentage: fajrPercentage,
    tahajjudCount: calculateTotalTahajjud(prayers),
    consecutiveTahajjudNights: calculateConsecutiveTahajjudNights(prayers),

    // Sunnah & Additional Prayers
    sunnahPrayersCount: sunnahPrayers,
    consecutiveSunnahDays: calculateConsecutiveSunnahDays(prayers),
    duhaCount: duhaPrayers,

    // Dhikr & Quran
    morningAdhkarDays: calculateAdhkarDays(dhikrRecords, 'morning'),
    eveningAdhkarDays: calculateAdhkarDays(dhikrRecords, 'evening'),
    consecutiveDhikrDays: calculateConsecutiveDhikrDays(dhikrRecords),
    weeklyQuranDays: calculateQuranDays(quranRecords, 7),
    monthlyQuranDays: calculateQuranDays(quranRecords, 30),

    // Ramadan & Special Times
    ramadanPrayerCount: ramadanPrayers.length,
    ramadanPerfectDays: ramadanDays.perfect,
    lastTenNightsPrayers: calculateLastTenNightsPrayers(prayers),
    eidPrayersCount: calculateEidPrayers(prayers),
    consecutiveJumuahCount: calculateConsecutiveJumuah(prayers),

    // Community & Learning
    menteeCount: communityStats?.menteeCount || 0,
    prayerCircleMembers: communityStats?.circleMembers || 0,
    learningSessionsCount: communityStats?.learningSessions || 0,
    helpedUsers: communityStats?.helpedUsers || 0,

    // Spiritual Progress
    monthlyMasjidVisits: calculateMasjidVisits(prayers, thirtyDaysAgo),
    dailyIstighfarCount: calculateDailyIstighfar(dhikrRecords),
    gratitudeDhikrCount: calculateGratitudeDhikr(dhikrRecords),
    sunnahAdherenceScore: calculateSunnahAdherence(prayers, sunnahPrayers),
    spiritualityScore: calculateSpiritualityScore(prayers, dhikrRecords, quranRecords),
  };
}

export async function checkAndAssignAwards(userId: string): Promise<string[]> {
  const stats = await calculateUserStats(userId);
  const existingAwards = await prisma.userAwards.findMany({
    where: { userId },
    select: { title: true }
  });
  
  const existingAwardTitles = new Set(existingAwards.map(a => a.title));
  
  const newAwards = AWARDS.filter(award => 
    !existingAwardTitles.has(award.title) && 
    award.criteria(stats) && 
    award.requiredStats.every(stat => stats[stat] !== undefined)
  );

  if (newAwards.length > 0) {
    await prisma.userAwards.createMany({
      data: newAwards.map(award => ({
        userId,
        title: award.title,
        awardedAt: new Date()
      }))
    });
  }

  return newAwards.map(award => award.title);
}

// Helper functions for stats calculation
function calculateCurrentStreak(prayers: any[]): number {
  // Implementation
  return 0;
}

function calculateDaysWithAllPrayers(prayers: any[]): number {
  // Implementation
  return 0;
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

function calculateSpiritualityScore(prayers: any[], dhikr: any[], quran: any[]): number {
  // Implementation
  return 0;
}

function calculateRamadanDays(prayers: any[]): { total: number; perfect: number } {
  // Implementation
  return { total: 0, perfect: 0 };
}

function isRamadan(date: Date): boolean {
  // Implementation
  return false;
}
