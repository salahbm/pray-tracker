import { useQuery } from '@tanstack/react-query';

export type Coordinates = {
  latitude: number;
  longitude: number;
};

export type PrayersTimeResponse = {
  data: {
    timings: Record<string, string>;
    date: { readable: string; timestamp: string };
    // Add additional response structure here if needed
  };
  code: number;
  status: string;
};

// Fetch prayer times based on coordinates
const fetchPrayerTimes = async (
  coords: Coordinates | null,
): Promise<PrayersTimeResponse['data'] | null> => {
  const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;

  const response = await fetch(
    `https://api.aladhan.com/v1/timings?latitude=${coords.latitude}&longitude=${coords.longitude}&method=2&timezonestring=${timezone}`,
  );

  if (!response.ok) {
    throw new Error('Failed to fetch prayer times');
  }
  const data = await response.json();
  return data.data;
};

export const usePrayerTimes = (coords: Coordinates | null) => {
  return useQuery({
    queryKey: ['prayerTimes', coords],
    queryFn: () => fetchPrayerTimes(coords),
    staleTime: 1000 * 60 * 60, // Cache data for 1 hour
    retry: 1, // Retry once on failure
    enabled: !!coords,
  });
};
