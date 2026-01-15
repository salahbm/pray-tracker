import React from 'react';
import { Pressable, View } from 'react-native';
import Animated, { LinearTransition } from 'react-native-reanimated';

import { Text } from '@/components/ui/text';
import { cn } from '@/lib/utils';

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
    <View className="mt-6 mb-4">
      <View className="flex-row bg-muted/60 p-1 rounded-full border border-border">
        {TABS.map(tab => {
          const isActive = tab === activeTab;
          return (
            <Pressable
              key={tab}
              onPress={() => setActiveTab(tab)}
              className="flex-1 rounded-full overflow-hidden"
            >
              <Animated.View
                layout={LinearTransition.springify()}
                className={cn(
                  `py-2.5 items-center justify-center rounded-full`,
                  isActive ? 'bg-background' : ''
                )}
                style={
                  isActive
                    ? {
                        shadowColor: '#000',
                        shadowOffset: { width: 0, height: 2 },
                        shadowOpacity: 0.08,
                        shadowRadius: 6,
                        elevation: 2,
                      }
                    : undefined
                }
              >
                <Text
                  className={cn(
                    `text-sm`,
                    isActive ? 'font-semibold text-foreground' : 'text-muted-foreground'
                  )}
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
