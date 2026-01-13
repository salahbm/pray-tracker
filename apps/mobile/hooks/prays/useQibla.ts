import { useQuery } from '@tanstack/react-query';
import * as Location from 'expo-location';

const norm360 = (deg: number) => ((deg % 360) + 360) % 360;

export const useQibla = () =>
  useQuery({
    queryKey: ['qibla-direction'],
    queryFn: async () => {
      const coords = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.Highest,
      });
      const res = await fetch(
        `https://api.aladhan.com/v1/qibla/${coords.coords.latitude}/${coords.coords.longitude}`
      );
      const json = await res.json();
      return norm360(Number(json?.data?.direction));
    },
  });
