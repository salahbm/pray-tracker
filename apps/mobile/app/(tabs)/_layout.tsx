import { BlurView } from 'expo-blur';
import { Tabs } from 'expo-router';
import { useMemo } from 'react';
import { Platform, StyleSheet } from 'react-native';

import { useThemeStore } from '@/store/defaults/theme';
import { TabTints } from '@/styles/theme.config';
import { Award, Compass, Home, Users } from 'components/shared/icons';

export default function TabLayout() {
  const { colors, currentTheme } = useThemeStore();

  const screens = useMemo(
    () => [
      { name: 'index', Icon: Home },
      { name: 'qibla', Icon: Compass },
      { name: 'awards', Icon: Award },
      { name: 'friends', Icon: Users },
    ],
    [],
  );

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: colors['--primary'],
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: {
          position: 'absolute',
          borderTopWidth: 0, // Remove any border
          bottom: 0, // Ensure correct positioning

          backgroundColor: 'transparent', // Prevent solid colors
          elevation: 5, // Remove Android shadow
          shadowOpacity: 0.1, // Remove iOS shadow
        },
        tabBarBackground: () => (
          <BlurView
            intensity={Platform.OS === 'ios' ? 30 : 100}
            tint={TabTints[currentTheme]}
            style={{
              ...StyleSheet.absoluteFillObject,
              backgroundColor:
                Platform.OS === 'android'
                  ? 'rgba(255, 255, 255, 1)'
                  : 'transparent',
              overflow: 'hidden',
            }}
          />
        ),
      }}
    >
      {screens.map(({ name, Icon }) => (
        <Tabs.Screen
          key={name}
          name={name}
          options={{
            tabBarIcon: ({ color }) => (
              <Icon color={color} size={25} style={{ marginBottom: -5 }} />
            ),
          }}
        />
      ))}
    </Tabs>
  );
}
