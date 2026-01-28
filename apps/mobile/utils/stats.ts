import { format } from 'date-fns';

import { PRAYER_POINTS } from '@/constants/enums';
import { IPrays } from '@/types/prays';

export const PRAYER_FIELDS = ['fajr', 'dhuhr', 'asr', 'maghrib', 'isha', 'nafl'] as const;
export type PrayerField = (typeof PRAYER_FIELDS)[number];

const MONTHS_IN_YEAR = 12;

export const getPrayerValue = (pray: IPrays, field: PrayerField) => pray[field] ?? 0;

export const getPrayerTotal = (pray: IPrays) =>
  PRAYER_FIELDS.reduce((sum, field) => sum + getPrayerValue(pray, field), 0);

export const getExpectedDailyMax = () => PRAYER_FIELDS.length * PRAYER_POINTS.ON_TIME;

export const filterPraysByMonth = (prays: IPrays[] = [], referenceDate = new Date()) => {
  const currentMonth = referenceDate.getMonth();
  const currentYear = referenceDate.getFullYear();

  return prays.filter(pray => {
    const date = new Date(pray.date);
    return date.getMonth() === currentMonth && date.getFullYear() === currentYear;
  });
};

export const filterPraysByYear = (prays: IPrays[] = [], referenceDate = new Date()) => {
  const currentYear = referenceDate.getFullYear();

  return prays.filter(pray => new Date(pray.date).getFullYear() === currentYear);
};

export const getMonthlyPrayerTotals = (prays: IPrays[] = [], referenceDate = new Date()) => {
  const monthPrays = filterPraysByMonth(prays, referenceDate);

  return PRAYER_FIELDS.reduce(
    (acc, field) => {
      acc[field] = monthPrays.reduce((sum, pray) => sum + getPrayerValue(pray, field), 0);
      return acc;
    },
    {} as Record<PrayerField, number>
  );
};

export const getMonthlyConsistencyCounts = (prays: IPrays[] = [], referenceDate = new Date()) => {
  const monthPrays = filterPraysByMonth(prays, referenceDate);
  const expectedMax = getExpectedDailyMax();

  return monthPrays.reduce(
    (acc, pray) => {
      const total = getPrayerTotal(pray);
      if (total === 0) {
        acc.missed += 1;
      } else if (total === expectedMax) {
        acc.full += 1;
      } else {
        acc.partial += 1;
      }
      return acc;
    },
    { full: 0, partial: 0, missed: 0, expectedMax }
  );
};

export const getYearlyMonthlyTotals = (prays: IPrays[] = [], referenceDate = new Date()) => {
  const yearPrays = filterPraysByYear(prays, referenceDate);
  const totals = Array.from({ length: MONTHS_IN_YEAR }, () => 0);

  yearPrays.forEach(pray => {
    const monthIndex = new Date(pray.date).getMonth();
    totals[monthIndex] += getPrayerTotal(pray);
  });

  return totals;
};

export const getYearlyPrayerTotals = (prays: IPrays[] = [], referenceDate = new Date()) => {
  const yearPrays = filterPraysByYear(prays, referenceDate);

  return PRAYER_FIELDS.reduce(
    (acc, field) => {
      acc[field] = yearPrays.reduce((sum, pray) => sum + getPrayerValue(pray, field), 0);
      return acc;
    },
    {} as Record<PrayerField, number>
  );
};

export const getCompletionQualityByMonth = (prays: IPrays[] = [], referenceDate = new Date()) => {
  const yearPrays = filterPraysByYear(prays, referenceDate);
  const months = Array.from({ length: MONTHS_IN_YEAR }, () => ({ onTime: 0, late: 0, missed: 0 }));

  yearPrays.forEach(pray => {
    const monthIndex = new Date(pray.date).getMonth();
    PRAYER_FIELDS.forEach(field => {
      const value = pray[field];
      if (value === PRAYER_POINTS.ON_TIME) {
        months[monthIndex].onTime += 1;
        return;
      }
      if (value === PRAYER_POINTS.LATE) {
        months[monthIndex].late += 1;
        return;
      }
      if (value === PRAYER_POINTS.MISSED) {
        months[monthIndex].missed += 1;
      }
    });
  });

  return months;
};

export const hasCompletionQualityData = (
  months: Array<{ onTime: number; late: number; missed: number }>
) => months.some(month => month.onTime > 0 || month.late > 0 || month.missed > 0);

export const getMonthLabel = (referenceDate: Date, monthIndex: number) =>
  format(new Date(referenceDate.getFullYear(), monthIndex, 1), 'MMM');
