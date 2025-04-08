import { useIsFocused } from '@react-navigation/native';
import { Coordinates, Qibla } from 'adhan';
import * as Location from 'expo-location';
import { Magnetometer } from 'expo-sensors';
import { CircleHelp, RefreshCcw } from 'lucide-react-native';
import React, { useEffect, useReducer, useCallback, Reducer } from 'react';
import { useTranslation } from 'react-i18next';
import { View, Image } from 'react-native';

import Loader from '@/components/shared/loader';
import { Button } from '@/components/ui/button';
import { Text } from '@/components/ui/text';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { IMAGES } from '@/constants/images';
import { cn } from '@/lib/utils';
import { fireToast } from '@/providers/toaster';
import { useThemeStore } from '@/store/defaults/theme';
import { triggerHaptic } from '@/utils/haptics';

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
  const { t } = useTranslation();
  const [state, dispatch] = useReducer(reducer, initialState);
  const { colors } = useThemeStore();
  const isFocused = useIsFocused();

  const calculateMagnetAngle = useCallback((x: number, y: number) => {
    let angle = Math.atan2(y, x) * (180 / Math.PI);
    if (angle < 0) angle += 360;
    return Math.round(angle);
  }, []);

  const fetchQiblaAngle = useCallback(async () => {
    await triggerHaptic();
    dispatch({ type: 'START_LOADING' });

    try {
      const isMagnetAvailable = await Magnetometer.isAvailableAsync();
      if (!isMagnetAvailable) {
        dispatch({ type: 'STOP_LOADING' });
        return;
      }

      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        fireToast.error(t('Qibla.Compass.Errors.Location'));
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
      const magnetSub = Magnetometer.addListener(async (data) => {
        const angle = calculateMagnetAngle(data.x, data.y);
        dispatch({
          type: 'SET_DATA',
          payload: { magnetAngle: angle, qiblaAngle },
        });

        // Trigger haptic only 3 times if aligned
        if (angle === Number(qiblaAngle.toFixed(0))) {
          await triggerHaptic();
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
  }, [calculateMagnetAngle, t]);

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
      <Text
        className={cn(
          'text-lg mt-20 text-muted-foreground',
          state.magnetAngle + 1 === Number(state.qiblaAngle.toFixed(0))
            ? 'font-bold'
            : 'font-medium',
        )}
      >
        {t('Qibla.Compass.MagneticNorth')}: {state.magnetAngle}°
      </Text>
      <Text className="text-lg font-medium text-primary">
        {t('Qibla.Compass.QiblaDirection')}: {state.qiblaAngle.toFixed(2)}°
      </Text>

      {/* Compass Container */}
      <View
        className="w-64 h-64 rounded-full border border-border relative items-center justify-center my-20"
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
      <View className="flex-row items-center gap-2">
        <Button
          className="rounded-full"
          variant="ghost"
          onPress={fetchQiblaAngle}
        >
          <RefreshCcw size={20} color={colors['--primary']} />
        </Button>

        <Tooltip delayDuration={150}>
          <TooltipTrigger asChild>
            <Button variant="ghost" className="rounded-full">
              <CircleHelp size={20} color={colors['--primary']} />
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <Text className="text-sm">{t('Qibla.Compass.Help')}</Text>
          </TooltipContent>
        </Tooltip>
      </View>
    </View>
  );
};

export default QiblaCompass;
