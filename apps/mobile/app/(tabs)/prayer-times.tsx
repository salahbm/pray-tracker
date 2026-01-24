import { useMemo, useRef } from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { useTranslation } from 'react-i18next';
import { format } from 'date-fns';
import BottomSheet, { BottomSheetModal } from '@gorhom/bottom-sheet';
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
  Calculator,
  ChevronRight,
} from '@/components/shared/icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

// Components
import NoData from '@/components/shared/no-data';
import { NotificationPermissionModal } from '@/components/shared/modals/notification-permission-modal';
import PrayerTimerSkeleton from '@/components/views/qibla/prayer-time-skeleton';
import { LocationSelector } from '@/components/shared/location-selector';
import { CalculationMethodSelector } from '@/components/views/qibla/calculation-method-selector';

// Logic & Store
import useTimeLeft from '@/hooks/common/useTimeLeft';
import { usePrayNotifierBottomSheetStore } from '@/store/bottom-sheets/pray-notifier.sheet';
import { SALAHS } from '@/constants/enums';
import { usePrayerData } from '@/hooks/prays/useGetPayingTimes';
import { Link } from 'expo-router';
import { triggerHaptic } from '@/utils';
import { cn } from '@/lib/utils';
import { useQibla } from '@/hooks/prays/useQibla';

const PrayerTimer = () => {
  useQibla();
  const { t } = useTranslation();
  const insets = useSafeAreaInsets();
  const { open } = usePrayNotifierBottomSheetStore();
  const locationSheetRef = useRef<BottomSheetModal>(null);
  const calculationMethodSheetRef = useRef<BottomSheetModal>(null);
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
      {/* HEADER: Now focused on Global Settings
       */}
      <View
        className="flex-row justify-between items-center px-6 pb-4"
        style={{ paddingTop: insets.top + 10 }}
      >
        <TouchableOpacity
          className="flex-row items-center gap-2 opacity-80"
          onPress={() => {
            triggerHaptic();
            locationSheetRef.current?.present();
          }}
        >
          <MapPin size={20} className="text-primary" />
          <Text className="text-md font-medium text-foreground/80 truncate max-w-[200px]">
            {locationName || t('common.locating')}
          </Text>
        </TouchableOpacity>

        <View className="flex-row gap-3">
          {[
            { icon: Calculator, action: () => calculationMethodSheetRef.current?.present() },
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
        {/* HERO SECTION: Countdown + Qibla Integration
         */}
        <View className="mb-6 rounded-2xl bg-primary p-6 shadow-xl shadow-primary/30 relative overflow-hidden">
          {/* Decorative Background Elements */}
          <View className="absolute -right-10 -top-10 w-48 h-48 bg-white/10 rounded-full" />
          <View className="absolute -left-5 -bottom-5 w-24 h-24 bg-white/5 rounded-full" />

          <View className="items-center py-6">
            <Text className="text-xs font-bold tracking-[4px] uppercase text-primary-foreground/60 mb-1">
              {nextPrayer ? t(`common.salahs.${nextPrayer}`) : '--'}
            </Text>

            <Text className="text-7xl font-black tabular-nums tracking-tighter text-primary-foreground">
              {timeLeft}
            </Text>

            <View className="bg-white/20 px-4 py-1.5 rounded-full mt-4 backdrop-blur-md">
              <Text className="text-[11px] font-bold text-primary-foreground uppercase tracking-wider">
                {t('qibla.prayerTimes.timeLeft')}
              </Text>
            </View>
          </View>

          {/* QIBLA NAVIGATION: Contextual Placement */}
          <Link href="/(screens)/(qibla)/qibla-screen" asChild>
            <TouchableOpacity onPress={() => triggerHaptic()} activeOpacity={0.7}>
              <View className="mt-4 flex-row items-center justify-between bg-white/10 w-full border border-white/20 p-4 rounded-2xl backdrop-blur-xl">
                <View className="flex-row items-center gap-3">
                  <View className="bg-primary-foreground p-2 rounded-full">
                    <Compass size={20} className="text-primary" />
                  </View>
                  <View>
                    <Text className="text-primary-foreground font-bold text-sm">
                      {t('common.qibla.title')}
                    </Text>
                    <Text className="text-primary-foreground/70 text-xs">
                      {t('common.qibla.description')}
                    </Text>
                  </View>
                </View>
                <ChevronRight size={18} className="text-primary-foreground/50" />
              </View>
            </TouchableOpacity>
          </Link>
        </View>

        {error || !prayerTimes || !prayers.length ? (
          <NoData className="mt-[30%]" />
        ) : (
          <View className="gap-3 mt-6">
            <Text className="text-sm font-bold text-muted-foreground px-1 mb-1 tracking-widest uppercase">
              {t('common.today_schedule')}
            </Text>

            {prayers?.map(item => {
              const isCurrent = item.name === currentPrayer;
              const Icon = item.icon;

              return (
                <View
                  key={item.name}
                  className={cn('flex-row justify-between items-center p-4 rounded-2xl border', {
                    'bg-primary/5 border-primary/20': isCurrent,
                    'bg-card border-border/40': !isCurrent,
                  })}
                >
                  <View className="flex-row items-center gap-4">
                    <View
                      className={cn('w-11 h-11 items-center justify-center rounded-xl', {
                        'bg-primary': isCurrent,
                        'bg-muted/40': !isCurrent,
                      })}
                    >
                      <Icon
                        size={20}
                        className={cn('size-5', {
                          'text-primary-foreground': isCurrent,
                          'text-muted-foreground': !isCurrent,
                        })}
                      />
                    </View>

                    <View>
                      <Text
                        className={cn('text-[15px] font-bold', {
                          'text-foreground': isCurrent,
                          'text-muted-foreground': !isCurrent,
                        })}
                      >
                        {t(`common.salahs.${item.name}`)}
                      </Text>
                      {isCurrent && (
                        <View className="flex-row items-center gap-1 mt-0.5">
                          <View className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
                          <Text className="text-[10px] uppercase font-bold text-primary tracking-tighter">
                            {t('common.now')}
                          </Text>
                        </View>
                      )}
                    </View>
                  </View>

                  <Text
                    className={cn('text-lg font-bold tabular-nums', {
                      'text-primary': isCurrent,
                      'text-foreground/70': !isCurrent,
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
      <LocationSelector sheetRef={locationSheetRef} />
      <CalculationMethodSelector ref={calculationMethodSheetRef} />
      <NotificationPermissionModal />
    </View>
  );
};

export default PrayerTimer;
