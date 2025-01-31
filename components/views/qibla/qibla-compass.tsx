import { Coordinates, Qibla } from 'adhan';
import * as Location from 'expo-location';
import { Magnetometer } from 'expo-sensors';
import React, { useEffect, useReducer, useCallback, Reducer } from 'react';
import { View, Image, ActivityIndicator, TouchableOpacity } from 'react-native';

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
        <Text className="text-lg">{state.error}</Text>
      </View>
    );
  }

  return (
    <View>
      <View className="justify-center items-center mt-[40%]">
        <Text className="text-lg font-medium mb-4">
          Magnetic North: {state.magnetAngle}° | Qibla:{' '}
          {state.qiblaAngle.toFixed(2)}°
        </Text>
        <Text className="text-sm text-center text-muted-foreground mb-2">
          Rotate your device until the arrow points to Qibla.
        </Text>

        {/* Compass Circle */}
        <View
          className="w-64 h-64 rounded-full border-2 border-muted relative items-center justify-center  shadow-md"
          style={{
            transform: [{ rotate: `${-state.magnetAngle}deg` }],
          }}
        >
          {/* Magnetic Pointer */}
          <Image
            source={IMAGES.compass}
            className="w-12 h-12 absolute"
            tintColor={colors['--primary']}
            style={{
              transform: [{ rotate: `${state.magnetAngle}deg` }],
            }}
          />

          {/* Qibla Arrow */}
          <Image source={IMAGES.kaaba} className="w-12 h-12 absolute top-3" />
        </View>
      </View>

      {/* refresh current position */}
      <TouchableOpacity className="mt-8 items-center">
        <Text className="text-lg font-semibold text-primary">
          Refresh Position
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default QiblaCompass;
