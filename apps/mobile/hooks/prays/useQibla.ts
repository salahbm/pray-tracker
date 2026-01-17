import { useOnboarding } from '@/components/views/onboarding';
import { useOnboardingStore } from '@/store/defaults/onboarding';
import { useLocationStore } from '@/store/use-location';
import { useQuery } from '@tanstack/react-query';
import * as Location from 'expo-location';

const norm360 = (deg: number) => ((deg % 360) + 360) % 360;

export const useQibla = () => {
  const { visited } = useOnboardingStore();
  const { initialized } = useLocationStore();
  return useQuery({
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
    enabled: visited && initialized,
  });
};
