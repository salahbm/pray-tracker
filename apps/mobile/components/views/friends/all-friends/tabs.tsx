import React from 'react';
import { View, Pressable } from 'react-native';
import Animated, { LinearTransition } from 'react-native-reanimated';

import { Text } from '@/components/ui/text';

import { TabCounts, TabKey } from './types';

interface TabsProps {
  activeTab: TabKey;
  setActiveTab: (tab: TabKey) => void;
  counts: TabCounts;
  renderLabel: (tab: TabKey, counts: TabCounts) => string;
}

const TABS: TabKey[] = ['all', 'requests', 'friends'];

export const Tabs: React.FC<TabsProps> = ({ activeTab, setActiveTab, counts, renderLabel }) => {
  return (
    <View className="mt-4 mb-2">
      <View className="flex-row bg-muted/60 p-1 border-b border-border">
        {TABS.map(tab => {
          const isActive = tab === activeTab;
          return (
            <Pressable
              key={tab}
              onPress={() => setActiveTab(tab)}
              className="flex-1 rounded-lg overflow-hidden"
            >
              <Animated.View
                layout={LinearTransition.springify()}
                className={`py-2 items-center justify-center rounded-lg ${
                  isActive ? 'bg-background border border-border' : ''
                }`}
              >
                <Text
                  className={`text-sm ${
                    isActive ? 'font-semibold text-foreground' : 'text-muted-foreground'
                  }`}
                >
                  {renderLabel(tab, counts)}
                </Text>
              </Animated.View>
            </Pressable>
          );
        })}
      </View>
    </View>
  );
};

export default Tabs;
