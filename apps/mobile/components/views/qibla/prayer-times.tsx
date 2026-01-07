import Icon from '@expo/vector-icons/MaterialCommunityIcons';
import { CalculationMethod, Coordinates, PrayerTimes } from 'adhan';
import { format } from 'date-fns';
import * as Location from 'expo-location';
import { Settings2Icon } from 'lucide-react-native';
import { useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Alert, FlatList, Text, View } from 'react-native';

import Loader from '@/components/shared/loader';
import NoData from '@/components/shared/no-data';
import { Button } from '@/components/ui/button';
import { SALAHS } from '@/constants/enums';
import useTimeLeft from '@/hooks/common/useTimeLeft';
import { cn } from '@/lib/utils';
import { usePrayNotifierBottomSheetStore } from '@/store/bottom-sheets/pray-notifier.sheet';
import { useThemeStore } from '@/store/defaults/theme';
import { triggerHaptic } from '@/utils';

const PrayerTimer = () => {
  const { t } = useTranslation();
  const [prayerTimes, setPrayerTimes] = useState<PrayerTimes | null>(null);
  const [location, setLocation] = useState(t('qibla.prayerTimes.location.fetching'));
  const { open } = usePrayNotifierBottomSheetStore();

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const { colors } = useThemeStore();

  useEffect(() => {
    (async () => {
      setLoading(true);
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert(t('qibla.prayerTimes.errors.title'), t('qibla.prayerTimes.errors.message'));
        setError(true);
        setLoading(false);
        return;
      }

      const userLocation = await Location.getCurrentPositionAsync({});
      const coordinates = new Coordinates(
        userLocation.coords.latitude,
        userLocation.coords.longitude
      );
      const params = CalculationMethod.MoonsightingCommittee();
      const date = new Date();
      setPrayerTimes(new PrayerTimes(coordinates, date, params));

      const reverseGeocode = await Location.reverseGeocodeAsync({
        latitude: userLocation.coords.latitude,
        longitude: userLocation.coords.longitude,
      });

      if (reverseGeocode.length > 0) {
        const { city, region, country } = reverseGeocode[0];
        const unknown = t('qibla.prayerTimes.location.unknown');
        setLocation(`${city || unknown}, ${region || unknown}, ${country || unknown}`);
      }

      setLoading(false);
    })();
  }, [t]);

  const { timeLeft, currentPrayer } = useTimeLeft(prayerTimes as PrayerTimes);

  const prayers = useMemo(
    () => [
      {
        name: SALAHS.FAJR,
        time: prayerTimes?.fajr,
        icon: 'weather-night',
      },
      {
        name: SALAHS.SUNRISE,
        time: prayerTimes?.sunrise,
        icon: 'weather-sunset-up',
      },
      {
        name: SALAHS.DHUHR,
        time: prayerTimes?.dhuhr,
        icon: 'weather-sunny',
      },
      {
        name: SALAHS.ASR,
        time: prayerTimes?.asr,
        icon: 'weather-sunny',
      },
      {
        name: SALAHS.MAGHRIB,
        time: prayerTimes?.maghrib,
        icon: 'weather-sunset-down',
      },
      {
        name: SALAHS.ISHA,
        time: prayerTimes?.isha,
        icon: 'weather-night',
      },
    ],
    [prayerTimes]
  );

  if (loading) {
    return (
      <View className="items-center h-full">
        <Loader visible={loading} className="bg-background" />
      </View>
    );
  }

  if (error || !prayerTimes) {
    return <NoData className="mt-[45%]" />;
  }

  return (
    <View className="py-4 h-full">
      <View className="bg-accent p-6 rounded-2xl mb-6 shadow-lg relative">
        <Button
          hitSlop={24}
          size="icon"
          variant="ghost"
          className="absolute top-2 right-2"
          onPress={async () => {
            await triggerHaptic();
            open();
          }}
        >
          <Settings2Icon className="size-8" color={colors['--accent-foreground']} />
        </Button>
        <Text className="text-accent-foreground text-5xl font-extrabold text-center">
          {timeLeft}
        </Text>
        <Text className="text-muted text-sm text-center">{t('qibla.prayerTimes.timeLeft')}</Text>
        <Text className="text-foreground text-lg text-center mt-3">{location}</Text>
      </View>

      <FlatList
        data={prayers}
        keyExtractor={item => item.name}
        ListEmptyComponent={() => <NoData className="mt-[45%]" />}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 200 }}
        renderItem={({ item }) => {
          const currentSalah = item?.name === currentPrayer;
          return (
            <View
              className={cn(
                'flex-row justify-between items-center p-5 rounded-xl mb-3',
                currentSalah ? 'bg-accent shadow-sm' : 'bg-popover'
              )}
            >
              <Icon
                name={item.icon as 'weather-sunset-up' | 'weather-sunny'}
                size={24}
                color={currentSalah ? colors['--accent-foreground'] : colors['--muted-foreground']}
              />
              <Text
                className={cn(
                  'text-lg font-semibold capitalize',
                  currentSalah ? 'text-accent-foreground' : 'text-muted-foreground'
                )}
              >
                {t(`common.salahs.${item?.name}`)}
              </Text>
              <Text
                className={cn(
                  'text-lg font-semibold',
                  currentSalah ? 'text-accent-foreground' : 'text-muted-foreground'
                )}
              >
                {item?.time && format(item?.time, 'HH:mm')}
              </Text>
            </View>
          );
        }}
      />
    </View>
  );
};

export default PrayerTimer;
