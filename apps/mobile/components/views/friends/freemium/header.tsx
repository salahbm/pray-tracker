import React, { useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { Image, Text, View } from 'react-native';

import { FRIENDS } from '@/constants/images';
import { Button } from '@/components/ui/button';
import { usePaywallBottomSheetStore } from '@/store/bottom-sheets';

const FreemiumTrackerIntro =(
  () => {
    const { t } = useTranslation();
    const { paywallSheetRef } = usePaywallBottomSheetStore();
 
    return (
      <React.Fragment>
        {/* Overlapping images with curved border */}
        <View className="flex-row items-center justify-center">
          <Image
            source={FRIENDS.friend_1}
            className="size-20 shrink-0 rounded-full max-w-20 max-h-20"
            style={{
              transform: [{ rotate: '-10deg' }, { translateX: 20 }, { translateY: 15 }],
            }}
          />
          <Image
            source={FRIENDS.friend_2}
            className="size-20 shrink-0 rounded-full max-w-20 max-h-20"
            style={{
              transform: [{ scale: 1.1 }, { rotate: '-2deg' }],
            }}
          />
          <Image
            source={FRIENDS.friend_5}
            className="size-20 shrink-0 rounded-full max-w-20 max-h-20"
            style={{
              transform: [{ rotate: '4deg' }, { scale: 1.3 }, { translateX: -12 }],
            }}
          />
          <Image
            source={FRIENDS.friend_4}
            className="size-20 shrink-0 rounded-full max-w-20 max-h-20"
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
          Noor - Prayer Tracker +
        </Text>

        {/* Text description */}
        <Text className="text-center text-sm text-muted-foreground mt-2 px-8">
          {t('friends.freemium.description')}
        </Text>

        {/* Button */}

          <Button
            className="mt-8 rounded-full mx-8 shadow-lg"
            size="lg"
            width="full"
            onPress={() => paywallSheetRef.current?.snapToIndex(0)}
          >
            <Text>{t('friends.freemium.upgradeButton')}</Text>
          </Button>



      </React.Fragment>
    );
  }
);



export default FreemiumTrackerIntro;
