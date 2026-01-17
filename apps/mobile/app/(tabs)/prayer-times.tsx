import { useMemo, useRef } from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { useTranslation } from 'react-i18next';
import { format } from 'date-fns';
import BottomSheet from '@gorhom/bottom-sheet';
import {
  Settings2,
  Compass,
  MapPin,
  Sunrise,
  SunMoon,
  Sunset,
  Sun,
  MoonStar,
  SunDim,
} from '@/components/shared/icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

// Components
import NoData from '@/components/shared/no-data';
import { NotificationPermissionModal } from '@/components/shared/modals/notification-permission-modal';
import PrayerTimerSkeleton from '@/components/views/qibla/prayer-time-skeleton';
import { LocationSelector } from '@/components/shared/location-selector';

// Logic & Store
import useTimeLeft from '@/hooks/common/useTimeLeft';
import { usePrayNotifierBottomSheetStore } from '@/store/bottom-sheets/pray-notifier.sheet';
import { SALAHS } from '@/constants/enums';
import { usePrayerData } from '@/hooks/prays/useGetPayingTimes';
import { router } from 'expo-router';
import { triggerHaptic } from '@/utils';
import { cn } from '@/lib/utils';
import { useQibla } from '@/hooks/prays/useQibla';

const PrayerTimer = () => {
  useQibla();
  const { t } = useTranslation();
  const insets = useSafeAreaInsets();
  const { open } = usePrayNotifierBottomSheetStore();
  const locationSheetRef = useRef<BottomSheet>(null);
  const { prayerTimes, locationName, loading, error } = usePrayerData();
  const { timeLeft, currentPrayer, nextPrayer } = useTimeLeft(prayerTimes);

  const prayers = useMemo(() => {
    if (!prayerTimes) return [];
    return [
      { name: SALAHS.FAJR, time: prayerTimes.fajr, icon: SunMoon },
      { name: SALAHS.SUNRISE, time: prayerTimes.sunrise, icon: Sunrise },
      { name: SALAHS.DHUHR, time: prayerTimes.dhuhr, icon: Sun },
      { name: SALAHS.ASR, time: prayerTimes.asr, icon: SunDim },
      { name: SALAHS.MAGHRIB, time: prayerTimes.maghrib, icon: Sunset },
      { name: SALAHS.ISHA, time: prayerTimes.isha, icon: MoonStar },
    ];
  }, [prayerTimes]);

  if (loading) return <PrayerTimerSkeleton />;

  return (
    <View className="flex-1 bg-background">
      {/* Header: Fixed at top. 
        UX Improvement: Buttons are subtle (secondary) so they don't distract from the time.
      */}
      <View
        className="flex-row justify-between items-center px-6 pb-4"
        style={{ paddingTop: insets.top + 10 }}
      >
        <TouchableOpacity
          className="flex-row items-center gap-2 opacity-80"
          onPress={() => {
            triggerHaptic();
            locationSheetRef.current?.expand();
          }}
        >
          <MapPin size={20} className="text-primary" />
          <Text className="text-md font-medium text-foreground/80 truncate max-w-[200px]">
            {locationName || t('common.locating')}
          </Text>
        </TouchableOpacity>

        <View className="flex-row gap-3">
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
              className="p-2.5 rounded-full bg-muted/30 border border-border"
            >
              <btn.icon className="text-primary-600 size-5" />
            </TouchableOpacity>
          ))}
        </View>
      </View>

      <ScrollView
        className="flex-1 px-4"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: insets.bottom + 80 }}
      >
        {/* Hero Section: The Main Countdown.
           UI Improvement: Clean typography, removed the "Accordion" chevron.
        */}
        <View className="mb-6 rounded-3xl bg-primary p-6 shadow-lg shadow-primary/20 min-h-[200px] relative overflow-hidden">
          {/* Background Decoration Circle */}
          <View className="absolute -right-10 -top-10 w-40 h-40 bg-primary-foreground/5 rounded-full blur-2xl" />

          <View className="items-center py-4">
            <Text className="text-sm font-bold tracking-[4px] uppercase text-primary-foreground/60 mb-1">
              {nextPrayer ? t(`common.salahs.${nextPrayer}`) : '--'}
            </Text>

            <Text className="text-7xl font-black tabular-nums tracking-tighter text-primary-foreground">
              {timeLeft}
            </Text>

            <View className="bg-primary-foreground/10 px-4 py-1.5 rounded-full mt-3">
              <Text className="text-xs font-semibold text-primary-foreground/80">
                {t('qibla.prayerTimes.timeLeft')}
              </Text>
            </View>
          </View>
        </View>

        {/* Prayer List
           UX Improvement: List is visible immediately (no accordion).
           UI Improvement: "Current" prayer has a distinct left border and background tint.
        */}
        {error || !prayerTimes ? (
          <NoData className="mt-[30%]" />
        ) : (
          <View className="gap-3">
            {prayers.map(item => {
              const isCurrent = item.name === currentPrayer;
              const isNext = item.name === nextPrayer;
              const Icon = item.icon;

              return (
                <View
                  key={item.name}
                  className={cn(
                    'flex-row justify-between items-center p-4 rounded-xl border mb-1',
                    {
                      'bg-primary/5 border-primary/30 border-l-4 border-l-primary': isCurrent, // Active styling
                      'bg-background/90 border-border/50': !isCurrent, // Inactive styling
                      'opacity-50': !isCurrent && !isNext && item.time < new Date(), // Past prayers dimmed slightly (optional logic)
                    }
                  )}
                >
                  <View className="flex-row items-center gap-4">
                    <View
                      className={cn('w-10 h-10 items-center justify-center rounded-full', {
                        'bg-primary text-primary-foreground': isCurrent,
                        'bg-muted/50': !isCurrent,
                      })}
                    >
                      <Icon
                        className={cn('size-5', {
                          'text-primary-foreground': isCurrent,
                          'text-muted-foreground': !isCurrent,
                        })}
                      />
                    </View>

                    <View>
                      <Text
                        className={cn('text-base font-bold capitalize', {
                          'text-foreground': isCurrent,
                          'text-muted-foreground': !isCurrent,
                        })}
                      >
                        {t(`common.salahs.${item.name}`)}
                      </Text>
                      {isCurrent && (
                        <Text className="text-[10px] uppercase font-bold text-primary tracking-wider">
                          Now
                        </Text>
                      )}
                    </View>
                  </View>

                  <Text
                    className={cn('text-lg font-bold tabular-nums', {
                      'text-primary': isCurrent,
                      'text-foreground': !isCurrent,
                    })}
                  >
                    {item.time ? format(item.time, 'HH:mm') : '--:--'}
                  </Text>
                </View>
              );
            })}
          </View>
        )}
      </ScrollView>

      <NotificationPermissionModal />
      <LocationSelector sheetRef={locationSheetRef} />
    </View>
  );
};

export default PrayerTimer;
