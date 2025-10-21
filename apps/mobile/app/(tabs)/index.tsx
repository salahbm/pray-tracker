import confetti from '@assets/gif/confetti.json';
import { format } from 'date-fns';
import LottieView from 'lottie-react-native';
import { useCallback, useEffect, useReducer, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ScrollView, View } from 'react-native';
import { RefreshControl } from 'react-native-gesture-handler';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';

import { DayData } from '@/components/shared/heat-map/heat';
import Loader from '@/components/shared/loader';
import AreaChart from '@/components/views/home/area-chart';
import HomeHeader from '@/components/views/home/header';
import PrayerHistory from '@/components/views/home/prayer-history';
import TodaysPray from '@/components/views/home/todays-pray';
import { PRAYER_POINTS, SALAHS } from '@/constants/enums';
import { useCurrentDate } from '@/hooks/common/useCurrentDate';
import { useGetPrays } from '@/hooks/prays/useGetPrays';
import { useGetTodayPrays } from '@/hooks/prays/useGetTdyPrays';
import { useCreatePray } from '@/hooks/prays/usePostPray';
import { useUpdateOldPray } from '@/hooks/prays/useUpdateOldPray';
import { fireToast } from '@/providers/toaster';
import { useAuthStore } from '@/store/auth/auth-session';
import { useThemeStore } from '@/store/defaults/theme';
import { triggerHaptic } from '@/utils/haptics';

import { ChevronRight } from 'lucide-react-native';
import { Button } from '@/components/ui/button';
import { Text } from '@/components/ui/text';
import { router } from 'expo-router';
import Leaderboard from '@/components/views/awards/leaderboard';

const initialState = {
  prayers: {
    [SALAHS.FAJR]: null,
    [SALAHS.DHUHR]: null,
    [SALAHS.ASR]: null,
    [SALAHS.MAGHRIB]: null,
    [SALAHS.ISHA]: null,
    [SALAHS.NAFL]: null,
  },
  isPickerVisible: false,
  clickedData: null,
  clickedDataPrevious: null,
  accordion: '',
};

function reducer(state: typeof initialState, action: { type: string; payload?: any }) {
  switch (action.type) {
    case 'SET_PRAYERS':
      return { ...state, prayers: action.payload };
    case 'TOGGLE_PICKER':
      return { ...state, isPickerVisible: !state.isPickerVisible };
    case 'SET_CLICKED_DATA':
      return { ...state, clickedData: action.payload };
    case 'SET_CLICKED_DATA_PREVIOUS':
      return { ...state, clickedDataPrevious: action.payload };
    case 'SET_ACCORDION':
      return { ...state, accordion: action.payload };
    default:
      throw new Error(`Unhandled action type: ${action.type}`);
  }
}

