import { Coordinates, Qibla } from 'adhan';
import * as Location from 'expo-location';
import { Magnetometer } from 'expo-sensors';
import { RefreshCcw } from 'lucide-react-native';
import React, { useEffect, useReducer, useCallback, Reducer } from 'react';
import { View, Image, TouchableOpacity } from 'react-native';

import Loader from '@/components/shared/loader';
import { Text } from '@/components/ui/text';
import { IMAGES } from '@/constants/images';
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

  const calculateMagnetAngle = useCallback((x: number, y: number) => {
    let angle = Math.atan2(y, x) * (180 / Math.PI);
    if (angle < 0) angle += 360;
    return Math.round(angle);
  }, []);

  const fetchQiblaAngle = useCallback(async () => {
    dispatch({ type: 'START_LOADING' });
    try {
      const isMagnetAvailable = await Magnetometer.isAvailableAsync();
      if (!isMagnetAvailable) throw new Error('Magnetometer not available.');

      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') throw new Error('Location permission denied.');

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
      });

      return () => magnetSub.remove();
    } catch (err: unknown) {
      dispatch({ type: 'SET_ERROR', payload: (err as Error).message });
    } finally {
      dispatch({ type: 'STOP_LOADING' });
    }
  }, [calculateMagnetAngle]);

  useEffect(() => {
    fetchQiblaAngle();
  }, [fetchQiblaAngle]);

  useEffect(() => {
    if (state.error) {
      fireToast.info(state.error);
    }
  }, [state.error]);

  if (state.loading) {
    return <Loader visible={state.loading} />;
  }

  return (
    <View className="items-center h-full">
      {/* Info Text */}
      <Text className=" text-lg font-medium text-muted-foreground mt-16">
        Magnetic North: {state.magnetAngle}°
      </Text>
      <Text className="text-lg font-medium text-muted-foreground mb-2">
        Qibla: {state.qiblaAngle.toFixed(2)}°
      </Text>
      <Text className="text-sm font-medium text-muted-foreground mb-[20%]">
        Rotate to match Qibla, then tap to refresh
      </Text>
      {/* Compass Container */}
      <View
        className="w-64 h-64 rounded-full border border-border relative items-center justify-center"
        style={{ transform: [{ rotate: `${-state.magnetAngle}deg` }] }}
      >
        {/* Compass Pointer */}
        <Image
          source={IMAGES.compass}
          className="w-10 h-10 absolute"
          tintColor={colors['--primary']}
          style={{ transform: [{ rotate: `${state.magnetAngle}deg` }] }}
        />

        {/* Qibla Arrow */}
        <Image source={IMAGES.kaaba} className="w-10 h-10 absolute top-2" />
      </View>

      {/* Refresh Button */}
      <TouchableOpacity className="mt-8" onPress={fetchQiblaAngle}>
        <RefreshCcw size={20} color={colors['--primary']} />
      </TouchableOpacity>
    </View>
  );
};

export default QiblaCompass;
