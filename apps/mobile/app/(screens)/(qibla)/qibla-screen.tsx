import { useIsFocused } from '@react-navigation/native';
import * as Location from 'expo-location';
import React, { useEffect, useMemo, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ImageBackground, View, Dimensions } from 'react-native';

import Kaaba from '@/assets/icons/kaaba.svg';
import Loader from '@/components/shared/loader';
import { Button } from '@/components/ui/button';
import { Text } from '@/components/ui/text';
import { triggerHaptic } from '@/utils/haptics';
import { router } from 'expo-router';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { useQibla } from '@/hooks/prays/useQibla';
import { X, Info, Palette } from '@/components/shared/icons';
import { useMosqueBgStore } from '@/store/use-mosque-bg-store';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { MOSQUE_LIST } from '@/constants/images';

const { width } = Dimensions.get('window');
const COMPASS_SIZE = width * 0.75;

const norm360 = (deg: number) => ((deg % 360) + 360) % 360;
const signedDelta = (a: number, b: number) => {
  const d = norm360(b) - norm360(a);
  return ((d + 540) % 360) - 180;
};
const angularDiff = (a: number, b: number) => Math.abs(signedDelta(a, b));
const toVisual = (deg: number) => norm360(360 - norm360(deg));

const QiblaScreen: React.FC = () => {
  const { t } = useTranslation();
  const isFocused = useIsFocused();
  const insets = useSafeAreaInsets();
  const { bgIndex, setBgIndex } = useMosqueBgStore();
  const bg = MOSQUE_LIST[bgIndex];

  const headingRef = useRef<number>(0);
  const lastHapticAtRef = useRef<number>(0);
  const [heading, setHeading] = useState<number>(0);
  const headingSubRef = useRef<Location.LocationSubscription | null>(null);

  const { data: qiblaAngle = 0, isLoading } = useQibla();

  useEffect(() => {
    if (!isFocused) {
      headingSubRef.current?.remove();
      return;
    }
    (async () => {
      headingSubRef.current = await Location.watchHeadingAsync(h => {
        const raw =
          typeof h.trueHeading === 'number' && h.trueHeading >= 0 ? h.trueHeading : h.magHeading;
        const next = norm360(raw);
        const d = signedDelta(headingRef.current, next);
        const smoothed = norm360(headingRef.current + d * 0.15);
        headingRef.current = smoothed;
        if (angularDiff(heading, smoothed) >= 0.5) setHeading(smoothed);

        // Haptic feedback logic
        if (angularDiff(smoothed, qiblaAngle) <= 2 && Date.now() - lastHapticAtRef.current > 1200) {
          triggerHaptic();
          lastHapticAtRef.current = Date.now();
        }
      });
    })();
    return () => headingSubRef.current?.remove();
  }, [isFocused, qiblaAngle, heading]);

  const delta = useMemo(() => norm360(qiblaAngle - heading), [heading, qiblaAngle]);
  const ringRotationVisual = useMemo(() => toVisual(delta), [delta]);

  if (isLoading) return <Loader visible className="bg-background" />;

  return (
    <ImageBackground source={bg} className="flex-1" resizeMode="cover">
      <View className="flex-1 bg-black/10 px-6">
        <Button
          style={{ marginTop: insets.top }}
          variant="ghost"
          size="icon"
          className="rounded-full shadow-lg bg-muted/20 w-12 h-12 p-2 self-end mt-2"
          onPress={() => {
            triggerHaptic();
            setBgIndex(prev => {
              if (MOSQUE_LIST.length <= 1) return prev;
              let next = prev;
              while (next === prev) {
                next = Math.floor(Math.random() * MOSQUE_LIST.length);
              }
              return next;
            });
          }}
        >
          <Palette size={24} className="text-primary" />
        </Button>
        {/* Compass Area */}
        <View className="flex-1 items-center justify-center">
          <View
            style={{ width: COMPASS_SIZE, height: COMPASS_SIZE }}
            className="items-center justify-center"
          >
            {/* Main Outer Circle */}
            <View
              className="absolute w-full h-full rounded-full border-[1.5px] border-white/60"
              style={{ transform: [{ rotate: `${ringRotationVisual}deg` }] }}
            >
              {/* Cardinal Points */}
              <Text className="absolute self-center -top-8 text-white font-bold">N</Text>
              <Text className="absolute self-center -bottom-8 text-white font-bold">S</Text>
              <Text className="absolute -left-8 top-1/2 -translate-y-2 text-white font-bold">
                W
              </Text>
              <Text className="absolute -right-8 top-1/2 -translate-y-2 text-white font-bold">
                E
              </Text>

              {/* Crosshair lines */}
              <View className="absolute w-[1px] h-full bg-white/20 self-center" />
              <View className="absolute h-[1px] w-full bg-white/20 top-1/2" />

              {/* Kaaba Indicator (Relative to the Ring) */}
              <View
                className="absolute self-center -top-4 items-center justify-center"
                style={{ transform: [{ translateY: -10 }] }}
              >
                <View className="bg-primary p-2 rounded-lg shadow-lg rotate-12">
                  <Kaaba width={24} height={24} fill="white" />
                </View>
              </View>
            </View>

            {/* Center Pointer (Fixed Device Orientation) */}
            <View className="h-2 w-2 bg-white rounded-full m-5" />
            <View className="w-1 h-32 bg-white/80 rounded-full" />
          </View>
        </View>

        {/* Bottom Info */}
        <View className="items-center pb-12">
          <View className="flex-row items-center mb-12">
            <Text className="text-white text-2xl font-bold">{qiblaAngle.toFixed(1)}° N</Text>
            <View className="w-1.5 h-1.5 bg-white/80 rounded-full mx-3" />
            <Text className="text-white text-2xl font-bold">{heading.toFixed(1)}°</Text>
          </View>

          <View className="flex-row justify-between w-full items-center">
            <Tooltip delayDuration={150}>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="rounded-full shadow-lg bg-muted/30 w-12 h-12 p-2"
                >
                  <Info size={24} className="text-primary" />
                </Button>
              </TooltipTrigger>
              <TooltipContent className="ml-6">
                <Text className="text-sm text-center">{t('qibla.compass.help')}</Text>
              </TooltipContent>
            </Tooltip>

            <Button
              variant="ghost"
              size="icon"
              className="rounded-full shadow-lg bg-muted/30 w-12 h-12 p-2"
              onPress={() => {
                triggerHaptic();
                router.back();
              }}
            >
              <X size={24} className="text-primary" />
            </Button>
          </View>
        </View>
      </View>
    </ImageBackground>
  );
};

export default QiblaScreen;
