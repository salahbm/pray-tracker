import { BlurView } from 'expo-blur';
import { Tabs } from 'expo-router';
import { useMemo } from 'react';
import { StyleSheet } from 'react-native';

import { useThemeStore } from '@/store/defaults/theme';
import { Award, Compass, Home, Users } from 'components/shared/icons';

export default function TabLayout() {
  const { colors } = useThemeStore();
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
