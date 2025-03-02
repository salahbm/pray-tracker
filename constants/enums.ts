enum SALAHS {
  FAJR = 'fajr',
  SUNRISE = 'sunrise',
  DHUHR = 'dhuhr',
  ASR = 'asr',
  MAGHRIB = 'maghrib',
  ISHA = 'isha',
  NAFL = 'nafl',
}

enum PRAYER_POINTS {
  ON_TIME = 2,
  LATE = 1,
  MISSED = 0,
  NOT_TOUCHED = null,
}

enum AWARD_POINTS {
  BASIC = 5,      // First steps, basic achievements
  REGULAR = 10,   // Regular prayer habits
  ADVANCED = 20,  // Consistent streaks, quality prayers
  EXPERT = 30,    // Long-term dedication
  MASTER = 50     // Exceptional achievements
}

enum AWARD_TITLES {
  // First Steps
  FIRST_PRAYER = 'first_prayer',
  FIRST_FULL_DAY = 'first_full_day',
  FIRST_WEEK = 'first_week',
  FIRST_MONTH = 'first_month',

  // Streak Awards
  SEVEN_DAY_STREAK = 'seven_day_streak',
  FIFTEEN_DAY_STREAK = 'fifteen_day_streak',
  THIRTY_DAY_STREAK = 'thirty_day_streak',
  SIXTY_DAY_STREAK = 'sixty_day_streak',
  NINETY_DAY_STREAK = 'ninety_day_streak',
  PERFECT_WEEK = 'perfect_week',
  PERFECT_MONTH = 'perfect_month',

  // Prayer Count Awards
  FIFTY_PRAYERS = 'fifty_prayers',
  HUNDRED_PRAYERS = 'hundred_prayers',
  FIVE_HUNDRED_PRAYERS = 'five_hundred_prayers',
  THOUSAND_PRAYERS = 'thousand_prayers',
  TWO_THOUSAND_PRAYERS = 'two_thousand_prayers',
  FIVE_THOUSAND_PRAYERS = 'five_thousand_prayers',

  // Fajr Excellence
  FAJR_MASTER = 'fajr_master',
  EARLY_BIRD = 'early_bird',
  DAWN_SEEKER = 'dawn_seeker',
  TAHAJJUD_WARRIOR = 'tahajjud_warrior',

  // Prayer Quality
  PUNCTUAL_WORSHIPPER = 'punctual_worshipper',
  JAMAAT_REGULAR = 'jamaat_regular',
  JAMAAT_DEVOTEE = 'jamaat_devotee',
  DEDICATED_TAHAJJUD = 'dedicated_tahajjud',

  // Sunnah Excellence
  SUNNAH_BEGINNER = 'sunnah_beginner',
  SUNNAH_DEVOTEE = 'sunnah_devotee',
  SUNNAH_MASTER = 'sunnah_master',
  DUHA_REGULAR = 'duha_regular',

  // Dhikr & Quran
  MORNING_ADHKAR = 'morning_adhkar',
  EVENING_ADHKAR = 'evening_adhkar',
  CONSISTENT_DHIKR = 'consistent_dhikr',
  QURAN_COMPANION = 'quran_companion',
  QURAN_DEVOTEE = 'quran_devotee',

  // Special Times
  RAMADAN_WARRIOR = 'ramadan_warrior',
  RAMADAN_CHAMPION = 'ramadan_champion',
  LAYLATUL_QADR = 'laylatul_qadr',
  EID_PRAYERS = 'eid_prayers',
  JUMUAH_REGULAR = 'jumuah_regular',

  // Community & Growth
  PRAYER_MENTOR = 'prayer_mentor',
  COMMUNITY_BUILDER = 'community_builder',
  KNOWLEDGE_SEEKER = 'knowledge_seeker',
  SPIRITUAL_GUIDE = 'spiritual_guide',

  // Milestones
  THREE_MONTH_MILESTONE = 'three_month_milestone',
  SIX_MONTH_MILESTONE = 'six_month_milestone',
  SPIRITUAL_MILESTONE = 'spiritual_milestone',
  TWO_YEAR_DEVOTION = 'two_year_devotion',

  // Special Achievements
  NIGHT_DEVOTEE = 'night_devotee',
  MASJID_REGULAR = 'masjid_regular',
  ISTIGHFAR_CONSTANT = 'istighfar_constant',
  GRATITUDE_MASTER = 'gratitude_master',
  PROPHETIC_WAY = 'prophetic_way',
  SPIRITUAL_EXCELLENCE = 'spiritual_excellence',
}

export { PRAYER_POINTS, SALAHS, AWARD_POINTS, AWARD_TITLES };
