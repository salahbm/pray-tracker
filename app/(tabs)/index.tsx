import BottomSheet from '@gorhom/bottom-sheet';
import { format } from 'date-fns';
import * as Device from 'expo-device';
import * as Haptics from 'expo-haptics';
import LottieView from 'lottie-react-native';
import {
  useState,
  useRef,
  useCallback,
  useMemo,
  useEffect,
  useReducer,
} from 'react';
import { Button, ScrollView } from 'react-native';
import {
  SafeAreaView,
  useSafeAreaInsets,
} from 'react-native-safe-area-context';

import SignInScreen from '../(auth)/sign-in';
import SignUpScreen from '../(auth)/sign-up';
import ProfilePage from '../(screens)/profile';
import CustomBottomSheet from '@/components/shared/bottom-sheet';
import { DayData } from '@/components/shared/heat-map/heat';
import Loader from '@/components/shared/loader';
import AreaChart from '@/components/views/home/area-chart';
import HomeHeader from '@/components/views/home/header';
import PrayerHistory from '@/components/views/home/prayer-history';
import TodaysPray from '@/components/views/home/todays-pray';
import { PRAYER_POINTS, SALAHS } from '@/constants/enums';
import { useNotificationSettings } from '@/hooks/notifications/useNotificationSettings';
import { useGetPrays } from '@/hooks/prays/useGetPrays';
import { useGetTodayPrays } from '@/hooks/prays/useGetTdyPrays';
import { useCreatePray } from '@/hooks/prays/usePostPray';
import { sendTestNotification } from '@/lib/notifications';
import { fireToast } from '@/providers/toaster';
import { useAuthStore } from '@/store/auth/auth-session';
import confetti from 'assets/gif/confetti.json';

const initialState = {
  prayers: {
    [SALAHS.FAJR]: null,
    [SALAHS.DHUHR]: null,
    [SALAHS.ASR]: null,
    [SALAHS.MAGHRIB]: null,
    [SALAHS.ISHA]: null,
    [SALAHS.TAHAJJUD]: null,
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
  // DATE STATE
  const today = useMemo(() => new Date(), []);
  const [year, setYear] = useState(today.getFullYear());
  const insets = useSafeAreaInsets();
  // QUERIES
  const { user } = useAuthStore();
  const { enableNotifications } = useNotificationSettings();

  const { data: prays, isLoading: isLoadingPrays } = useGetPrays(
    user?.id,
    year,
  );
  const {
    data: todaysPrays,
    refetch,
    isLoading: isLoadingTodaysPrays,
  } = useGetTodayPrays(user?.id);

  // Enable notifications when the user is logged in
  useEffect(() => {
    if (user && Device.isDevice) {
      enableNotifications();
    }
  }, [user, enableNotifications]);

  // MUTATIONS
  const { mutateAsync: createPray } = useCreatePray();

  // BOTTOM SHEETS REFERENCES
  const signInSheetRef = useRef<BottomSheet>(null);
  const signUpSheetRef = useRef<BottomSheet>(null);
  const profileSheetRef = useRef<BottomSheet>(null);
  // Confetti animation ref
  const confettiRef = useRef<LottieView>(null);
  const homeRef = useRef<ScrollView>(null);

  // Reducer for state management
  const [state, dispatch] = useReducer(reducer, initialState);
  const { prayers, isPickerVisible, clickedData, accordion } = state;

  // Callbacks to present each sheet
  const handlePresentSignIn = useCallback(() => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    signUpSheetRef.current?.close();
    signInSheetRef.current?.snapToIndex(2);
  }, []);

  const handlePresentSignUp = useCallback(() => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    signInSheetRef.current?.close();
    signUpSheetRef.current?.snapToIndex(2);
  }, []);

  // FUNCTIONS
  const handlePrayerChange = useCallback(
    async (prayer, value) => {
      if (prayers[prayer] === value) return;
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
      const updatedPrayers = { ...prayers, [prayer]: value };
      await createPray({
        id: user?.id,
        date: today,
        ...updatedPrayers,
      }).then(() => {
        dispatch({ type: 'SET_PRAYERS', payload: updatedPrayers });
      });

      if (value === PRAYER_POINTS.ON_TIME) {
        confettiRef.current?.play(0);
      }
    },
    [prayers, createPray, user?.id, today],
  );

  const handleDayClick = useCallback(
    (date: string, details: { data: DayData }) => {
      // if date is after today, return toast
      const isDateAfterToday = new Date(date) > today;
      if (isDateAfterToday) return fireToast.info('Cannot view future dates');

      // if today, scroll to top
      if (date === format(today, 'yyyy-MM-dd')) {
        return homeRef.current?.scrollTo({
          y: 0,
          animated: true,
        });
      }
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);

      dispatch({
        type: 'SET_CLICKED_DATA',
        payload: { date, details },
      });
      dispatch({ type: 'SET_ACCORDION', payload: 'item-1' });
    },
    [today],
  );

  const handleUpdateClickedDay = useCallback(
    async (date, details) => {
      if (!details || !details.data) return;

      await createPray({
        id: user?.id,
        date: new Date(date),
        ...details.data,
      });

      dispatch({ type: 'SET_CLICKED_DATA', payload: { date, details } });
      fireToast.info('Prayer updated successfully');
      refetch();
    },
    [createPray, user?.id, refetch],
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
        [SALAHS.TAHAJJUD]: todaysPrays?.tahajjud ?? null,
      },
    });
  }, [todaysPrays, user]);

  return (
    <SafeAreaView className="safe-area">
      <Loader visible={isLoadingPrays || isLoadingTodaysPrays} />
      <ScrollView
        showsVerticalScrollIndicator={false}
        ref={homeRef}
        contentContainerStyle={{ paddingBottom: insets.bottom + 50 }}
        className="main-area"
      >
        {/* HEADER */}
        <HomeHeader
          today={today}
          user={user}
          handlePresentSignIn={handlePresentSignIn}
          ref={profileSheetRef}
        />
        <Button title="Send Notification" onPress={sendTestNotification} />
        {/* Today's Prayers */}
        <TodaysPray prayers={prayers} handlePrayerChange={handlePrayerChange} />
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
        />
      </CustomBottomSheet>
      {/* SIGN UP SHEET */}
      <CustomBottomSheet sheetRef={signUpSheetRef}>
        <SignUpScreen
          onSuccess={() => signUpSheetRef.current?.close()}
          onNavigate={handlePresentSignIn}
        />
      </CustomBottomSheet>
      {/* PROFILE */}
      <CustomBottomSheet sheetRef={profileSheetRef}>
        <ProfilePage onNavigate={() => profileSheetRef.current?.close()} />
      </CustomBottomSheet>
    </SafeAreaView>
  );
}
