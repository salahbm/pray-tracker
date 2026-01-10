import confetti from '@assets/gif/confetti.json';
import { format } from 'date-fns';
import { router, useFocusEffect } from 'expo-router';
import LottieView from 'lottie-react-native';
import { ChevronRight } from 'lucide-react-native';
import { Fragment, useCallback, useEffect, useReducer, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ScrollView, View } from 'react-native';
import { RefreshControl } from 'react-native-gesture-handler';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import CustomBottomSheet from '@/components/shared/bottom-sheet';
import { DayData } from '@/components/shared/heat-map/heat';
import { Button } from '@/components/ui/button';
import { Text } from '@/components/ui/text';
import Leaderboard from '@/components/views/awards/leaderboard';
import AreaChart from '@/components/views/home/area-chart';
import HomeHeader from '@/components/views/home/header';
import PrayerHistory from '@/components/views/home/prayer-history';
import TodaysPray from '@/components/views/home/todays-pray';
import { PRAYER_POINTS, SALAHS } from '@/constants/enums';
import { useDateSync } from '@/hooks/common/useDateSync';
import { useGetGlobalLeaderboard } from '@/hooks/leaderboard';
import { useGetPrays } from '@/hooks/prays/useGetPrays';
import { useGetTodayPrays } from '@/hooks/prays/useGetTdyPrays';
import { PrayerField, usePatchPray } from '@/hooks/prays/usePatchPray';
import { useRevenueCatCustomer } from '@/hooks/subscriptions/useRevenueCat';
import { fireToast } from '@/providers/toaster';
import { useAuthStore } from '@/store/auth/auth-session';
import { usePaywallBottomSheetStore, useProfileBottomSheetStore } from '@/store/bottom-sheets';
import { useAppRatingStore } from '@/store/defaults/app-rating';
import { useThemeStore } from '@/store/defaults/theme';
import { triggerHaptic } from '@/utils/haptics';

