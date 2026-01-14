import { useMemo, useRef, useEffect, Fragment } from 'react';
import { View, FlatList, RefreshControl } from 'react-native';
import BottomSheet from '@gorhom/bottom-sheet';
import { format, parse } from 'date-fns';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useTranslation } from 'react-i18next';

import { Text } from '@/components/ui/text';
import { useRamadanCalendar } from '@/hooks/ramadan/useRamadanCalendar';
import { cn } from '@/lib/utils';
import { useLocationStore } from '@/store/use-location';
import { MapPin, ChevronLeft, Moon, Sun } from '@/components/shared/icons';
import { PressableBounce } from '@/components/shared/pressable-bounce';
import { LocationSelector } from '@/components/shared/location-selector';
import { router } from 'expo-router';
import NoData from '@/components/shared/no-data';
import Skeleton from '@/components/ui/skeleton';

const parseGregorianDate = (dateValue: string) => parse(dateValue, 'dd-MM-yyyy', new Date());
const ITEM_HEIGHT = 150;

const RamadanScreen = () => {
  const insets = useSafeAreaInsets();
  const locationSheetRef = useRef<BottomSheet>(null);
  const listRef = useRef<FlatList>(null);
  const { city, country } = useLocationStore();
  const { t } = useTranslation();

  const today = useMemo(() => new Date(), []);

  const {
    data: monthDays = [],
    isLoading,
    refetch,
  } = useRamadanCalendar({
    city,
    country,
    month: today.getMonth() + 1,
    year: today.getFullYear(),
  });

  const todayIndex = useMemo(() => {
    return monthDays.findIndex(
      d => format(parseGregorianDate(d.gregorianDate), 'yyyy-MM-dd') === format(today, 'yyyy-MM-dd')
    );
  }, [monthDays, today]);

  useEffect(() => {
    if (todayIndex >= 0 && monthDays.length > 0) {
      const timer = setTimeout(() => {
        listRef.current?.scrollToIndex({
          index: todayIndex,
          animated: true,
          viewPosition: 0.5,
        });
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [todayIndex, monthDays.length]);

  const getItemLayout = (_: any, index: number) => ({
    length: ITEM_HEIGHT,
    offset: ITEM_HEIGHT * Math.floor(index / 2),
    index,
  });

  return (
    <View className="flex-1 bg-background">
      {/* 1. STICKY HEADER AREA */}
      <View
        className="bg-primary-700/5 z-10 pb-2 border-b border-border/40"
        style={{ paddingTop: insets.top }}
      >
        <View className="px-4 py-2 flex-row items-center justify-between">
          {/* Custom GoBack Wrapper */}
          <PressableBounce
            onPress={() => router.back()}
            className="p-2 -ml-2 rounded-full active:bg-muted"
          >
            <ChevronLeft size={24} className="text-foreground" />
          </PressableBounce>
          <Text className="text-lg font-bold">{t('ramadan.screen.title')}</Text>
          <View className="w-8" />
        </View>

        {/* Month & Location Bar */}
        <View className="px-6 mt-2 flex-row justify-between items-end pb-4">
          <View>
            <Text className="text-xs font-bold text-primary uppercase tracking-widest mb-1">
              {monthDays.length > 0 ? monthDays[0].hijriYear + ' AH' : '--'}
            </Text>
            <Text className="text-3xl font-black text-foreground tracking-tight">
              {monthDays.length > 0 ? monthDays[0].hijriMonthName : format(today, 'MMMM')}
            </Text>
          </View>

          <PressableBounce
            onPress={() => locationSheetRef.current?.snapToIndex(0)}
            className="flex-row items-center bg-muted/50 border border-border px-3 py-1.5 rounded-full"
          >
            <MapPin size={12} className="text-primary mr-1.5" />
            <Text
              className="text-xs font-semibold text-foreground/80 max-w-[100px]"
              numberOfLines={1}
            >
              {city}
            </Text>
          </PressableBounce>
        </View>
      </View>

      {/* 2. CALENDAR GRID */}
      <FlatList
        ref={listRef}
        data={monthDays}
        key={2} // Force re-render on orientation change
        numColumns={2}
        keyExtractor={item => item.gregorianDate}
        getItemLayout={getItemLayout}
        contentContainerStyle={{
          paddingHorizontal: 12,
          paddingBottom: insets.bottom + 20,
          paddingTop: 16,
        }}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={isLoading} onRefresh={refetch} tintColor="gray" />
        }
        ListEmptyComponent={() => {
          return (
            <View className="flex-1 items-center justify-center flex-row">
              {Array.from({ length: 13 }).map((_, index) => (
                <View style={{ width: `${100 / 2}%` }} className="p-1.5">
                  <View className="flex-1 rounded-2xl p-3 aspect-video justify-between bg-background/50 border border-border/40 min-h-[110px]">
                    <Skeleton className="h-4 w-20" />
                    <Skeleton className="h-4 w-20" />
                    <Skeleton className="h-4 w-20" />
                  </View>
                </View>
              ))}
            </View>
          );
        }}
        renderItem={({ item, index }) => {
          const gDate = parseGregorianDate(item.gregorianDate);
          const isToday = index === todayIndex;

          return (
            <View style={{ width: `${100 / 2}%` }} className="p-1.5">
              <View
                className={cn(
                  'flex-1 rounded-2xl p-3 justify-between min-h-[110px]',
                  isToday
                    ? 'bg-background border-2 border-primary shadow-lg shadow-primary/10'
                    : 'bg-card border border-border/40'
                )}
              >
                {/* Date Header */}
                <View className="flex-row justify-between items-start">
                  <View className="items-center">
                    <Text
                      className={cn(
                        'text-lg font-bold leading-5',
                        isToday ? 'text-primary' : 'text-foreground'
                      )}
                    >
                      {format(gDate, 'd')}
                    </Text>
                    <Text className="text-[9px] text-muted-foreground uppercase font-bold">
                      {format(gDate, 'MMM')}
                    </Text>
                  </View>

                  <View
                    className={cn('px-1.5 py-0.5 rounded-md', isToday ? 'bg-primary' : 'bg-muted')}
                  >
                    <Text
                      className={cn(
                        'text-[10px] font-bold',
                        isToday ? 'text-primary-foreground' : 'text-muted-foreground'
                      )}
                    >
                      {item.hijriDay}
                    </Text>
                  </View>
                </View>

                {/* Timings */}
                <View className="mt-3 gap-1.5">
                  <View className="flex-row justify-between items-center">
                    <View className="flex-row items-center gap-1 opacity-60">
                      <Moon size={10} className="text-indigo-400" />
                      <Text className="text-[9px] text-muted-foreground">Suhoor</Text>
                    </View>
                    <Text className="text-[11px] font-bold tabular-nums">
                      {item.fajr.split(' ')[0]}
                    </Text>
                  </View>

                  <View className="flex-row justify-between items-center">
                    <View className="flex-row items-center gap-1 opacity-60">
                      <Sun size={10} className="text-amber-500" />
                      <Text className="text-[9px] text-muted-foreground">Iftar</Text>
                    </View>
                    <Text className="text-[11px] font-bold tabular-nums">
                      {item.maghrib.split(' ')[0]}
                    </Text>
                  </View>
                </View>
              </View>
            </View>
          );
        }}
      />

      {/* 3. LOCATION SHEET */}
      <LocationSelector sheetRef={locationSheetRef} />
    </View>
  );
};

export default RamadanScreen;
