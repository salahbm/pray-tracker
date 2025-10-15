import { UserStats } from '@/types/stats';

interface Award {
  title: string;
  category: string;
  requiredStats: (keyof UserStats)[];
  criteria: (stats: UserStats) => boolean;
}

export const AWARDS: Award[] = [
  // First Steps
  {
    title: 'first_prayer',
    category: 'first',
    requiredStats: ['totalPrayers'],
    criteria: (stats) => stats.totalPrayers > 0,
  },
  {
    title: 'first_full_day',
    category: 'first',
    requiredStats: ['daysWithAllPrayers'],
    criteria: (stats) => stats.daysWithAllPrayers > 0,
  },
  {
    title: 'first_week',
    category: 'first',
    requiredStats: ['totalDays'],
    criteria: (stats) => stats.totalDays >= 7,
  },
  {
    title: 'first_month',
    category: 'first',
    requiredStats: ['totalDays'],
    criteria: (stats) => stats.totalDays >= 30,
  },

  // Prayer Streaks
  {
    title: 'seven_day_streak',
    category: 'streak',
    requiredStats: ['currentStreak'],
    criteria: (stats) => stats.currentStreak >= 7,
  },
  {
    title: 'fifteen_day_streak',
    category: 'streak',
    requiredStats: ['currentStreak'],
    criteria: (stats) => stats.currentStreak >= 15,
  },
  {
    title: 'thirty_day_streak',
    category: 'streak',
    requiredStats: ['currentStreak'],
    criteria: (stats) => stats.currentStreak >= 30,
  },
  {
    title: 'sixty_day_streak',
    category: 'streak',
    requiredStats: ['currentStreak'],
    criteria: (stats) => stats.currentStreak >= 60,
  },
  {
    title: 'ninety_day_streak',
    category: 'streak',
    requiredStats: ['currentStreak'],
    criteria: (stats) => stats.currentStreak >= 90,
  },
  {
    title: 'perfect_week',
    category: 'streak',
    requiredStats: ['daysWithAllPrayers', 'onTimePercentage'],
    criteria: (stats) =>
      stats.daysWithAllPrayers >= 7 && stats.onTimePercentage >= 90,
  },
  {
    title: 'perfect_month',
    category: 'streak',
    requiredStats: ['daysWithAllPrayers', 'onTimePercentage'],
    criteria: (stats) =>
      stats.daysWithAllPrayers >= 30 && stats.onTimePercentage >= 90,
  },

  // Prayer Milestones
  {
    title: 'fifty_prayers',
    category: 'prayer_count',
    requiredStats: ['totalPrayers'],
    criteria: (stats) => stats.totalPrayers >= 50,
  },
  {
    title: 'hundred_prayers',
    category: 'prayer_count',
    requiredStats: ['totalPrayers'],
    criteria: (stats) => stats.totalPrayers >= 100,
  },
  {
    title: 'five_hundred_prayers',
    category: 'prayer_count',
    requiredStats: ['totalPrayers'],
    criteria: (stats) => stats.totalPrayers >= 500,
  },
  {
    title: 'thousand_prayers',
    category: 'prayer_count',
    requiredStats: ['totalPrayers'],
    criteria: (stats) => stats.totalPrayers >= 1000,
  },
  {
    title: 'two_thousand_prayers',
    category: 'prayer_count',
    requiredStats: ['totalPrayers'],
    criteria: (stats) => stats.totalPrayers >= 2000,
  },
  {
    title: 'five_thousand_prayers',
    category: 'prayer_count',
    requiredStats: ['totalPrayers'],
    criteria: (stats) => stats.totalPrayers >= 5000,
  },

  // Fajr Excellence
  {
    title: 'fajr_master',
    category: 'fajr',
    requiredStats: ['consecutiveFajrDays'],
    criteria: (stats) => stats.consecutiveFajrDays >= 30,
  },
  {
    title: 'early_bird',
    category: 'fajr',
    requiredStats: ['earlyFajrPercentage'],
    criteria: (stats) => stats.earlyFajrPercentage >= 80,
  },
  {
    title: 'dawn_seeker',
    category: 'fajr',
    requiredStats: ['fajrOnTimePercentage'],
    criteria: (stats) => stats.fajrOnTimePercentage >= 90,
  },
  {
    title: 'tahajjud_warrior',
    category: 'fajr',
    requiredStats: ['tahajjudCount'],
    criteria: (stats) => stats.tahajjudCount >= 30,
  },

  // Prayer Quality
  {
    title: 'punctual_worshipper',
    category: 'prayer_quality',
    requiredStats: ['onTimePercentage'],
    criteria: (stats) => stats.onTimePercentage >= 90,
  },
  {
    title: 'jamaat_regular',
    category: 'prayer_quality',
    requiredStats: ['jamaatCount'],
    criteria: (stats) => stats.jamaatCount >= 50,
  },
  {
    title: 'jamaat_devotee',
    category: 'prayer_quality',
    requiredStats: ['jamaatCount'],
    criteria: (stats) => stats.jamaatCount >= 100,
  },
  {
    title: 'dedicated_tahajjud',
    category: 'prayer_quality',
    requiredStats: ['monthlyTahajjudCount'],
    criteria: (stats) => stats.monthlyTahajjudCount >= 15,
  },

  // Special Times
  {
    title: 'ramadan_warrior',
    category: 'special_times',
    requiredStats: ['ramadanPrayerCount'],
    criteria: (stats) => stats.ramadanPrayerCount >= 150,
  },
  {
    title: 'ramadan_champion',
    category: 'special_times',
    requiredStats: ['ramadanPerfectDays'],
    criteria: (stats) => stats.ramadanPerfectDays >= 30,
  },
  {
    title: 'laylatul_qadr',
    category: 'special_times',
    requiredStats: ['lastTenNightsPrayers'],
    criteria: (stats) => stats.lastTenNightsPrayers >= 50,
  },
  {
    title: 'eid_prayers',
    category: 'special_times',
    requiredStats: ['eidPrayersCount'],
    criteria: (stats) => stats.eidPrayersCount >= 2,
  },
  {
    title: 'jumuah_regular',
    category: 'special_times',
    requiredStats: ['consecutiveJumuahCount'],
    criteria: (stats) => stats.consecutiveJumuahCount >= 4,
  },

  // Community
  {
    title: 'prayer_mentor',
    category: 'community',
    requiredStats: ['menteeCount'],
    criteria: (stats) => stats.menteeCount >= 1,
  },
  {
    title: 'community_builder',
    category: 'community',
    requiredStats: ['prayerCircleMembers'],
    criteria: (stats) => stats.prayerCircleMembers >= 5,
  },
  {
    title: 'knowledge_seeker',
    category: 'community',
    requiredStats: ['learningSessionsCount'],
    criteria: (stats) => stats.learningSessionsCount >= 5,
  },
  {
    title: 'spiritual_guide',
    category: 'community',
    requiredStats: ['helpedUsers'],
    criteria: (stats) => stats.helpedUsers >= 10,
  },

  // Journey Milestones
  {
    title: 'three_month_milestone',
    category: 'milestone',
    requiredStats: ['totalDays'],
    criteria: (stats) => stats.totalDays >= 90,
  },
  {
    title: 'six_month_milestone',
    category: 'milestone',
    requiredStats: ['totalDays'],
    criteria: (stats) => stats.totalDays >= 180,
  },
  {
    title: 'spiritual_milestone',
    category: 'milestone',
    requiredStats: ['totalDays'],
    criteria: (stats) => stats.totalDays >= 365,
  },
  {
    title: 'two_year_devotion',
    category: 'milestone',
    requiredStats: ['totalDays'],
    criteria: (stats) => stats.totalDays >= 730,
  },

  // Special Achievements
  {
    title: 'night_devotee',
    category: 'special',
    requiredStats: ['consecutiveTahajjudNights'],
    criteria: (stats) => stats.consecutiveTahajjudNights >= 10,
  },
  {
    title: 'masjid_regular',
    category: 'special',
    requiredStats: ['monthlyMasjidVisits'],
    criteria: (stats) => stats.monthlyMasjidVisits >= 20,
  },
  {
    title: 'istighfar_constant',
    category: 'special',
    requiredStats: ['dailyIstighfarCount'],
    criteria: (stats) => stats.dailyIstighfarCount >= 100,
  },
  {
    title: 'gratitude_master',
    category: 'special',
    requiredStats: ['gratitudeDhikrCount'],
    criteria: (stats) => stats.gratitudeDhikrCount >= 100,
  },
  {
    title: 'prophetic_way',
    category: 'special',
    requiredStats: ['sunnahAdherenceScore'],
    criteria: (stats) => stats.sunnahAdherenceScore >= 90,
  },
  {
    title: 'spiritual_excellence',
    category: 'special',
    requiredStats: ['spiritualityScore'],
    criteria: (stats) => stats.spiritualityScore >= 90,
  },
];

export default AWARDS;
