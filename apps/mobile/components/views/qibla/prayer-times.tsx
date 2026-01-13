import React, { Fragment, useMemo, useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useTranslation } from 'react-i18next';
import { format } from 'date-fns';
import { Settings2, Compass, ChevronDown, MapPin } from 'lucide-react-native';
import Icon from '@expo/vector-icons/MaterialCommunityIcons';
import Animated, { useAnimatedStyle, withTiming } from 'react-native-reanimated';

// Components
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import Loader from '@/components/shared/loader';
import NoData from '@/components/shared/no-data';
import { PressableBounce } from '@/components/shared/pressable-bounce';
import { NotificationPermissionModal } from '@/components/shared/modals/notification-permission-modal';

// Logic & Store
import useTimeLeft from '@/hooks/common/useTimeLeft';
import { usePrayNotifierBottomSheetStore } from '@/store/bottom-sheets/pray-notifier.sheet';
import { useThemeStore } from '@/store/defaults/theme';
import { SALAHS } from '@/constants/enums';
import { cn } from '@/lib/utils';
import { triggerHaptic } from '@/utils';
import { usePrayerData } from '@/hooks/prays/useGetPayingTimes';
import { PrayerTimes } from 'adhan';
import { router } from 'expo-router';
import Skeleton from '@/components/ui/skeleton';
import PrayerTimerSkeleton from './prayer-time-skeleton';

/**
 * Helper to handle opacity with Hex colors since Tailwind shorthand fails on Hex strings
 */
const hexToRGBA = (hex: string, opacity: number) => {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `rgba(${r}, ${g}, ${b}, ${opacity})`;
};

