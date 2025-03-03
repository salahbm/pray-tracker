import BottomSheet from '@gorhom/bottom-sheet';
import React, { forwardRef } from 'react';
import { useTranslation } from 'react-i18next';
import { View, Image, Text } from 'react-native';

import { Button } from '@/components/ui/button';
import { FRIENDS } from '@/constants/images';

const FreemiumTrackerIntro = forwardRef<BottomSheet, unknown>((props, ref) => {
  const { t } = useTranslation();

  return (
    <React.Fragment>
      {/* Overlapping images with curved border */}
      <View className="flex-row items-center justify-center">
        <Image
          source={FRIENDS.friend_1}
          className="size-20 shrink-0 rounded-full"
          style={{
            transform: [
              { rotate: '-10deg' },
              { translateX: 20 },
              { translateY: 15 },
            ],
          }}
        />
        <Image
          source={FRIENDS.friend_2}
          className="size-20 shrink-0 rounded-full"
          style={{
            transform: [{ scale: 1.1 }, { rotate: '-2deg' }],
          }}
        />
        <Image
          source={FRIENDS.friend_5}
          className="size-20 shrink-0 rounded-full"
          style={{
            transform: [
              { rotate: '4deg' },
              { scale: 1.3 },
              { translateX: -12 },
            ],
          }}
        />
        <Image
          source={FRIENDS.friend_4}
          className="size-20 shrink-0 rounded-full"
          style={{
            transform: [
              { rotate: '12deg' },
              { translateX: -37 },
              { translateY: 16 },
              { scale: 1.2 },
            ],
          }}
        />
      </View>

      {/* Text title */}
      <Text className="text-center text-md font-medium mt-4 text-secondary-foreground">
        {t('Friends.Freemium.Title')}
      </Text>

      {/* Text description */}
      <Text className="text-center text-sm text-muted-foreground mt-2 px-8">
        {t('Friends.Freemium.Description')}
      </Text>

      {/* Button */}
      <Button
        className="mt-8 rounded-full mx-8 shadow-lg"
        size="lg"
        width="full"
        onPress={() => {
          if (
            ref &&
            'current' in ref &&
            ref.current &&
            typeof ref.current.snapToIndex === 'function'
          ) {
            ref.current.snapToIndex(2);
          }
        }}
      >
        <Text>{t('Friends.Freemium.UpgradeButton')}</Text>
      </Button>
    </React.Fragment>
  );
});

FreemiumTrackerIntro.displayName = 'FreemiumTrackerIntro';

export default FreemiumTrackerIntro;
