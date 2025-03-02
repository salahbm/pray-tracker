import { UserStats } from '@/types/stats';
import { AWARD_TITLES } from './enums';

interface Award {
  title: AWARD_TITLES;
  requiredStats: (keyof UserStats)[];
  criteria: (stats: UserStats) => boolean;
}

export const AWARDS: Award[] = [
  // First Steps Awards
  {
    title: AWARD_TITLES.FIRST_PRAYER,
    requiredStats: ['totalPrayers'],
    criteria: (stats) => stats.totalPrayers >= 1,
  },
  {
    title: AWARD_TITLES.FIRST_FULL_DAY,
    requiredStats: ['daysWithAllPrayers'],
    criteria: (stats) => stats.daysWithAllPrayers >= 1,
  },
  {
    title: AWARD_TITLES.FIRST_WEEK,
    requiredStats: ['totalDays'],
    criteria: (stats) => stats.totalDays >= 7,
  },
  {
    title: AWARD_TITLES.FIRST_MONTH,
    requiredStats: ['totalDays'],
    criteria: (stats) => stats.totalDays >= 30,
  },

  // Streak Awards
  {
    title: AWARD_TITLES.SEVEN_DAY_STREAK,
    requiredStats: ['currentStreak'],
    criteria: (stats) => stats.currentStreak >= 7,
  },
  {
    title: AWARD_TITLES.FIFTEEN_DAY_STREAK,
    requiredStats: ['currentStreak'],
    criteria: (stats) => stats.currentStreak >= 15,
  },
  {
    title: AWARD_TITLES.THIRTY_DAY_STREAK,
    requiredStats: ['currentStreak'],
    criteria: (stats) => stats.currentStreak >= 30,
  },
  {
    title: AWARD_TITLES.SIXTY_DAY_STREAK,
    requiredStats: ['currentStreak'],
    criteria: (stats) => stats.currentStreak >= 60,
  },
  {
    title: AWARD_TITLES.NINETY_DAY_STREAK,
    requiredStats: ['currentStreak'],
    criteria: (stats) => stats.currentStreak >= 90,
  },
  {
    title: AWARD_TITLES.PERFECT_WEEK,
    requiredStats: ['consecutivePerfectDays'],
    criteria: (stats) => stats.consecutivePerfectDays >= 7,
  },
  {
    title: AWARD_TITLES.PERFECT_MONTH,
    requiredStats: ['consecutivePerfectDays'],
    criteria: (stats) => stats.consecutivePerfectDays >= 30,
  },

  // Prayer Count Awards
  {
    title: AWARD_TITLES.FIFTY_PRAYERS,
    requiredStats: ['totalPrayers'],
    criteria: (stats) => stats.totalPrayers >= 50,
  },
  {
    title: AWARD_TITLES.HUNDRED_PRAYERS,
    requiredStats: ['totalPrayers'],
    criteria: (stats) => stats.totalPrayers >= 100,
  },
  {
    title: AWARD_TITLES.FIVE_HUNDRED_PRAYERS,
    requiredStats: ['totalPrayers'],
    criteria: (stats) => stats.totalPrayers >= 500,
  },
  {
    title: AWARD_TITLES.THOUSAND_PRAYERS,
    requiredStats: ['totalPrayers'],
    criteria: (stats) => stats.totalPrayers >= 1000,
  },
  {
    title: AWARD_TITLES.TWO_THOUSAND_PRAYERS,
    requiredStats: ['totalPrayers'],
    criteria: (stats) => stats.totalPrayers >= 2000,
  },
  {
    title: AWARD_TITLES.FIVE_THOUSAND_PRAYERS,
    requiredStats: ['totalPrayers'],
    criteria: (stats) => stats.totalPrayers >= 5000,
  },

  // Fajr Excellence Awards
  {
    title: AWARD_TITLES.FAJR_MASTER,
    requiredStats: ['consecutiveFajrDays'],
    criteria: (stats) => stats.consecutiveFajrDays >= 30,
  },
  {
    title: AWARD_TITLES.EARLY_BIRD,
    requiredStats: ['earlyFajrPercentage'],
    criteria: (stats) => stats.earlyFajrPercentage >= 80,
  },
  {
    title: AWARD_TITLES.DAWN_SEEKER,
    requiredStats: ['fajrOnTimePercentage'],
    criteria: (stats) => stats.fajrOnTimePercentage >= 90,
  },
  {
    title: AWARD_TITLES.TAHAJJUD_WARRIOR,
    requiredStats: ['tahajjudCount'],
    criteria: (stats) => stats.tahajjudCount >= 20,
  },

  // Prayer Quality Awards
  {
    title: AWARD_TITLES.PUNCTUAL_WORSHIPPER,
    requiredStats: ['onTimePercentage'],
    criteria: (stats) => stats.onTimePercentage >= 90,
  },
  {
    title: AWARD_TITLES.JAMAAT_REGULAR,
    requiredStats: ['jamaatCount'],
    criteria: (stats) => stats.jamaatCount >= 50,
  },
  {
    title: AWARD_TITLES.JAMAAT_DEVOTEE,
    requiredStats: ['jamaatCount'],
    criteria: (stats) => stats.jamaatCount >= 100,
  },
  {
    title: AWARD_TITLES.DEDICATED_TAHAJJUD,
    requiredStats: ['monthlyTahajjudCount'],
    criteria: (stats) => stats.monthlyTahajjudCount >= 15,
  },

  // Sunnah Excellence Awards
  {
    title: AWARD_TITLES.SUNNAH_BEGINNER,
    requiredStats: ['sunnahPrayersCount'],
    criteria: (stats) => stats.sunnahPrayersCount >= 30,
  },
  {
    title: AWARD_TITLES.SUNNAH_DEVOTEE,
    requiredStats: ['consecutiveSunnahDays'],
    criteria: (stats) => stats.consecutiveSunnahDays >= 30,
  },
  {
    title: AWARD_TITLES.SUNNAH_MASTER,
    requiredStats: ['consecutiveSunnahDays'],
    criteria: (stats) => stats.consecutiveSunnahDays >= 90,
  },
  {
    title: AWARD_TITLES.DUHA_REGULAR,
    requiredStats: ['duhaCount'],
    criteria: (stats) => stats.duhaCount >= 20,
  },

  // Dhikr & Quran Awards
  {
    title: AWARD_TITLES.MORNING_ADHKAR,
    requiredStats: ['morningAdhkarDays'],
    criteria: (stats) => stats.morningAdhkarDays >= 30,
  },
  {
    title: AWARD_TITLES.EVENING_ADHKAR,
    requiredStats: ['eveningAdhkarDays'],
    criteria: (stats) => stats.eveningAdhkarDays >= 30,
  },
  {
    title: AWARD_TITLES.CONSISTENT_DHIKR,
    requiredStats: ['consecutiveDhikrDays'],
    criteria: (stats) => stats.consecutiveDhikrDays >= 30,
  },
  {
    title: AWARD_TITLES.QURAN_COMPANION,
    requiredStats: ['weeklyQuranDays'],
    criteria: (stats) => stats.weeklyQuranDays >= 7,
  },
  {
    title: AWARD_TITLES.QURAN_DEVOTEE,
    requiredStats: ['monthlyQuranDays'],
    criteria: (stats) => stats.monthlyQuranDays >= 30,
  },

  // Special Times Awards
  {
    title: AWARD_TITLES.RAMADAN_WARRIOR,
    requiredStats: ['ramadanPrayerCount'],
    criteria: (stats) => stats.ramadanPrayerCount >= 150,
  },
  {
    title: AWARD_TITLES.RAMADAN_CHAMPION,
    requiredStats: ['ramadanPerfectDays'],
    criteria: (stats) => stats.ramadanPerfectDays >= 30,
  },
  {
    title: AWARD_TITLES.LAYLATUL_QADR,
    requiredStats: ['lastTenNightsPrayers'],
    criteria: (stats) => stats.lastTenNightsPrayers >= 50,
  },
  {
    title: AWARD_TITLES.EID_PRAYERS,
    requiredStats: ['eidPrayersCount'],
    criteria: (stats) => stats.eidPrayersCount >= 2,
  },
  {
    title: AWARD_TITLES.JUMUAH_REGULAR,
    requiredStats: ['consecutiveJumuahCount'],
    criteria: (stats) => stats.consecutiveJumuahCount >= 4,
  },

  // Community & Growth Awards
  {
    title: AWARD_TITLES.PRAYER_MENTOR,
    requiredStats: ['menteeCount'],
    criteria: (stats) => stats.menteeCount >= 1,
  },
  {
    title: AWARD_TITLES.COMMUNITY_BUILDER,
    requiredStats: ['prayerCircleMembers'],
    criteria: (stats) => stats.prayerCircleMembers >= 5,
  },
  {
    title: AWARD_TITLES.KNOWLEDGE_SEEKER,
    requiredStats: ['learningSessionsCount'],
    criteria: (stats) => stats.learningSessionsCount >= 10,
  },
  {
    title: AWARD_TITLES.SPIRITUAL_GUIDE,
    requiredStats: ['helpedUsers'],
    criteria: (stats) => stats.helpedUsers >= 10,
  },

  // Milestone Awards
  {
    title: AWARD_TITLES.THREE_MONTH_MILESTONE,
    requiredStats: ['totalDays'],
    criteria: (stats) => stats.totalDays >= 90,
  },
  {
    title: AWARD_TITLES.SIX_MONTH_MILESTONE,
    requiredStats: ['totalDays'],
    criteria: (stats) => stats.totalDays >= 180,
  },
  {
    title: AWARD_TITLES.SPIRITUAL_MILESTONE,
    requiredStats: ['totalDays'],
    criteria: (stats) => stats.totalDays >= 365,
  },
  {
    title: AWARD_TITLES.TWO_YEAR_DEVOTION,
    requiredStats: ['totalDays'],
    criteria: (stats) => stats.totalDays >= 730,
  },

  // Special Achievement Awards
  {
    title: AWARD_TITLES.NIGHT_DEVOTEE,
    requiredStats: ['consecutiveTahajjudNights'],
    criteria: (stats) => stats.consecutiveTahajjudNights >= 10,
  },
  {
    title: AWARD_TITLES.MASJID_REGULAR,
    requiredStats: ['monthlyMasjidVisits'],
    criteria: (stats) => stats.monthlyMasjidVisits >= 20,
  },
  {
    title: AWARD_TITLES.ISTIGHFAR_CONSTANT,
    requiredStats: ['dailyIstighfarCount'],
    criteria: (stats) => stats.dailyIstighfarCount >= 100,
  },
  {
    title: AWARD_TITLES.GRATITUDE_MASTER,
    requiredStats: ['gratitudeDhikrCount'],
    criteria: (stats) => stats.gratitudeDhikrCount >= 1000,
  },
  {
    title: AWARD_TITLES.PROPHETIC_WAY,
    requiredStats: ['sunnahAdherenceScore'],
    criteria: (stats) => stats.sunnahAdherenceScore >= 90,
  },
  {
    title: AWARD_TITLES.SPIRITUAL_EXCELLENCE,
    requiredStats: ['spiritualityScore'],
    criteria: (stats) => stats.spiritualityScore >= 95,
  },
];

export default AWARDS;
