enum SALAHS {
  FAJR = 'fajr',
  SUNRISE = 'sunrise',
  DHUHR = 'dhuhr',
  ASR = 'asr',
  MAGHRIB = 'maghrib',
  ISHA = 'isha',
  TAHAJJUD = 'tahajjud',
}

enum PRAYER_POINTS {
  ON_TIME = 2,
  LATE = 1,
  MISSED = 0,
  NOT_TOUCHED = null,
}

enum AWARD_TITLES {
  SEVEN_DAY_STREAK = '7-Day Devotion',
  THIRTY_DAY_STREAK = '30-Day Warrior',
  HUNDRED_PRAYERS = '100 Prayers Logged',
  PUNCTUAL_WORSHIPPER = 'Punctual Worshipper',
  DEDICATED_TAHAJJUD = 'Dedicated Worshipper',
  // New Awards
  FIFTY_PRAYERS = '50 Prayers Completed',
  FIVE_HUNDRED_PRAYERS = '500 Prayers Devotee',
  THOUSAND_PRAYERS = '1000 Prayers Master',
  PERFECT_WEEK = 'Perfect Week',
  FAJR_MASTER = 'Fajr Master',
}

export { PRAYER_POINTS, SALAHS, AWARD_TITLES };
