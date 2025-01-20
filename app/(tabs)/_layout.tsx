import { Tabs } from 'expo-router';
import { useMemo } from 'react';

import { Award, Compass, Home, Users } from 'components/shared/icons';

export default function TabLayout() {
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
        tabBarActiveTintColor: '#b9f900',
        headerShown: false,
        tabBarStyle: {
          backgroundColor: '#2D2C2B', // Transparent background
          position: 'absolute', // Ensures the tab bar is overlayed
          elevation: 0, // Remove shadow for Android
          borderTopWidth: 0, // Remove border for iOS
        },
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