import ProfilePage from '../(screens)/profile';

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
  const [today, setToday] = useState(new Date());
  const [year, setYear] = useState(new Date().getFullYear());

  // Update date when screen comes into focus
  useFocusEffect(
    useCallback(() => {
      const now = new Date();
      setToday(now);
      setYear(now.getFullYear());
    }, [])
  );

  // Automatically update date when midnight passes
  useDateSync(
    useCallback(() => {
      const now = new Date();
      setToday(now);
      setYear(now.getFullYear());
    }, [])
  );

  const insets = useSafeAreaInsets();
  const { colors } = useThemeStore();
  // QUERIES
  const { user } = useAuthStore();
  const { refetch: refetchCustomer, isPremium } = useRevenueCatCustomer();
  const { paywallSheetRef } = usePaywallBottomSheetStore();

  const {
    data: prays,
    isLoading: isLoadingPrays,
    refetch: refetchPrays,
  } = useGetPrays(user?.id!, year);

  const { data: todaysPrays, refetch: refetchTodaysPrays } = useGetTodayPrays(user?.id!, today);
  const {
    data: leaderboard,
    isLoading: isLoadingLeaderboard,
    refetch: refetchLeaderboard,
  } = useGetGlobalLeaderboard(1, 10);

  // MUTATIONS
  const { mutateAsync: patchPray } = usePatchPray();

  const { profileSheetRef } = useProfileBottomSheetStore();

  // Confetti animation ref
  const confettiRef = useRef<LottieView>(null);
  const homeRef = useRef<ScrollView>(null);

  // Reducer for state management
  const [state, dispatch] = useReducer(reducer, initialState);
  const { prayers, clickedData, accordion } = state;

  // FUNCTIONS
  const { incrementPrayerToggle } = useAppRatingStore();

  const handlePrayerChange = useCallback(
    async (prayer: string, value: number) => {
      if (!user) return fireToast.error(t('common.unauthorized.description'));
      if (prayers[prayer] === value) return;

      // Haptic feedback
      await triggerHaptic();

      // Update local state immediately for instant feedback
      const updatedPrayers = { ...prayers, [prayer]: value };
      dispatch({ type: 'SET_PRAYERS', payload: updatedPrayers });

      // Confetti animation
      if (value === PRAYER_POINTS.ON_TIME) {
        confettiRef.current?.play(0);
      }

      // Send ONLY the changed prayer field to backend
      // This prevents race conditions when multiple prayers are clicked rapidly
      await patchPray({
        userId: user?.id!,
        date: today,
        field: prayer as PrayerField,
        value: value as 0 | 1 | 2,
      });

      // Track prayer toggle for app rating
      await incrementPrayerToggle();
    },
    [prayers, patchPray, user?.id, today, dispatch, incrementPrayerToggle]
  );

  const handleDayClick = useCallback(
    async (date: string, details: { data: DayData | null | undefined }) => {
      // if date is after today, return toast
      if (!user) return fireToast.error(t('common.unauthorized.description'));
      const isDateAfterToday = new Date(date) > today;
      const isMoreThanAWeek = new Date(date) < new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000);
      if (isDateAfterToday) return fireToast.info(t('home.errors.futureDate'));
      if (isMoreThanAWeek && !isPremium) {
        paywallSheetRef.current?.snapToIndex(0);
        return;
      }

      // if today, scroll to top
      if (date === format(today, 'yyyy-MM-dd')) {
        return homeRef.current?.scrollTo({
          y: 0,
          animated: true,
        });
      }
      // Haptic feedback
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
    async (date: string, field: PrayerField, value: 0 | 1 | 2) => {
      if (!user?.id) return;
      await triggerHaptic();

      // Send PATCH request with only the changed field
      await patchPray({
        userId: user.id,
        date: new Date(date),
        field,
        value,
      });

      // The usePatchPray hook handles optimistic updates automatically
    },
    [patchPray, user?.id]
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
    <Fragment>
      <ScrollView
        showsVerticalScrollIndicator={false}
        ref={homeRef}
        contentContainerStyle={{ paddingBottom: insets.bottom + 50, paddingTop: insets.top + 2 }}
        className="main-area"
        refreshControl={
          <RefreshControl
            refreshing={isLoadingPrays}
            onRefresh={() => {
              refetchTodaysPrays();
              refetchPrays();
              refetchLeaderboard();
              refetchCustomer();
            }}
            tintColor={colors['--primary']}
          />
        }
      >
        {/* HEADER */}
        <HomeHeader today={today} />
        {/* Today's Prayers */}
        <TodaysPray
          isLoading={isLoadingPrays}
          prayers={prayers}
          handlePrayerChange={handlePrayerChange}
        />
        {/* PRAYER HISTORY */}
        <PrayerHistory
          data={prays}
          year={year}
          setYear={setYear}
          dispatch={dispatch}
          accordion={accordion}
          clickedData={clickedData}
          isLoading={isLoadingPrays}
          handleDayClick={handleDayClick}
          handleUpdateClickedDay={handleUpdateClickedDay}
        />
        {/* CHARTS */}
        {year === new Date().getFullYear() && user && <AreaChart lineData={prays} />}

        <View>
          <View className="flex-row items-center justify-between mt-10">
            <Text className="text-xl font-semibold">{t('leaderboard.title')}</Text>
            <Button
              className="flex-row items-center gap-2"
              size="sm"
              variant="ghost"
              onPress={() => router.push('/(screens)/leaderboard/leaders-list')}
            >
              <Text className="text-xs font-extralight">{t('common.viewAll')}</Text>
              <ChevronRight size={12} color={colors['--foreground']} />
            </Button>
          </View>
          <Leaderboard
            data={leaderboard?.data ?? []}
            isLoading={isLoadingLeaderboard}
            imageClassName="w-24 h-24"
            refetch={refetchLeaderboard}
            scrollEnabled={false}
          />
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
      {/* PROFILE */}
      <CustomBottomSheet sheetRef={profileSheetRef}>
        <ProfilePage />
      </CustomBottomSheet>
    </Fragment>
  );
}
