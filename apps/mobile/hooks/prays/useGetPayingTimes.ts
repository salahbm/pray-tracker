import { useQuery } from '@tanstack/react-query';

import agent from '@/lib/agent';

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

  const url = `https://api.aladhan.com/v1/timings?latitude=${coords.latitude}&longitude=${coords.longitude}&method=2&timezonestring=${timezone}`;

  const response = await agent.get(url);

  if (!response.ok) {
    throw new Error('Failed to fetch prayer times');
  }

  return response.data;
};

export const usePrayerTimes = (coords: Coordinates | null) => {
  return useQuery({
    queryKey: ['prayerTimes', coords],
    queryFn: () => fetchPrayerTimes(coords),
    staleTime: 1000 * 60 * 15, // Cache data for 15 minutes
    retry: 2,
    enabled: !!coords,
  });
};
