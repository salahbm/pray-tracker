import React from 'react';
import { View } from 'react-native';
import Skeleton from '@/components/ui/skeleton';
import { SafeAreaView } from 'react-native-safe-area-context';

const PrayerTimerSkeleton = () => {
  return (
    <SafeAreaView className="main-area">
      {' '}
      <View className="rounded-[32px] mt-8 p-6 min-h-[250px] bg-primary-foreground/5 justify-between border-2 border-border">
        {/* Top action buttons */}
        <View className="flex-row justify-end gap-2">
          <Skeleton className="w-10 h-10 rounded-full" />
          <Skeleton className="w-10 h-10 rounded-full" />
        </View>

        {/* Center content */}
        <View className="items-center">
          <Skeleton className="mt-2 h-4 w-32 rounded-md" />
          <Skeleton className="mt-3 h-14 w-48 rounded-lg" />
          <Skeleton className="mt-3 h-6 w-24 rounded-full" />
        </View>

        {/* Footer */}
        <View className="flex-row justify-between items-center mt-4">
          <Skeleton className="h-6 w-32 rounded-full" />
          <Skeleton className="h-8 w-8 rounded-full" />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default PrayerTimerSkeleton;
