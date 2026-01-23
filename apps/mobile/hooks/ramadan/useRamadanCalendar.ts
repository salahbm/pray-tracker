import { useQuery } from '@tanstack/react-query';

import { RamadanCalendarDay } from '@/types/ramadan';

interface RamadanCalendarParams {
  city: string;
  country: string;
  month: number;
  year: number;
}

interface AlAdhanCalendarEntry {
  date: {
    gregorian: {
      date: string;
    };
    hijri: {
      date: string;
      day: string;
      month: {
        number: number;
        en: string;
      };
      year: string;
    };
  };
  timings: {
    Fajr: string;
    Maghrib: string;
  };
}

const fetchRamadanCalendar = async (
  params: RamadanCalendarParams
): Promise<RamadanCalendarDay[]> => {
  const { city, country, month, year } = params;
  if (!city || !country || !month || !year) return [];

  const query = new URLSearchParams({
    city,
    country,
    month: String(month),
    year: String(year),
  });

  const response = await fetch(`https://api.aladhan.com/v1/calendarByCity?${query.toString()}`);
  if (!response.ok) {
    throw new Error('Failed to fetch Hijri calendar.');
  }

  const payload = (await response.json()) as { data?: AlAdhanCalendarEntry[] };
  if (!payload?.data) return [];

  return payload.data.map(entry => ({
    gregorianDate: entry.date.gregorian.date,
    hijriDate: entry.date.hijri.date,
    hijriDay: Number(entry.date.hijri.day),
    hijriMonth: entry.date.hijri.month.number,
    hijriMonthName: entry.date.hijri.month.en,
    hijriYear: Number(entry.date.hijri.year),
    fajr: entry.timings.Fajr,
    maghrib: entry.timings.Maghrib,
  }));
};

export const useRamadanCalendar = (params: RamadanCalendarParams) => {
  return useQuery({
    queryKey: ['ramadan', 'calendarByCity', params],
    queryFn: () => fetchRamadanCalendar(params),
    enabled: !!params.city && !!params.country && !!params.month && !!params.year,
  });
};
