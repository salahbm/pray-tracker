import { TabList, Tabs, TabSlot, TabTrigger } from 'expo-router/ui';
import React from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Calendar, Clock4, Compass, Home, Users } from '@components/shared/icons';

import { cn } from '@/lib/utils';
import { TabButton } from '@/components/shared/tab-button';

export default function TabLayout() {
  const insets = useSafeAreaInsets();

  return (
    <Tabs>
      <TabSlot />
      <TabList
        className={cn(
          'absolute self-center flex-row justify-evenly bg-muted py-2 px-3 rounded-full transition-all duration-300 drop-shadow-2xl backdrop-blur-3xl'
        )}
        style={{ bottom: insets.bottom + 5 }}
      >
        <TabTrigger name="Home" href="/" asChild>
          <TabButton icon={Home}></TabButton>
        </TabTrigger>
        <TabTrigger name="track" href="/(tabs)/(track)/months" asChild>
          <TabButton icon={Calendar}></TabButton>
        </TabTrigger>
        <TabTrigger name="friends" href="/(tabs)/friends" asChild>
          <TabButton icon={Users}></TabButton>
        </TabTrigger>
      </TabList>
    </Tabs>
  );
}
