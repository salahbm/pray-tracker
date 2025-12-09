import spaceMono from '@assets/fonts/SpaceMono-Regular.ttf';
import { useFonts } from 'expo-font';
import { Stack, useRootNavigationState } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { Suspense, useEffect } from 'react';
import { ActivityIndicator } from 'react-native';

import { useSession } from '@/hooks/auth/useSessions';
import { cleanupExpiredTokens } from '@/utils/deep-link-token';
import { initializeRevenueCat } from '@/lib/revenuecat';

export const unstable_settings = {
  anchor: '(tabs)',
  initialRouteName: 'index',
};

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function App() {
  useSession();

  const [loaded] = useFonts({
    SpaceMono: spaceMono,
  });

  const navState = useRootNavigationState();

  // Hide the splash screen once fonts are loaded
  useEffect(() => {
    if (loaded && navState?.stale === false) {
      SplashScreen.hideAsync();
    }
  }, [loaded, navState]);

  // Cleanup expired deep link tokens on app start
  useEffect(() => {
    cleanupExpiredTokens();
    initializeRevenueCat();
  }, []);

  if (!loaded) {
    return null;
  }

  return (
    <Suspense fallback={<ActivityIndicator className="text-primary size-14" />}>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="+not-found" />
      </Stack>
    </Suspense>
  );
}
