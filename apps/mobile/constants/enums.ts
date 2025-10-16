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

export { SALAHS, PRAYER_POINTS };
