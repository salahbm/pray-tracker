import { useQuery } from '@tanstack/react-query';

import { agent } from '@/lib/agent';

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
  coords: Coordinates | null
): Promise<PrayersTimeResponse['data'] | null> => {
  const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;

  if (!coords) return null;

  const data = await agent(
    `/prayers/times?lat=${coords.latitude}&lng=${coords.longitude}&tz=${timezone}`
  );
  return data;
};

export const usePrayerTimes = (coords: Coordinates | null) => {
  return useQuery({
    queryKey: ['prayerTimes', coords],
    queryFn: () => fetchPrayerTimes(coords),
    staleTime: 1000 * 60 * 60, // Cache data for 1 hour
    retry: 1, // Retry once on failurer
    enabled: !!coords,
  });
};
