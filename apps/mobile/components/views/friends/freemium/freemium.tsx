import Checkbox from 'expo-checkbox';
import React, { memo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Image, ImageSourcePropType, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

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
import { useThemeStore } from '@/store/defaults/theme';

import FreemiumTrackerIntro from './header';

const FreemiumFriends = () => {
  const { t } = useTranslation();
  const { colors } = useThemeStore();
  const insets = useSafeAreaInsets();

  // Accordion
  const [accordionValue, setAccordionValue] = useState<string[]>([]);

  return (
    <React.Fragment>
      <ScrollView
        contentContainerStyle={{ paddingBottom: insets.bottom + 50 }}
        showsVerticalScrollIndicator={false}
        className="w-full lg:px-4"
      >
        <FreemiumTrackerIntro />
        <View className="border-b border-border my-8" />
        <Text className="text-xl font-bold mb-3">{t('friends.title')}</Text>

        {FRIENDS_DATA.map(friend => (
          <Accordion
            type="multiple"
            collapsible
            value={accordionValue}
            onValueChange={setAccordionValue}
            key={friend.friend.friendshipId}
          >
            <AccordionItem value={String(friend.friend.id)}>
              <AccordionTrigger>
                <View className="flex-row items-center gap-3">
                  <Image
                    source={friend.friend.photo as ImageSourcePropType}
                    className="size-14 rounded-full bg-muted max-w-14 max-h-14"
                  />
                  <View>
                    <Text className="text-base font-medium text-muted-foreground">
                      {friend.friend.username}
                    </Text>
                    <Text className="text-sm">{friend.friend.email}</Text>
                  </View>
                </View>
              </AccordionTrigger>

              <AccordionContent>
                {friend.prays.map(salah => {
                  // Extract only prayer-related fields
                  const prayerEntries = Object.entries(salah).filter(([key]) =>
                    Object.values(SALAHS)
                      .map(s => s.toLowerCase())
                      .includes(key.toLowerCase())
                  );

                  return prayerEntries.map(([prayer, value]) => (
                    <View key={prayer} className="flex-row items-center justify-between py-1">
                      <Text className={cn('capitalize font-semibold')}>
                        {t(`common.salahs.${prayer}`)}
                      </Text>

                      <View className="flex-row gap-4">
                        {[PRAYER_POINTS.MISSED, PRAYER_POINTS.LATE, PRAYER_POINTS.ON_TIME].map(
                          val => (
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
                          )
                        )}
                      </View>
                    </View>
                  ));
                })}
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        ))}
      </ScrollView>
    </React.Fragment>
  );
};

export default memo(FreemiumFriends);
