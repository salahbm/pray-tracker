import BottomSheet from '@gorhom/bottom-sheet';
import { BottomSheetMethods } from '@gorhom/bottom-sheet/lib/typescript/types';
import React, { forwardRef } from 'react';
import { View, TouchableOpacity, Image } from 'react-native';

import { Button } from '@/components/ui/button';
import { Text } from '@/components/ui/text';
import { FRIENDS } from '@/constants/images';
import { cn } from '@/lib/utils';
import { SignedOut } from '@/providers/session';

interface HomeHeaderProps {
  user?: { username: string; photo?: string }; // Add your user type here
  today: Date;
  handlePresentSignIn: () => void;
}

const HomeHeader = forwardRef<
  BottomSheetMethods | BottomSheet | null, // Correct type for the ref
  HomeHeaderProps & React.ComponentPropsWithoutRef<typeof View>
>(({ user, today, handlePresentSignIn }, profileSheetRef) => {
  return (
    <View
      className={cn(
        'flex-row items-center justify-between border-b border-border pb-5',
      )}
    >
      <View>
        <Text
          numberOfLines={1}
          className={cn('text-xl font-bold max-w-[250px] truncate')}
        >
          {user ? `Welcome, ${user.username} 👋` : 'Welcome, Guest 👋'}
        </Text>
        <Text className={cn('text-muted-foreground')}>
          {today.toDateString()}
        </Text>
      </View>

      <View className="flex-row justify-end gap-5 items-center">
        <SignedOut>
          <Button size="sm" onPress={handlePresentSignIn}>
            <Text>Sign In</Text>
          </Button>
        </SignedOut>
        <TouchableOpacity
          onPress={() => {
            if (
              profileSheetRef &&
              'current' in profileSheetRef &&
              profileSheetRef.current
            ) {
              profileSheetRef.current.snapToIndex(2);
            }
          }}
        >
          <Image
            source={{
              uri: user?.photo || FRIENDS.guest,
            }}
            className={cn('size-14 rounded-full border border-border')}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
});

// Add display name for debugging
HomeHeader.displayName = 'HomeHeader';

export default HomeHeader;
