import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import { AppState } from 'react-native';

import spaceMono from '../assets/fonts/SpaceMono-Regular.ttf';
import { usePushNotifications } from '@/hooks/common/useNotifications';
import { supabase } from '@/lib/supabase';
import { fireToast } from '@/providers/toaster';
import { useAuthStore } from '@/store/auth/auth-session';

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function App() {
  const { setSession, clearUserAndSession } = useAuthStore();
  const { expoPushToken, notification } = usePushNotifications();
  const data = JSON.stringify(notification, undefined, 2);
  console.log('data:', data, expoPushToken);
  const [loaded] = useFonts({
    SpaceMono: spaceMono,
  });

  // Start auto-refresh when the app becomes active
  useEffect(() => {
    const handleAppStateChange = (state: string) => {
      if (state === 'active') {
        supabase.auth.startAutoRefresh();
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
    // Function to handle session changes
    const handleAuthStateChange = async (event, session) => {
      if (session) {
        setSession(session);
      } else {
        clearUserAndSession();
      }
    };

    // Fetch the initial session
    const fetchInitialSession = async () => {
      try {
        const {
          data: { session },
        } = await supabase.auth.getSession();
        if (session) {
          setSession(session);
        }
      } catch (error) {
        fireToast.error(error?.message ?? 'Failed to get session');
      }
    };

    // Subscribe to auth state changes
    const { data: authListener } = supabase.auth.onAuthStateChange(
      handleAuthStateChange,
    );

    // Fetch the initial session
    fetchInitialSession();

    // Cleanup the auth listener on unmount
    return () => {
      authListener.subscription.unsubscribe();
    };
  }, [setSession, clearUserAndSession]);

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
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen name="+not-found" />
    </Stack>
  );
}
