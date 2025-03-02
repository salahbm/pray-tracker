export interface UserStats {
  // Basic Stats
  totalPrayers: number;
  totalDays: number;
  currentStreak: number;
  longestStreak: number;
  daysWithAllPrayers: number;
  consecutivePerfectDays: number;

  // Prayer Quality
  onTimePercentage: number;
  jamaatCount: number;
  monthlyTahajjudCount: number;

  // Fajr Stats
  consecutiveFajrDays: number;
  earlyFajrPercentage: number;
  fajrOnTimePercentage: number;
  tahajjudCount: number;
  consecutiveTahajjudNights: number;

  // Sunnah & Additional Prayers
  sunnahPrayersCount: number;
  consecutiveSunnahDays: number;
  duhaCount: number;

  // Dhikr & Quran
  morningAdhkarDays: number;
  eveningAdhkarDays: number;
  consecutiveDhikrDays: number;
  weeklyQuranDays: number;
  monthlyQuranDays: number;

  // Ramadan & Special Times
  ramadanPrayerCount: number;
  ramadanPerfectDays: number;
  lastTenNightsPrayers: number;
  eidPrayersCount: number;
  consecutiveJumuahCount: number;

  // Community & Learning
  menteeCount: number;
  prayerCircleMembers: number;
  learningSessionsCount: number;
  helpedUsers: number;

  // Spiritual Progress
  monthlyMasjidVisits: number;
  dailyIstighfarCount: number;
  gratitudeDhikrCount: number;
  sunnahAdherenceScore: number;
  spiritualityScore: number;
}
