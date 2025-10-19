import { useIsFocused } from '@react-navigation/native';
import { Coordinates, Qibla } from 'adhan';
import * as Location from 'expo-location';
import { Magnetometer, MagnetometerMeasurement } from 'expo-sensors';
import { CircleHelp, RefreshCcw } from 'lucide-react-native';
import React, { Reducer, useCallback, useEffect, useReducer, useRef } from 'react';
import { Image, View } from 'react-native';
import { useTranslation } from 'react-i18next';

import Loader from '@/components/shared/loader';
import { Button } from '@/components/ui/button';
import { Text } from '@/components/ui/text';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { IMAGES } from '@/constants/images';
import { cn } from '@/lib/utils';
import { fireToast } from '@/providers/toaster';
import { useThemeStore } from '@/store/defaults/theme';
import { triggerHaptic } from '@/utils/haptics';
import Kaaba from '@/assets/icons/kaaba.svg';

interface State {
  loading: boolean;
  error: string | null;
  magnetAngle: number; // heading (0..360)
  qiblaAngle: number; // absolute bearing to Kaaba (0..360)
}

type Action =
  | { type: 'START_LOADING' }
  | { type: 'STOP_LOADING' }
  | { type: 'SET_ERROR'; payload: string }
  | { type: 'SET_DATA'; payload: { magnetAngle?: number; qiblaAngle?: number } };

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
        magnetAngle: action.payload.magnetAngle ?? state.magnetAngle,
        qiblaAngle: action.payload.qiblaAngle ?? state.qiblaAngle,
      };
    default:
      return state;
  }
};

// Canvas geometry
const SIZE = 256;
const RADIUS = SIZE / 2.2;
// Visual offsets
const DOT_RADIUS = 5; // dot size for pointer tip
const RING_INSET = 15; // how far inside the ring the dot sits (positive = inside)
const KAABA_GAP = 15; // how far outside the ring the Kaaba sits

// Convert bearing (clockwise from North) to RN visual rotation
// This fixes the “mirrored” (left/right) feeling in RN transforms.
const toVisual = (deg: number) => (360 - (deg % 360) + 360) % 360;

