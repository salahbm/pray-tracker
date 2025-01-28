import { BlurView } from 'expo-blur';
import { Tabs } from 'expo-router';
import { useMemo } from 'react';
import { AppState, StyleSheet } from 'react-native';

import { supabase } from '@/lib/supabase';
import { useThemeStore } from '@/store/defaults/theme';
import { Award, Compass, Home, Users } from 'components/shared/icons';

export default function TabLayout() {
  const { colors } = useThemeStore();

  // Auto refresh token

  // Tells Supabase Auth to continuously refresh the session automatically if
  // the app is in the foreground. When this is added, you will continue to receive
  // `onAuthStateChange` events with the `TOKEN_REFRESHED` or `SIGNED_OUT` event
  // if the user's session is terminated. This should only be registered once.
  AppState.addEventListener('change', (state) => {
    if (state === 'active') {
      supabase.auth.startAutoRefresh();
    } else {
      supabase.auth.stopAutoRefresh();
    }
  });

  const screens = useMemo(
    () => [
      { name: 'index', title: 'Home', Icon: Home },
      { name: 'qibla', title: 'Qibla', Icon: Compass },
      { name: 'awards', title: 'Awards', Icon: Award },
      { name: 'sample', title: 'Friends', Icon: Users },
    ],
    [],
  );

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: colors['--primary'],
        headerShown: false,
        tabBarStyle: {
          position: 'absolute',
          backgroundColor: 'transparent',
          borderTopWidth: 0, // Prevent any border
          bottom: 0, // Ensure correct positioning
          height: 70,
        },
        tabBarBackground: () => (
          <BlurView
            intensity={80}
            style={{
              ...StyleSheet.absoluteFillObject,
              overflow: 'hidden',
              backgroundColor: 'transparent',
            }}
          />
        ),
      }}
    >
      {screens.map(({ name, title, Icon }) => (
        <Tabs.Screen
          key={name}
          name={name}
          options={{
            title,
            tabBarIcon: ({ color }) => <Icon color={color} size={24} />,
          }}
        />
      ))}
    </Tabs>
  );
}
