import { useIsFocused } from '@react-navigation/native';
import { Coordinates, Qibla } from 'adhan';
import * as Haptics from 'expo-haptics';
import * as Location from 'expo-location';
import { Magnetometer } from 'expo-sensors';
import { RefreshCcw } from 'lucide-react-native';
import React, { useEffect, useReducer, useCallback, Reducer } from 'react';
import { View, Image } from 'react-native';

import Loader from '@/components/shared/loader';
import { Button } from '@/components/ui/button';
import { Text } from '@/components/ui/text';
import { IMAGES } from '@/constants/images';
import { cn } from '@/lib/utils';
import { fireToast } from '@/providers/toaster';
import { useThemeStore } from '@/store/defaults/theme';

interface State {
  loading: boolean;
  error: string | null;
  magnetAngle: number;
  qiblaAngle: number;
}

type Action =
  | { type: 'START_LOADING' }
  | { type: 'STOP_LOADING' }
  | { type: 'SET_ERROR'; payload: string }
  | { type: 'SET_DATA'; payload: { magnetAngle: number; qiblaAngle: number } };

const initialState: State = {
  loading: true,
  error: null,
  magnetAngle: 0,
  qiblaAngle: 0,
};

const reducer: Reducer<State, Action> = (state, action) => {
  switch (action.type) {
    case 'START_LOADING':
      return { ...state, loading: true, error: null };
    case 'STOP_LOADING':
      return { ...state, loading: false };
    case 'SET_ERROR':
      return { ...state, error: action.payload, loading: false };
    case 'SET_DATA':
      return {
        ...state,
        magnetAngle: action.payload.magnetAngle,
        qiblaAngle: action.payload.qiblaAngle,
      };
    default:
      return state;
  }
};

const QiblaCompass: React.FC = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { colors } = useThemeStore();
  const isFocused = useIsFocused();

  const calculateMagnetAngle = useCallback((x: number, y: number) => {
    let angle = Math.atan2(y, x) * (180 / Math.PI);
    if (angle < 0) angle += 360;
    return Math.round(angle);
  }, []);

  const fetchQiblaAngle = useCallback(async () => {
    dispatch({ type: 'START_LOADING' });

    try {
      const isMagnetAvailable = await Magnetometer.isAvailableAsync();
      if (!isMagnetAvailable) {
        fireToast.error('Magnetometer not available.');
        dispatch({ type: 'STOP_LOADING' });
        return;
      }

      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        fireToast.error('Location permission required.');
        dispatch({ type: 'STOP_LOADING' });
        return;
      }

      const { coords } = await Location.getCurrentPositionAsync({});
      const userCoordinates = new Coordinates(
        coords.latitude,
        coords.longitude,
      );
      const qiblaAngle = Qibla(userCoordinates);

      Magnetometer.setUpdateInterval(100);
      const magnetSub = Magnetometer.addListener((data) => {
        const angle = calculateMagnetAngle(data.x, data.y);
        dispatch({
          type: 'SET_DATA',
          payload: { magnetAngle: angle, qiblaAngle },
        });

        // Trigger haptic only 3 times if aligned
        if (angle === Number(qiblaAngle.toFixed(0))) {
          Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
        }
      });

      return () => {
        magnetSub.remove(); // Unsubscribe properly
        Magnetometer.removeAllListeners();
      };
    } catch (err: unknown) {
      dispatch({ type: 'SET_ERROR', payload: (err as Error).message });
    } finally {
      dispatch({ type: 'STOP_LOADING' });
    }
  }, [calculateMagnetAngle]);

  useEffect(() => {
    let cleanup: (() => void) | undefined;

    if (isFocused) {
      // Start your magnetometer subscription
      fetchQiblaAngle().then((unsubscribe) => {
        cleanup = unsubscribe;
      });
    } else {
      // Stop subscription if it exists
      if (cleanup) cleanup();
    }

    return () => {
      if (cleanup) cleanup();
    };
  }, [isFocused, fetchQiblaAngle]);

  useEffect(() => {
    if (state.error) {
      fireToast.info(state.error);
    }
  }, [state.error]);

  if (state.loading) {
    return <Loader visible={state.loading} className="mt-[55%]" />;
  }

  return (
    <View className="items-center h-full">
      {/* Info Text */}
      <Text
        className={cn(
          ' text-lg  d mt-16',
          state.magnetAngle + 1 === Number(state.qiblaAngle.toFixed(0))
            ? 'text-primary font-bold'
            : 'text-muted-foreground font-medium',
        )}
      >
        Magnetic North: {state.magnetAngle}°
      </Text>
      <Text className="text-lg font-medium text-muted-foreground mb-2">
        Qibla: {state.qiblaAngle.toFixed(2)}°
      </Text>
      {/* Description how to use */}
      <Text className="text-sm font-medium text-muted-foreground mb-[20%]">
        Rotate your phone, match the angle with the Qibla
      </Text>
      {/* Compass Container */}
      <View
        className="w-64 h-64 rounded-full border border-border relative items-center justify-center"
        style={{ transform: [{ rotate: `${360 - state.magnetAngle}deg` }] }}
      >
        <Image
          source={IMAGES.compass}
          className="w-10 h-10 absolute"
          tintColor={colors['--primary']}
        />
        <Image
          source={IMAGES.kaaba}
          className="w-10 h-10 absolute top-2"
          style={{ transform: [{ rotate: `${state.qiblaAngle}deg` }] }}
        />
      </View>

      {/* Refresh Button */}
      <Button
        className="mt-8 rounded-full"
        variant="ghost"
        onPress={() => {
          fetchQiblaAngle();
          Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
        }}
      >
        <RefreshCcw size={20} color={colors['--primary']} />
      </Button>
    </View>
  );
};

export default QiblaCompass;
