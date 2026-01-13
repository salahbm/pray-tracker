import { addDays, startOfDay } from 'date-fns';

import { RamadanCalendarDay, RamadanCountdownState } from '@/types/ramadan';

const parseTimingTime = (baseDate: Date, timing: string) => {
  const [time] = timing.split(' ');
  const [hour, minute] = time.split(':').map(Number);
  const parsed = new Date(baseDate);
  parsed.setHours(hour ?? 0, minute ?? 0, 0, 0);
  return parsed;
};

export const getRamadanCountdown = (params: {
  now: Date;
  today: RamadanCalendarDay;
  tomorrow: RamadanCalendarDay;
}): RamadanCountdownState => {
  const { now, today, tomorrow } = params;
  const todayBase = startOfDay(now);
  const tomorrowBase = addDays(todayBase, 1);

  const fajrTime = parseTimingTime(todayBase, today.fajr);
  const maghribTime = parseTimingTime(todayBase, today.maghrib);
  const tomorrowFajrTime = parseTimingTime(tomorrowBase, tomorrow.fajr);

  if (now < fajrTime) {
    const remainingMs = fajrTime.getTime() - now.getTime();
    return {
      nextEvent: 'suhoor',
      targetTime: fajrTime,
      remainingMs,
      status: 'Suhoor Time',
      isSoon: remainingMs <= 30 * 60 * 1000 && remainingMs > 0,
    };
  }

  if (now >= fajrTime && now < maghribTime) {
    const remainingMs = maghribTime.getTime() - now.getTime();
    return {
      nextEvent: 'iftar',
      targetTime: maghribTime,
      remainingMs,
      status: 'Fasting',
      isSoon: remainingMs <= 30 * 60 * 1000 && remainingMs > 0,
    };
  }

  const remainingMs = tomorrowFajrTime.getTime() - now.getTime();
  return {
    nextEvent: 'suhoor',
    targetTime: tomorrowFajrTime,
    remainingMs,
    status: 'Iftar Time',
    isSoon: remainingMs <= 30 * 60 * 1000 && remainingMs > 0,
  };
};