const QiblaCompass: React.FC = () => {
  const { t } = useTranslation();
  const [state, dispatch] = useReducer(reducer, initialState);
  const { colors } = useThemeStore();
  const isFocused = useIsFocused();

  // Refs for cleanup / throttling
  const magnetSubRef = useRef<ReturnType<typeof Magnetometer.addListener> | null>(null);
  const lastHapticAtRef = useRef<number>(0);

  const calculateMagnetAngle = useCallback((x: number, y: number) => {
    let angle = Math.atan2(y, x) * (180 / Math.PI); // -180..180, x=East, y=North
    if (angle < 0) angle += 360;
    return Math.round(angle); // 0..360 (0 = East in sensor-space, BUT the numeric value you show is already accepted by you)
  }, []);

  const subscribeMagnetometer = useCallback(
    (qiblaAngle: number) => {
      Magnetometer.setUpdateInterval(100); // 10Hz
      magnetSubRef.current?.remove?.();
      magnetSubRef.current = Magnetometer.addListener(async (data: MagnetometerMeasurement) => {
        const angle = calculateMagnetAngle(data.x ?? 0, data.y ?? 0);
        dispatch({ type: 'SET_DATA', payload: { magnetAngle: angle } });

        // Haptic with tolerance and cooldown
        const tolerance = 2;
        const now = Date.now();
        if (Math.abs(angle - Math.round(qiblaAngle)) <= tolerance) {
          if (now - lastHapticAtRef.current > 1200) {
            await triggerHaptic();
            lastHapticAtRef.current = now;
          }
        }
      });
    },
    [calculateMagnetAngle]
  );

  const fetchQiblaAngle = useCallback(async () => {
    await triggerHaptic();
    dispatch({ type: 'START_LOADING' });

    try {
      const isMagnetAvailable = await Magnetometer.isAvailableAsync();
      if (!isMagnetAvailable) {
        fireToast.error(
          t('Qibla.Compass.Errors.MagnetometerUnavailable') ||
            'Magnetometer not available on this device.'
        );
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
      const userCoordinates = new Coordinates(coords.latitude, coords.longitude);
      const qiblaAngle = Qibla(userCoordinates);

      dispatch({ type: 'SET_DATA', payload: { qiblaAngle } });
      subscribeMagnetometer(qiblaAngle);
    } catch (err: unknown) {
      dispatch({ type: 'SET_ERROR', payload: (err as Error).message });
    } finally {
      dispatch({ type: 'STOP_LOADING' });
    }
  }, [subscribeMagnetometer, t]);

  useEffect(() => {
    if (isFocused) {
      fetchQiblaAngle();
    } else {
      magnetSubRef.current?.remove?.();
      magnetSubRef.current = null;
      Magnetometer.removeAllListeners();
    }

    return () => {
      magnetSubRef.current?.remove?.();
      magnetSubRef.current = null;
      Magnetometer.removeAllListeners();
    };
  }, [isFocused, fetchQiblaAngle]);

  useEffect(() => {
    if (state.error) {
      fireToast.info(state.error);
    }
  }, [state.error]);

  if (state.loading) {
    return (
      <View className="items-center h-full">
        <Loader visible={state.loading} className="bg-background" />
      </View>
    );
  }

  // Precompute visual rotations (fixes mirror)
  const pointerVisual = toVisual(state.magnetAngle);
  const qiblaVisual = toVisual(state.qiblaAngle);

  return (
    <View className="items-center h-full">
      <Text
        className={cn(
          'text-lg mt-20 text-muted-foreground',
          Math.abs(Math.round(state.magnetAngle) - Math.round(state.qiblaAngle)) <= 2
            ? 'font-bold'
            : 'font-medium'
        )}
      >
        {t('Qibla.Compass.YourDirection')}: {state.magnetAngle.toFixed(1)}°
      </Text>

      <Text className="text-lg font-medium text-primary">
        {t('Qibla.Compass.QiblaDirection')}: {state.qiblaAngle.toFixed(1)}°
      </Text>

      {/* Compass (static dial) */}
      <View className="w-64 h-64 my-20 items-center justify-center">
        {/* Static ring */}
        <View className="w-64 h-64 rounded-full border border-border relative items-center justify-center" />

        {/* Pointer wrapper (rotates with device heading) */}
        <View
          className="absolute items-center justify-center"
          style={{
            width: SIZE,
            height: SIZE,
            transform: [{ rotate: `${pointerVisual}deg` }],
          }}
        >
          {/* Arrow (points up at 0°). Rotate wrapper only. */}
          <Image
            source={IMAGES.compass}
            className="w-10 h-10 absolute"
            tintColor={colors['--primary']}
          />

          {/* Pointer dot near the ring, traveling with the arrow */}
          <View
            style={{
              width: DOT_RADIUS * 2,
              height: DOT_RADIUS * 2,
              borderRadius: DOT_RADIUS,
              backgroundColor: colors['--primary'],
              transform: [{ translateY: -(RADIUS - RING_INSET) }],
            }}
          />
        </View>

        {/* Qibla marker wrapper (fixed at absolute bearing), placed OUTSIDE the ring */}
        <View
          className="absolute left-0 -top-2 items-center justify-center"
          style={{
            width: SIZE,
            height: SIZE,
            transform: [{ rotate: `${qiblaVisual}deg` }],
          }}
        >
          <View
            style={{
              // Move past the ring (outside) by KAABA_GAP
              transform: [{ translateY: -(RADIUS + KAABA_GAP) }, { rotate: `-${qiblaVisual}deg` }],
            }}
          >
            <Kaaba width={40} height={40} fill={colors['--primary']} />
          </View>
        </View>
      </View>

      {/* Refresh & Help */}
      <View className="flex-row items-center gap-2">
        <Button className="rounded-full" variant="ghost" onPress={fetchQiblaAngle}>
          <RefreshCcw size={20} color={colors['--primary']} />
        </Button>

        <Tooltip delayDuration={150}>
          <TooltipTrigger asChild>
            <Button variant="ghost" className="rounded-full">
              <CircleHelp size={20} color={colors['--primary']} />
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <Text className="text-sm text-center">{t('Qibla.Compass.Help')}</Text>
          </TooltipContent>
        </Tooltip>
      </View>
    </View>
  );
};

export default QiblaCompass;
