import * as Location from 'expo-location';
import { Magnetometer } from 'expo-sensors';
import React, {
  useEffect,
  useReducer,
  useCallback,
  useMemo,
  Reducer,
} from 'react';
import { View, Text, Image, StyleSheet, ActivityIndicator } from 'react-native';

import { COLORS } from '@/constants/Colors';
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
      <View style={styles.center}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  if (state.error) {
    return (
      <View style={styles.center}>
        <Text style={styles.error}>{state.error}</Text>
      </View>
    );
  }

  return (
    <View className="flex-1 py-12">
      <View style={styles.compass}>
        <Text style={[styles.directionText, styles.north]}>N</Text>
        <Text style={[styles.directionText, styles.east]}>E</Text>
        <Text style={[styles.directionText, styles.south]}>S</Text>
        <Text style={[styles.directionText, styles.west]}>W</Text>
        <View
          style={[
            styles.centerContainer,
            { transform: [{ rotate: `${arrowRotation}deg` }] },
          ]}
        >
          <Image source={IMAGES.kaaba} style={styles.kaaba} />
          <Image
            source={IMAGES.compass}
            style={[styles.arrow, { tintColor: colors['--primary'] }]}
          />
        </View>
      </View>

      <Text style={styles.info}>
        Heading: {state.magnetAngle}° | Qibla: {state.qiblaAngle.toFixed(2)}°
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  center: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  error: { color: COLORS.dark.destructive, fontSize: 16 },
  compass: {
    height: 250,
    position: 'relative',
  },
  directionText: {
    position: 'absolute',
    fontSize: 20,
    fontWeight: 'bold',
    color: COLORS.dark.muted_foreground,
  },
  north: { top: 5, left: '50%', marginLeft: -10 },
  east: { right: 5, top: '50%', marginTop: -10 },
  south: { bottom: 5, left: '50%', marginLeft: -10 },
  west: { left: 5, top: '50%', marginTop: -10 },

  centerContainer: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    width: 60,
    height: 60,
    marginLeft: -30,
    marginTop: -30,
    alignItems: 'center',
    justifyContent: 'center',
  },
  kaaba: {
    width: 40,
    height: 40,
    zIndex: 2,
    marginRight: 7,
    marginBottom: 160,
  },
  arrow: {
    width: 60,
    height: 60,
    position: 'absolute',
    zIndex: 1,
    transform: [{ rotate: '35deg' }],
  },
  info: { fontSize: 16, marginTop: 20, color: 'white', textAlign: 'center' },
});

export default QiblaCompass;
