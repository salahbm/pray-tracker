import React, { useMemo, useRef, useState, useCallback, useEffect } from 'react';
import {
  View,
  useWindowDimensions,
  Pressable,
  ActivityIndicator,
  Keyboard,
  FlatList,
  RefreshControl,
} from 'react-native';
import BottomSheet, {
  BottomSheetTextInput,
  BottomSheetFlatList,
  BottomSheetView,
  BottomSheetBackdrop,
  BottomSheetBackdropProps,
} from '@gorhom/bottom-sheet';
import { format, parse } from 'date-fns';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { useTranslation } from 'react-i18next';

import { Button } from '@/components/ui/button';
import { Text } from '@/components/ui/text';
import { useRamadanCalendar } from '@/hooks/ramadan/useRamadanCalendar';
import { cn } from '@/lib/utils';
import { useLocationStore } from '@/store/use-location';
import GoBack from '@/components/shared/go-back';

const parseGregorianDate = (dateValue: string) => parse(dateValue, 'dd-MM-yyyy', new Date());
const ITEM_HEIGHT = 150;

const useDebounce = (value: string, delay = 400) => {
  const [debounced, setDebounced] = useState(value);
  useEffect(() => {
    const t = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(t);
  }, [value, delay]);
  return debounced;
};

const RamadanScreen = () => {
  const insets = useSafeAreaInsets();
  const sheetRef = useRef<BottomSheet>(null);
  const listRef = useRef<FlatList>(null);
  const { width } = useWindowDimensions();
  const { city, country, setLocation } = useLocationStore();
  const { t } = useTranslation();

  const [searchQuery, setSearchQuery] = useState('');
  const debouncedSearch = useDebounce(searchQuery);

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

  const numColumns = width > 520 ? 3 : 2;

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
          viewPosition: 0.2,
        });
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [todayIndex, monthDays.length]);

  const getItemLayout = (_: any, index: number) => ({
    length: ITEM_HEIGHT,
    offset: ITEM_HEIGHT * Math.floor(index / numColumns),
    index,
  });

  const { data: locationResults = [], isFetching: isSearching } = useQuery({
    queryKey: ['locationSearch', debouncedSearch],
    queryFn: async () => {
      if (debouncedSearch.length < 3) return [];

      const res = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&addressdetails=1&limit=5&q=${encodeURIComponent(
          debouncedSearch
        )}`,
        {
          headers: {
            Accept: 'application/json',
            'User-Agent': 'RamadanApp/1.0 (contact@example.com)', // REQUIRED by Nominatim
          },
        }
      );

      if (!res.ok) {
        console.warn('Location search failed:', res.status);
        return [];
      }

      const contentType = res.headers.get('content-type') || '';
      if (!contentType.includes('application/json')) {
        console.warn('Non-JSON response from location API');
        return [];
      }

      return res.json();
    },
    enabled: debouncedSearch.length >= 3,
    staleTime: 1000 * 60,
    placeholderData: keepPreviousData,
  });

  const handleSelectLocation = (item: any) => {
    const cityName = item.address?.city || item.address?.town || item.name;
    const countryName = item.address?.country || '';
    setLocation(cityName, countryName);
    setSearchQuery('');
    sheetRef.current?.close();
    Keyboard.dismiss();
  };

  const renderBackdrop = useCallback(
    (props: BottomSheetBackdropProps) => (
      <BottomSheetBackdrop {...props} disappearsOnIndex={-1} appearsOnIndex={0} />
    ),
    []
  );

  return (
    <View className="flex-1 bg-background" style={{ paddingTop: insets.top + 20 }}>
      <View className="px-5 pb-1">
        <GoBack title={t('ramadan.screen.title')} />
        <View className="rounded-3xl border border-border bg-card p-5 shadow-sm">
          <View className="flex-row justify-between items-start">
            <View>
              <Text className="text-[10px] font-bold uppercase tracking-widest text-primary">
                {monthDays.length > 0
                  ? t('ramadan.screen.headerLabel', { year: monthDays[0].hijriYear })
                  : t('ramadan.screen.headerLabelFallback')}
              </Text>
              <Text className="text-2xl font-bold tracking-tight mt-1">
                {monthDays.length > 0
                  ? t('ramadan.screen.monthLabel', {
                      month: monthDays[0].hijriMonthName,
                      year: monthDays[0].hijriYear,
                    })
                  : format(today, 'MMMM yyyy')}
              </Text>
            </View>
            <Button
              size="sm"
              variant="secondary"
              className="rounded-xl"
              onPress={() => sheetRef.current?.snapToIndex(1)}
            >
              <Text className="text-xs font-bold">{t('ramadan.screen.changeLocation')}</Text>
            </Button>
          </View>
          <View className="mt-4 flex-row items-center">
            <View className="h-2 w-2 rounded-full bg-green-500 mr-2" />
            <Text className="text-sm font-medium text-muted-foreground">
              {t('ramadan.screen.locationLabel', { city, country })}
            </Text>
          </View>
        </View>
      </View>

      <FlatList
        ref={listRef}
        data={monthDays}
        key={`${numColumns}`}
        numColumns={numColumns}
        keyExtractor={item => item.gregorianDate}
        getItemLayout={getItemLayout}
        columnWrapperStyle={{ paddingHorizontal: 16 }}
        contentContainerStyle={{ paddingBottom: 100 }}
        showsVerticalScrollIndicator={false}
        refreshControl={<RefreshControl refreshing={isLoading} onRefresh={refetch} />}
        renderItem={({ item, index }) => {
          const gDate = parseGregorianDate(item.gregorianDate);
          const isToday = index === todayIndex;

          return (
            <View style={{ width: `${100 / numColumns}%`, height: ITEM_HEIGHT }} className="p-1.5">
              <View
                className={cn(
                  'flex-1 rounded-2xl border p-4 justify-between',
                  isToday ? 'border-primary bg-primary/5' : 'border-border bg-card'
                )}
              >
                <View className="flex-row justify-between items-start">
                  <View>
                    <Text
                      className={cn(
                        'text-base font-bold',
                        isToday ? 'text-primary' : 'text-foreground'
                      )}
                    >
                      {format(gDate, 'd MMM')}
                    </Text>
                    <Text className="text-[10px] text-muted-foreground">
                      {t('ramadan.screen.dayLabel', { day: item.hijriDay })}
                    </Text>
                  </View>
                  {isToday && (
                    <View className="bg-primary px-2 py-0.5 rounded-full">
                      <Text className="text-[8px] font-bold text-primary-foreground uppercase">
                        {t('common.today')}
                      </Text>
                    </View>
                  )}
                </View>

                <View className="space-y-1">
                  <View className="flex-row justify-between items-center">
                    <Text className="text-[9px] font-bold text-muted-foreground uppercase">
                      {t('ramadan.screen.suhoor')}
                    </Text>
                    <Text className="text-xs font-bold">{item.fajr.split(' ')[0]}</Text>
                  </View>
                  <View className="flex-row justify-between items-center">
                    <Text className="text-[9px] font-bold text-orange-500 uppercase">
                      {t('ramadan.screen.iftar')}
                    </Text>
                    <Text className="text-xs font-bold">{item.maghrib.split(' ')[0]}</Text>
                  </View>
                </View>
              </View>
            </View>
          );
        }}
      />

      <BottomSheet
        ref={sheetRef}
        index={-1}
        snapPoints={['60%', '80%']}
        enablePanDownToClose
        backdropComponent={renderBackdrop}
        handleIndicatorStyle={{ backgroundColor: '#e2e2e2' }}
      >
        <BottomSheetView className="flex-1 px-6 py-10">
          <Text className="text-xl font-bold mb-4">{t('ramadan.screen.searchLocation')}</Text>
          <View className="relative">
            <BottomSheetTextInput
              placeholder={t('ramadan.screen.searchPlaceholder')}
              value={searchQuery}
              onChangeText={setSearchQuery}
              className="h-16 rounded-2xl border border-border pr-2 pl-4 placeholder:text-muted-foreground"
            />
            {isSearching && <ActivityIndicator className="absolute right-4 top-3" />}
          </View>

          <BottomSheetFlatList
            data={locationResults}
            keyExtractor={(item, i) => i.toString()}
            contentContainerStyle={{ paddingTop: 20, paddingBottom: 40 }}
            renderItem={({ item }) => (
              <Pressable
                onPress={() => handleSelectLocation(item)}
                className="mb-2 p-4 rounded-2xl border border-border bg-card active:bg-muted"
              >
                <Text className="font-bold text-base">
                  {item.address?.city || item.address?.town || item.name}
                </Text>
                <Text className="text-xs text-muted-foreground">{item.address?.country}</Text>
              </Pressable>
            )}
            ListEmptyComponent={() =>
              debouncedSearch.length > 2 && !isSearching ? (
                <Text className="text-center text-muted-foreground mt-10">
                  {t('ramadan.screen.noCities')}
                </Text>
              ) : null
            }
          />
        </BottomSheetView>
      </BottomSheet>
    </View>
  );
};

export default RamadanScreen;
