import { Tabs } from 'expo-router';
import { useMemo } from 'react';

import { Award, Compass, Home, Users } from 'components/shared/icons';
import { NAV_THEME } from '~/constants/colors';
import { useColorScheme } from '~/hooks/useColorScheme';

export default function TabLayout() {
  const colorScheme = useColorScheme();

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
        tabBarActiveTintColor: NAV_THEME[colorScheme.colorScheme].primary,
        headerShown: false,
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
