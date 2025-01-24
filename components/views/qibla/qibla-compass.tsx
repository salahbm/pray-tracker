import * as Location from 'expo-location';
import { Magnetometer } from 'expo-sensors';
import React, {
  useEffect,
  useReducer,
  useCallback,
  useMemo,
  Reducer,
} from 'react';
import { View, Image, ActivityIndicator } from 'react-native';

import { Text } from '@/components/ui/text';
import { IMAGES } from '@/constants/images';
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

  const calculateMagnetAngle = useCallback((x: number, y: number) => {
    let angle = Math.atan2(y, x) * (180 / Math.PI);
    if (angle < 0) angle += 360;
    return Math.round(angle);
  }, []);

  const calculateQiblaAngle = useCallback((lat: number, lon: number) => {
    const rad = Math.PI / 180;
    const latK = 21.4225 * rad;
    const lonK = 39.8264 * rad;
    const userLat = lat * rad;
    const userLon = lon * rad;
    return (
      (180 / Math.PI) *
      Math.atan2(
        Math.sin(lonK - userLon),
        Math.cos(userLat) * Math.tan(latK) -
          Math.sin(userLat) * Math.cos(lonK - userLon),
      )
    );
  }, []);

  const arrowRotation = useMemo(() => {
    const diff = state.qiblaAngle - state.magnetAngle;
    return diff < 0 ? diff + 360 : diff;
  }, [state.qiblaAngle, state.magnetAngle]);

  useEffect(() => {
    let magnetSub: { remove: () => void } | null = null;
    (async () => {
      dispatch({ type: 'START_LOADING' });
      try {
        const isMagnetAvailable = await Magnetometer.isAvailableAsync();
        if (!isMagnetAvailable) throw new Error('Magnetometer not available.');
        const { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted')
          throw new Error('Location permission denied.');

        const { coords } = await Location.getCurrentPositionAsync({});
        const qiblaAngle = calculateQiblaAngle(
          coords.latitude,
          coords.longitude,
        );

        Magnetometer.setUpdateInterval(100);
        magnetSub = Magnetometer.addListener((data) => {
          const angle = calculateMagnetAngle(data.x, data.y);
          dispatch({
            type: 'SET_DATA',
            payload: { magnetAngle: angle, qiblaAngle },
          });
        });
      } catch (err: unknown) {
        dispatch({ type: 'SET_ERROR', payload: (err as Error).message });
      } finally {
        dispatch({ type: 'STOP_LOADING' });
      }
    })();

    return () => {
      if (magnetSub) magnetSub.remove();
    };
  }, [calculateQiblaAngle, calculateMagnetAngle]);

  if (state.loading) {
    return (
      <View className="flex-1 justify-center items-center">
        <ActivityIndicator size="large" />
      </View>
    );
  }

  if (state.error) {
    return (
      <View className="flex-1 justify-center items-center">
        <Text className=" text-lg">{state.error}</Text>
      </View>
    );
  }

  return (
    <React.Fragment>
      <Text className="text-lg font-medium mb-4">
        Heading: {state.magnetAngle}° | Qibla: {state.qiblaAngle.toFixed(2)}°
      </Text>
      <View className="flex-1 justify-center items-center relative">
        <View
          className="w-64 h-64 rounded-full border-2 border-muted relative items-center justify-center"
          style={{ transform: [{ rotate: `${arrowRotation}deg` }] }}
        >
          {/* Cardinal Directions */}
          <Text className="absolute top-2 left-1/2 -translate-x-1/2 text-muted-foreground font-bold">
            N
          </Text>
          <Text className="absolute bottom-2 left-1/2 -translate-x-1/2 text-muted-foreground font-bold">
            S
          </Text>
          <Text className="absolute left-2 top-1/2 -translate-y-1/2 text-muted-foreground font-bold">
            W
          </Text>
          <Text className="absolute right-2 top-1/2 -translate-y-1/2 text-muted-foreground font-bold">
            E
          </Text>

          {/* Compass Image */}
          <Image
            source={IMAGES.compass}
            className="w-12 h-12 absolute"
            style={{ tintColor: colors['--primary'] }}
          />

          {/* Kaaba Icon */}
          <Image source={IMAGES.kaaba} className="w-12 h-12 mb-32" />
        </View>
      </View>
    </React.Fragment>
  );
};

export default QiblaCompass;
