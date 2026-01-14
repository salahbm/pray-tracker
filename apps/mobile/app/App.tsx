import spaceMono from '@assets/fonts/SpaceMono-Regular.ttf';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { Suspense, useEffect } from 'react';
import { ActivityIndicator } from 'react-native';

import { useSession } from '@/hooks/auth/useSessions';
import { initializeRevenueCat } from '@/lib/revenuecat';
import { cleanupExpiredTokens } from '@/utils/deep-link-token';
import { usePrayerData } from '@/hooks/prays/useGetPayingTimes';
import { useLocationStore } from '@/store/use-location';

export const unstable_settings = {
  anchor: '(tabs)',
  initialRouteName: 'index',
};

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

// Set the animation options. This is optional.
SplashScreen.setOptions({
  duration: 500,
  fade: true,
});

export default function App() {
  useSession();
  usePrayerData();
  useLocationStore();

  const [loaded] = useFonts({
    SpaceMono: spaceMono,
  });

  // Hide the splash screen once fonts are loaded
  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  // Cleanup expired deep link tokens on app start
  useEffect(() => {
    cleanupExpiredTokens();
    initializeRevenueCat();
  }, []);

  return (
    <Suspense fallback={<ActivityIndicator size="large" color="primary" />}>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="index" />
        <Stack.Screen name="(tabs)" />
        <Stack.Screen name="(auth)" />
        <Stack.Screen name="(screens)" />
        <Stack.Screen name="+not-found" />
      </Stack>
    </Suspense>
  );
}
