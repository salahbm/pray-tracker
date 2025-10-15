import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { Suspense, useEffect } from 'react';
import { ActivityIndicator } from 'react-native';

import spaceMono from '../assets/fonts/SpaceMono-Regular.ttf';
import { useSession } from '@/hooks/auth/useSessions';
import { usePushNotifications } from '@/hooks/common/useNotifications';

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function App() {
  useSession();

  const [loaded] = useFonts({
    SpaceMono: spaceMono,
  });

  /// Initialize notifications system
  usePushNotifications();

  // Hide the splash screen once fonts are loaded
  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

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
