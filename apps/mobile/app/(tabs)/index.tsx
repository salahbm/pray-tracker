import confetti from '@assets/gif/confetti.json';
import BottomSheet from '@gorhom/bottom-sheet';
import { format } from 'date-fns';
import LottieView from 'lottie-react-native';
import { useCallback, useEffect, useReducer, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ScrollView } from 'react-native';
import { RefreshControl } from 'react-native-gesture-handler';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';

import CustomBottomSheet from '@/components/shared/bottom-sheet';
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
import { useGetUser } from '@/hooks/user/useGetUser';
import { fireToast } from '@/providers/toaster';
import { useAuthStore } from '@/store/auth/auth-session';
import { useThemeStore } from '@/store/defaults/theme';
import { triggerHaptic } from '@/utils/haptics';

import ForgotPasswordScreen from '../(auth)/forgot-pwd';
import SignInScreen from '../(auth)/sign-in';
import SignUpScreen from '../(auth)/sign-up';
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
  accordion: '',
};

function reducer(state, action) {
  switch (action.type) {
    case 'SET_PRAYERS':
      return { ...state, prayers: action.payload };
    case 'TOGGLE_PICKER':
      return { ...state, isPickerVisible: !state.isPickerVisible };
    case 'SET_CLICKED_DATA':
      return { ...state, clickedData: action.payload };
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
  const { user, setUser } = useAuthStore();
  const {
    data: userDB,
    refetch: refetchUser,
    isFetching: isUserFetching,
  } = useGetUser(user?.supabaseId);

  const {
    data: prays,
    isLoading: isLoadingPrays,
    refetch: refetchPrays,
  } = useGetPrays(user?.id, year);
  const { data: todaysPrays, refetch: refetchTodaysPrays } = useGetTodayPrays(user?.id);

  // MUTATIONS
  const { mutateAsync: createPray, isPending: isCreatingPray } = useCreatePray();

  // BOTTOM SHEETS REFERENCES
  const signInSheetRef = useRef<BottomSheet>(null);
  const signUpSheetRef = useRef<BottomSheet>(null);
  const forgotPwdRef = useRef<BottomSheet>(null);
  const profileSheetRef = useRef<BottomSheet>(null);
  // Confetti animation ref
  const confettiRef = useRef<LottieView>(null);
  const homeRef = useRef<ScrollView>(null);

  // Reducer for state management
  const [state, dispatch] = useReducer(reducer, initialState);
  const { prayers, isPickerVisible, clickedData, accordion } = state;

  // Callbacks to present each sheet
  const handlePresentSignIn = useCallback(async () => {
    await triggerHaptic();
    forgotPwdRef.current?.close();
    signUpSheetRef.current?.close();
    signInSheetRef.current?.snapToIndex(2);
  }, []);

  const handlePresentSignUp = useCallback(async () => {
    await triggerHaptic();
    signInSheetRef.current?.close();
    signUpSheetRef.current?.snapToIndex(2);
  }, []);

  const handlePresentForgotPwd = useCallback(async () => {
    await triggerHaptic();
    signInSheetRef.current?.close();
    forgotPwdRef.current?.snapToIndex(2);
  }, []);

  // FUNCTIONS
  const handlePrayerChange = useCallback(
    async (prayer: string, value: number) => {
      if (prayers[prayer] === value) return;
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
    async (date: string, details: { data: DayData }) => {
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
      dispatch({ type: 'SET_ACCORDION', payload: 'item-1' });
    },
    [today, t]
  );

  const handleUpdateClickedDay = useCallback(
    async (date, details) => {
      if (!details || !details.data) return;
      await triggerHaptic();

      await createPray({
        id: user?.id,
        date: new Date(date),
        ...details.data,
      });

      dispatch({ type: 'SET_CLICKED_DATA', payload: { date, details } });
      refetchTodaysPrays();
    },
    [createPray, user?.id, refetchTodaysPrays]
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
      <Loader visible={isLoadingPrays || isUserFetching} />
      <ScrollView
        showsVerticalScrollIndicator={false}
        ref={homeRef}
        contentContainerStyle={{ paddingBottom: insets.bottom + 50 }}
        className="main-area"
        refreshControl={
          <RefreshControl
            refreshing={isLoadingPrays || isUserFetching}
            onRefresh={() => {
              refetchTodaysPrays();
              refetchPrays();
              refetchUser().then(() => {
                setUser(userDB);
              });
            }}
            tintColor={colors['--primary']}
          />
        }
      >
        {/* HEADER */}
        <HomeHeader
          today={today}
          user={user}
          handlePresentSignIn={handlePresentSignIn}
          ref={profileSheetRef}
        />
        {/* Today's Prayers */}
        <TodaysPray
          prayers={prayers}
          handlePrayerChange={handlePrayerChange}
          isCreatingPray={isCreatingPray}
        />
        {/* PRAYER HISTORY */}
        <PrayerHistory
          data={prays}
          dispatch={dispatch}
          isPickerVisible={isPickerVisible}
          year={year}
          setYear={setYear}
          clickedData={clickedData}
          accordion={accordion}
          handleDayClick={handleDayClick}
          handleUpdateClickedDay={handleUpdateClickedDay}
          isCreatingPray={isCreatingPray}
        />
        {/* CHARTS */}
        <AreaChart lineData={prays} />
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
      {/* BOTTOM SHEET */}
      <CustomBottomSheet sheetRef={signInSheetRef}>
        <SignInScreen
          onSuccess={() => signInSheetRef.current?.close()}
          onNavigate={handlePresentSignUp}
          onForgotPassword={handlePresentForgotPwd}
        />
      </CustomBottomSheet>
      {/* SIGN UP SHEET */}
      <CustomBottomSheet sheetRef={signUpSheetRef}>
        <SignUpScreen
          onSuccess={() => signUpSheetRef.current?.close()}
          onNavigate={handlePresentSignIn}
        />
      </CustomBottomSheet>
      {/* FORGOT  PASSWORD  SHEET */}
      <CustomBottomSheet sheetRef={forgotPwdRef}>
        <ForgotPasswordScreen
          onNavigate={handlePresentSignIn}
          onSuccess={() => forgotPwdRef.current?.close()}
        />
      </CustomBottomSheet>
      {/* PROFILE */}
      <CustomBottomSheet sheetRef={profileSheetRef}>
        <ProfilePage />
      </CustomBottomSheet>
    </SafeAreaView>
  );
}