export default function HomeScreen() {
  const { t } = useTranslation();
  // DATE STATE
  const today = useCurrentDate();
  const [year, setYear] = useState(today.getFullYear());
  const insets = useSafeAreaInsets();
  const { colors } = useThemeStore();
  // QUERIES
  const { user } = useAuthStore();

  const {
    data: prays,
    isLoading: isLoadingPrays,
    refetch: refetchPrays,
  } = useGetPrays(user?.id!, year);

  const { data: todaysPrays, refetch: refetchTodaysPrays } = useGetTodayPrays(user?.id!);

  // MUTATIONS
  const { mutateAsync: createPray } = useCreatePray();
  const { mutateAsync: updateOldPray } = useUpdateOldPray();

  // Confetti animation ref
  const confettiRef = useRef<LottieView>(null);
  const homeRef = useRef<ScrollView>(null);

  // Reducer for state management
  const [state, dispatch] = useReducer(reducer, initialState);
  const { prayers, clickedData, accordion } = state;

  // FUNCTIONS
  const handlePrayerChange = useCallback(
    async (prayer: string, value: number) => {
      if (prayers[prayer] === value) return;
      if (!user) return fireToast.error(t('Commons.Unauthorized.description'));
      await triggerHaptic();
      if (value === PRAYER_POINTS.ON_TIME) {
        confettiRef.current?.play(0);
      }
      const updatedPrayers = { ...prayers, [prayer]: value };
      await createPray({
        id: user?.id,
        date: today,
        ...updatedPrayers,
      }).then(() => {
        dispatch({ type: 'SET_PRAYERS', payload: updatedPrayers });
      });
    },
    [prayers, createPray, user?.id, today]
  );

  const handleDayClick = useCallback(
    async (date: string, details: { data: DayData | null | undefined }) => {
      // if date is after today, return toast
      const isDateAfterToday = new Date(date) > today;
      if (isDateAfterToday) return fireToast.info(t('Home.Errors.FutureDate'));

      // if today, scroll to top
      if (date === format(today, 'yyyy-MM-dd')) {
        return homeRef.current?.scrollTo({
          y: 0,
          animated: true,
        });
      }
      await triggerHaptic();

      dispatch({
        type: 'SET_CLICKED_DATA',
        payload: { date, details },
      });
      dispatch({
        type: 'SET_CLICKED_DATA_PREVIOUS',
        payload: { date, details },
      });
      dispatch({ type: 'SET_ACCORDION', payload: 'item-1' });
    },
    [today, t]
  );

  const handleUpdateClickedDay = useCallback(
    async (date: string, details: { data: DayData }) => {
      if (!details || !details.data) return;
      await triggerHaptic();

      dispatch({ type: 'SET_CLICKED_DATA', payload: { date, details } });

      // Use updateOldPray for historical dates to avoid cache invalidation conflicts
      await updateOldPray({
        id: user?.id!,
        date: new Date(date),
        ...details.data,
      }).catch(() => {
        dispatch({
          type: 'SET_CLICKED_DATA',
          payload: { date, details: state.clickedDataPrevious },
        });
      });

      // No need to refetch - optimistic update handles it
    },
    [updateOldPray, user?.id]
  );

  useEffect(() => {
    if (!user) {
      return dispatch({
        type: 'SET_PRAYERS',
        payload: { ...initialState.prayers },
      });
    }
    if (!todaysPrays) return;

    dispatch({
      type: 'SET_PRAYERS',
      payload: {
        [SALAHS.FAJR]: todaysPrays?.fajr ?? null,
        [SALAHS.DHUHR]: todaysPrays?.dhuhr ?? null,
        [SALAHS.ASR]: todaysPrays?.asr ?? null,
        [SALAHS.MAGHRIB]: todaysPrays?.maghrib ?? null,
        [SALAHS.ISHA]: todaysPrays?.isha ?? null,
        [SALAHS.NAFL]: todaysPrays?.nafl ?? null,
      },
    });
  }, [todaysPrays, user]);

  return (
    <SafeAreaView className="safe-area">
      <Loader visible={isLoadingPrays} />
      <ScrollView
        showsVerticalScrollIndicator={false}
        ref={homeRef}
        contentContainerStyle={{ paddingBottom: insets.bottom + 50 }}
        className="main-area"
        refreshControl={
          <RefreshControl
            refreshing={isLoadingPrays}
            onRefresh={() => {
              refetchTodaysPrays();
              refetchPrays();
            }}
            tintColor={colors['--primary']}
          />
        }
      >
        {/* HEADER */}
        <HomeHeader today={today} user={user!} />
        {/* Today's Prayers */}
        <TodaysPray prayers={prayers} handlePrayerChange={handlePrayerChange} />
        {/* PRAYER HISTORY */}
        <PrayerHistory
          data={prays}
          dispatch={dispatch}
          year={year}
          setYear={setYear}
          clickedData={clickedData}
          accordion={accordion}
          handleDayClick={handleDayClick}
          handleUpdateClickedDay={handleUpdateClickedDay}
        />
        {/* CHARTS */}
        <AreaChart lineData={prays} />

        <View>
          <View className="flex-row items-center justify-between mt-6">
            <Text className="text-xl font-semibold">{t('Leaderboard.Title')}</Text>
            <Button
              className="flex-row items-center gap-2"
              size="sm"
              variant="ghost"
              onPress={() => router.push('/(screens)/leaderboard/leaders-list')}
            >
              <Text className="text-xs font-extralight">{t('Commons.ViewAll')}</Text>
              <ChevronRight size={12} color={colors['--foreground']} />
            </Button>
          </View>
          <Leaderboard showCount imageClassName="w-24 h-24" />
        </View>

        {/* LOTTIE CONFETTI */}
        <LottieView
          ref={confettiRef}
          source={confetti}
          autoPlay={false}
          loop={false}
          resizeMode="cover"
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            zIndex: -1,
            pointerEvents: 'none',
          }}
        />
      </ScrollView>
    </SafeAreaView>
  );
}
