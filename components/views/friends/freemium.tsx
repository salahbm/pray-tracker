import BottomSheet from '@gorhom/bottom-sheet';
import Checkbox from 'expo-checkbox';
import React, { useState, memo, useRef } from 'react';
import { View, Image, ImageSourcePropType } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import CallToAction from './call-to-premium';
import FreemiumTrackerIntro from './header';
import CustomBottomSheet from '@/components/shared/bottom-sheet';
import SwiperButton from '@/components/shared/swiper';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Text } from '@/components/ui/text';
import { PRAYER_POINTS, SALAHS } from '@/constants/enums';
import { FRIENDS_DATA } from '@/constants/friends';
import { cn } from '@/lib/utils';
import { fireToast } from '@/providers/toaster';
import { useThemeStore } from '@/store/defaults/theme';

const FreemiumFriends = () => {
  const { colors } = useThemeStore();
  const insets = useSafeAreaInsets();
  // BOTTOM SHEETS REFERENCES
  const ref = useRef<BottomSheet>(null);

  // Accordion
  const [accordionValue, setAccordionValue] = useState<string[]>([]);

  const handleUpgrade = () => {
    fireToast.info('Please, upgrade to a premium plan.');
  };
  return (
    <React.Fragment>
      <ScrollView
        contentContainerStyle={{ paddingBottom: insets.bottom + 50 }}
        showsVerticalScrollIndicator={false}
        className="w-full"
      >
        <FreemiumTrackerIntro ref={ref} />
        <View className="border-b border-border my-8" />
        <Text className="text-xl font-bold mb-3"> Friends</Text>

        {FRIENDS_DATA.map((friend) => (
          <SwiperButton
            key={friend.friend.friendshipId}
            onPress={handleUpgrade}
          >
            <Accordion
              type="multiple"
              collapsible
              value={accordionValue}
              onValueChange={setAccordionValue}
            >
              <AccordionItem value={String(friend.friend.friendId)}>
                <AccordionTrigger>
                  <View className="flex-row items-center gap-3">
                    <Image
                      source={friend.friend.friendPhoto as ImageSourcePropType}
                      className="size-14 rounded-full bg-muted"
                    />
                    <View>
                      <Text className="text-base font-medium text-muted-foreground">
                        {friend.friend.friendUsername}
                      </Text>
                      <Text className="text-sm">
                        {friend.friend.friendEmail}
                      </Text>
                    </View>
                  </View>
                </AccordionTrigger>

                <AccordionContent>
                  {friend.prays.map((salah) => {
                    // Extract only prayer-related fields
                    const prayerEntries = Object.entries(salah).filter(
                      ([key]) =>
                        Object.values(SALAHS)
                          .map((s) => s.toLowerCase())
                          .includes(key.toLowerCase()),
                    );

                    return prayerEntries.map(([prayer, value]) => (
                      <View
                        key={prayer}
                        className="flex-row items-center justify-between py-1"
                      >
                        <Text className={cn('capitalize font-semibold')}>
                          {prayer}
                        </Text>

                        <View className="flex-row gap-4">
                          {[
                            PRAYER_POINTS.MISSED,
                            PRAYER_POINTS.LATE,
                            PRAYER_POINTS.ON_TIME,
                          ].map((val) => (
                            <Checkbox
                              key={`${prayer}-${val}`}
                              value={value === val}
                              color={
                                value === val
                                  ? val === PRAYER_POINTS.ON_TIME
                                    ? colors['--primary']
                                    : val === PRAYER_POINTS.LATE
                                      ? colors['--secondary']
                                      : colors['--destructive']
                                  : undefined
                              }
                            />
                          ))}
                        </View>
                      </View>
                    ));
                  })}
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </SwiperButton>
        ))}
      </ScrollView>
      {/* BOTTOM SHEET */}
      <CustomBottomSheet sheetRef={ref}>
        <CallToAction />
      </CustomBottomSheet>
    </React.Fragment>
  );
};

export default memo(FreemiumFriends);
