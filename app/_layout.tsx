import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import { AppState } from 'react-native';

import spaceMono from '../assets/fonts/SpaceMono-Regular.ttf';
import { supabase } from '@/lib/supabase';
import { useAuthStore } from '@/store/auth/auth-session';
import RootProvider from 'providers/root';
import 'react-native-reanimated';
import 'i18n.config'; // Import the i18n config
import 'styles/global.css';

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const { loadSession } = useAuthStore();
  const [loaded] = useFonts({
    SpaceMono: spaceMono,
  });

  useEffect(() => {
    const handleAppStateChange = (state: string) => {
      if (state === 'active') {
        supabase.auth.startAutoRefresh(); // Ensure auto-refresh runs
      } else {
        supabase.auth.stopAutoRefresh();
      }
    };

    const subscription = AppState.addEventListener(
      'change',
      handleAppStateChange,
    );
    return () => subscription.remove();
  }, []);

  useEffect(() => {
    loadSession(); // Load user session
  }, [loadSession]);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <RootProvider>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="+not-found" />
      </Stack>
    </RootProvider>
  );
}
