import { useFonts } from 'expo-font';
import { router, Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import { AppState } from 'react-native';

import spaceMono from '../assets/fonts/SpaceMono-Regular.ttf';
import { useNotificationListeners } from '@/hooks/notifications/useNotificationListener';
import { supabase } from '@/lib/supabase';
import { useAuthStore } from '@/store/auth/auth-session';
import RootProvider from 'providers/root';
import 'react-native-reanimated';
import 'i18n.config'; // Import the i18n config
import 'styles/global.css';
import 'reanimated.config';

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const { loadSession } = useAuthStore();
  const [loaded] = useFonts({
    SpaceMono: spaceMono,
  });

  // Start auto-refresh when the app becomes active
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

  // Load user session
  useEffect(() => {
    loadSession(); // Load user session
  }, [loadSession]);

  // Hide the splash screen once fonts are loaded
  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  // Notification listeners to handle foreground and background notifications
  useNotificationListeners({
    onNotificationReceived: (notification) => {
      console.log('Foreground Notification:', notification);
      // Handle notification (e.g., show a toast, update state)
    },
    onNotificationResponse: (response) => {
      console.log('User Interacted with Notification:', response);
      // Navigate based on notification data
      const screen = response.notification.request.content.data?.screen;
      if (screen) {
        router.navigate(screen);
      }
    },
  });

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