const PrayerTimer = () => {
  const { t } = useTranslation();
  const { colors } = useThemeStore();
  const { open } = usePrayNotifierBottomSheetStore();

  const [accordionValue, setAccordionValue] = useState<string | undefined>(undefined);
  const isExpanded = accordionValue === 'prayer-card';

  const { prayerTimes, locationName, loading, error } = usePrayerData();
  const { timeLeft, currentPrayer, nextPrayer } = useTimeLeft(prayerTimes as PrayerTimes);

  const chevronStyle = useAnimatedStyle(() => ({
    transform: [{ rotate: withTiming(isExpanded ? '180deg' : '0deg') }],
  }));

  const prayers = useMemo(() => {
    if (!prayerTimes) return [];
    return [
      { name: SALAHS.FAJR, time: prayerTimes.fajr, icon: 'weather-night' },
      { name: SALAHS.SUNRISE, time: prayerTimes.sunrise, icon: 'weather-sunset-up' },
      { name: SALAHS.DHUHR, time: prayerTimes.dhuhr, icon: 'weather-sunny' },
      { name: SALAHS.ASR, time: prayerTimes.asr, icon: 'weather-sunny' },
      { name: SALAHS.MAGHRIB, time: prayerTimes.maghrib, icon: 'weather-sunset-down' },
      { name: SALAHS.ISHA, time: prayerTimes.isha, icon: 'weather-night' },
    ];
  }, [prayerTimes]);

  if (loading) return <PrayerTimerSkeleton />;
  if (error || !prayerTimes) return <NoData />;

  return (
    <Fragment>
      <Accordion
        type="single"
        collapsible
        className="mt-6"
        value={accordionValue}
        onValueChange={setAccordionValue}
      >
        <AccordionItem value="prayer-card" className="border-none">
          <AccordionTrigger icon={false} asChild>
            <PressableBounce
              bounceScale={0.98}
              className="w-full"
              onPress={() => {
                triggerHaptic();
                setAccordionValue(isExpanded ? undefined : 'prayer-card');
              }}
            >
              <View
                className="rounded-[32px] p-6 overflow-hidden relative min-h-[250px] justify-between border"
                style={{
                  backgroundColor: colors['--accent'],
                  borderColor: hexToRGBA(colors['--accent-foreground'], 0.1),
                }}
              >
                {/* Header Controls */}
                <View className="flex-row justify-end gap-2 z-20">
                  {[
                    { icon: Compass, action: () => router.push('/(screens)/(qibla)/qibla-screen') },
                    { icon: Settings2, action: open },
                  ].map((btn, i) => (
                    <TouchableOpacity
                      key={i}
                      onPress={e => {
                        e.stopPropagation();
                        triggerHaptic();
                        btn.action();
                      }}
                      className="w-10 h-10 items-center justify-center rounded-full"
                      style={{ backgroundColor: hexToRGBA(colors['--background'], 0.15) }}
                    >
                      <btn.icon size={20} color={colors['--accent-foreground']} />
                    </TouchableOpacity>
                  ))}
                </View>

                {/* Main Display */}
                <View className="items-center">
                  <Text
                    className="text-sm font-bold tracking-[3px] uppercase"
                    style={{ color: hexToRGBA(colors['--accent-foreground'], 0.7) }}
                  >
                    {nextPrayer ? t(`common.salahs.${nextPrayer}`) : '--'}
                  </Text>
                  <Text
                    className="text-6xl font-black mt-2 tabular-nums tracking-tighter"
                    style={{ color: colors['--accent-foreground'] }}
                  >
                    {timeLeft}
                  </Text>
                  <View
                    className="px-3 py-1 rounded-full mt-2"
                    style={{ backgroundColor: hexToRGBA(colors['--background'], 0.1) }}
                  >
                    <Text
                      className="text-[10px] font-bold uppercase tracking-widest text-center"
                      style={{ color: colors['--accent-foreground'] }}
                    >
                      {t('qibla.prayerTimes.timeLeft')}
                    </Text>
                  </View>
                </View>

                {/* Footer */}
                <View className="flex-row justify-between items-center mt-4">
                  <View className="flex-row items-center bg-white/5 px-3 py-1.5 rounded-full">
                    <MapPin size={12} color={colors['--accent-foreground']} opacity={0.6} />
                    <Text
                      className="text-[11px] font-medium ml-1.5"
                      style={{ color: colors['--accent-foreground'], opacity: 0.7 }}
                    >
                      {locationName}
                    </Text>
                  </View>

                  <Animated.View
                    style={[
                      chevronStyle,
                      {
                        backgroundColor: hexToRGBA(colors['--accent-foreground'], 0.1),
                        borderRadius: 99,
                        padding: 6,
                      },
                    ]}
                  >
                    <ChevronDown size={18} color={colors['--accent-foreground']} />
                  </Animated.View>
                </View>
              </View>
            </PressableBounce>
          </AccordionTrigger>

          <AccordionContent>
            <View className="pt-4 gap-3">
              {prayers.map(item => {
                const isCurrent = item.name === currentPrayer;
                const activeColor = colors['--primary'];

                return (
                  <View
                    key={item.name}
                    className="flex-row justify-between items-center p-4 rounded-2xl border"
                    style={{
                      backgroundColor: isCurrent ? hexToRGBA(activeColor, 0.08) : colors['--card'],
                      borderColor: isCurrent
                        ? hexToRGBA(activeColor, 0.3)
                        : hexToRGBA(colors['--border'], 0.4),
                    }}
                  >
                    <View className="flex-row items-center gap-4">
                      <View
                        className="w-10 h-10 items-center justify-center rounded-full"
                        style={{ backgroundColor: isCurrent ? activeColor : colors['--muted'] }}
                      >
                        <Icon
                          name={item.icon as any}
                          size={20}
                          color={
                            isCurrent
                              ? colors['--primary-foreground']
                              : colors['--muted-foreground']
                          }
                        />
                      </View>
                      <Text
                        className="text-base font-bold capitalize"
                        style={{ color: isCurrent ? activeColor : colors['--foreground'] }}
                      >
                        {t(`common.salahs.${item.name}`)}
                      </Text>
                    </View>

                    <Text
                      className="text-lg font-bold tabular-nums"
                      style={{ color: isCurrent ? activeColor : colors['--foreground'] }}
                    >
                      {item.time ? format(item.time, 'HH:mm') : '--:--'}
                    </Text>
                  </View>
                );
              })}
            </View>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
      <NotificationPermissionModal />
    </Fragment>
  );
};

export default PrayerTimer;
