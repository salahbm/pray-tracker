import React, {
  useRef, useState, useMemo, useEffect, useCallback, memo,
} from 'react';
import {
  Dimensions,
  StyleSheet,
  TouchableOpacity,
  View,
  NativeSyntheticEvent,
  NativeScrollEvent,
  FlatList as RNFlatList,
  Modal,
  InteractionManager,
  Animated,
  Easing,
  Platform,
} from 'react-native';
import * as Haptics from 'expo-haptics';
import { useTranslation } from 'react-i18next';

import { useThemeStore } from '@/store/defaults/theme';
import { Button } from '../ui/button';
import { Text } from '../ui/text';

const ITEM_HEIGHT = 50;
const VISIBLE_ITEMS = 5;
const TOP_PAD = (ITEM_HEIGHT * (VISIBLE_ITEMS - 1)) / 2;

type Props = {
  visible: boolean;
  value: number;
  minYear?: number;
  onConfirm: (year: number) => void;
  onCancel: () => void;
};

const AnimatedFlatList = Animated.createAnimatedComponent(RNFlatList<number>);

// Memoized row
const Row = memo(function Row({
  year,
  index,
  selected,
  onPress,
  colors,
  animatedStyle,
}: {
  year: number;
  index: number;
  selected: boolean;
  onPress: (year: number, index: number) => void;
  colors: Record<string, string>;
  animatedStyle: { scale: any; opacity: any; color?: any };
}) {
  return (
    <TouchableOpacity
      onPress={() => onPress(year, index)}
      activeOpacity={0.7}
      style={[styles.row, { height: ITEM_HEIGHT }]}
    >
      <Animated.Text
        className="text-center"
        style={[
          {
            transform: [{ scale: animatedStyle.scale }],
            opacity: animatedStyle.opacity,
            color:
              (animatedStyle.color as any) ??
              (selected ? colors['--primary'] : colors['--muted-foreground']),
            fontSize: selected ? 24 : 18,
            fontWeight: selected ? 'bold' : 'normal',
          },
        ]}
      >
        {year}
      </Animated.Text>
    </TouchableOpacity>
  );
});

const YearPicker: React.FC<Props> = ({
  visible,
  value,
  minYear = 2000,
  onConfirm,
  onCancel,
}) => {
  const { t } = useTranslation();
  const { colors } = useThemeStore();

  const currentYear = useMemo(() => new Date().getFullYear(), []);
  const years = useMemo<ReadonlyArray<number>>(
    () => Array.from({ length: currentYear - minYear + 1 }, (_, i) => minYear + i),
    [currentYear, minYear]
  );

  const listRef = useRef<RNFlatList<number>>(null);

  // guards
  const isAutoScrollingRef = useRef(false);
  const didInitialScrollRef = useRef(false);

  // animated drivers
  const scrollY = useRef(new Animated.Value(0)).current; // drives highlight
  const animY = useRef(new Animated.Value(0)).current;   // drives programmatic snap
  const animListenerRef = useRef<string | null>(null);
  const lastYRef = useRef(0); // last observed offset for smooth starts

  const [localYear, setLocalYear] = useState<number>(value);

  // sync local when dialog closes/reopens
  useEffect(() => {
    if (!visible) setLocalYear(value);
  }, [visible, value]);

  // helpers
  const clamp = useCallback(
    (n: number, min: number, max: number) => Math.max(min, Math.min(max, n)),
    []
  );

  // ✅ Correct index math: do NOT subtract TOP_PAD when using padding
  const indexFromOffset = useCallback(
    (y: number) => {
      const raw = y / ITEM_HEIGHT;
      const idx = Math.round(raw);
      return clamp(idx, 0, years.length - 1);
    },
    [years.length, clamp]
  );

  // ✅ Correct offset: do NOT add TOP_PAD; padding is provided via contentContainerStyle
  const offsetForIndex = useCallback(
    (index: number) => {
      const clamped = clamp(index, 0, years.length - 1);
      return clamped * ITEM_HEIGHT;
    },
    [years.length, clamp]
  );

  // initial instant jump to current value when modal opens
  useEffect(() => {
    if (!visible) {
      didInitialScrollRef.current = false;
      return;
    }
    if (didInitialScrollRef.current) return;

    const index = years.findIndex((y) => y === value);
    if (index < 0) return;

    const task = InteractionManager.runAfterInteractions(() => {
      isAutoScrollingRef.current = true;
      const offset = offsetForIndex(index);
      listRef.current?.scrollToOffset({ offset, animated: false });
      lastYRef.current = offset;

      requestAnimationFrame(() => {
        isAutoScrollingRef.current = false;
        didInitialScrollRef.current = true;
      });
    });

    return () => task.cancel();
  }, [visible, value, years, offsetForIndex]);

  // programmatic snap with easing (fast, “ease-in” feel)
  const easeToIndex = useCallback(
    (index: number, duration = 130) => {
      const targetOffset = offsetForIndex(index);
      isAutoScrollingRef.current = true;

      if (animListenerRef.current) {
        animY.removeListener(animListenerRef.current);
        animListenerRef.current = null;
      }

      const startOffset = lastYRef.current ?? targetOffset;
      animY.setValue(startOffset);

      animListenerRef.current = animY.addListener(({ value }) => {
        listRef.current?.scrollToOffset({ offset: value, animated: false });
      });

      Animated.timing(animY, {
        toValue: targetOffset,
        duration,
        easing: Easing.in(Easing.cubic),
        useNativeDriver: false, // must be false to drive scrollToOffset
      }).start(() => {
        if (animListenerRef.current) {
          animY.removeListener(animListenerRef.current);
          animListenerRef.current = null;
        }
        lastYRef.current = targetOffset;
        isAutoScrollingRef.current = false;
      });
    },
    [animY, offsetForIndex]
  );

  const handleConfirm = useCallback(() => {
    onConfirm(localYear);
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
  }, [localYear, onConfirm]);

  const handleCancel = useCallback(() => {
    setLocalYear(value);
    onCancel();
  }, [value, onCancel]);

  // selection while scrolling (drag or momentum), but not during programmatic auto-scroll
  const onScrollLogical = useCallback(
    (e: NativeSyntheticEvent<NativeScrollEvent>) => {
      const y = e.nativeEvent.contentOffset.y;
      lastYRef.current = y;
      if (isAutoScrollingRef.current) return;

      const index = indexFromOffset(y);
      const yAtIndex = years[index];
      if (typeof yAtIndex === 'number' && yAtIndex !== localYear) {
        setLocalYear(yAtIndex);
        Haptics.selectionAsync();
      }
    },
    [years, localYear, indexFromOffset]
  );

  const onMomentumEnd = useCallback(
    (e: NativeSyntheticEvent<NativeScrollEvent>) => {
      if (isAutoScrollingRef.current) return;
      const y = e.nativeEvent.contentOffset.y;
      const index = indexFromOffset(y);
      easeToIndex(index, 120);
    },
    [easeToIndex, indexFromOffset]
  );

  // ✅ Centered highlight (scale/opacity/color peak at center line)
  // Make item + centerLine reference frames consistent by including TOP_PAD on the item center.
  const useRowAnimatedStyle = useCallback(
    (index: number) => {
      const itemCenter = TOP_PAD + index * ITEM_HEIGHT + ITEM_HEIGHT / 2;
      const centerLine = Animated.add(scrollY, TOP_PAD + ITEM_HEIGHT / 2);
      const dist = Animated.diffClamp(
        Animated.subtract(itemCenter, centerLine),
        -ITEM_HEIGHT * 2,
        ITEM_HEIGHT * 2
      );

      const scale = dist.interpolate({
        inputRange: [0, ITEM_HEIGHT, ITEM_HEIGHT * 2],
        outputRange: [1.1, 1.0, 1.0],
        extrapolate: 'clamp',
      });

      const opacity = dist.interpolate({
        inputRange: [0, ITEM_HEIGHT, ITEM_HEIGHT * 2],
        outputRange: [1.0, 0.7, 0.6],
        extrapolate: 'clamp',
      });

      const anyAnimated: any = Animated;
      const color =
        anyAnimated.interpolateColor?.(dist, {
          inputRange: [0, ITEM_HEIGHT],
          outputRange: [colors['--primary'], colors['--muted-foreground']],
        }) ?? undefined;

      return { scale, opacity, color };
    },
    [scrollY, colors]
  );

  const onItemPress = useCallback(
    (year: number, index: number) => {
      setLocalYear(year);
      easeToIndex(index, 140);
      Haptics.selectionAsync();
    },
    [easeToIndex]
  );

  const renderItem = useCallback(
    ({ item, index }: { item: number | undefined; index: number }) => {
      if (item == null) return null;
      const selected = localYear === item;
      const animatedStyle = useRowAnimatedStyle(index);
      return (
        <Row
          year={item}
          index={index}
          selected={selected}
          onPress={onItemPress}
          colors={colors as any}
          animatedStyle={animatedStyle}
        />
      );
    },
    [localYear, colors, onItemPress, useRowAnimatedStyle]
  );

  const getItemLayout = useCallback(
    (_: unknown, index: number) => ({
      length: ITEM_HEIGHT,
      offset: ITEM_HEIGHT * index,
      index,
    }),
    []
  );

  const keyExtractor = useCallback(
    (item: number | undefined, index: number) =>
      typeof item === 'number' ? String(item) : `idx-${index}`,
    []
  );

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={handleCancel}
      statusBarTranslucent
    >
      <View style={styles.overlay}>
        <TouchableOpacity style={styles.backdrop} activeOpacity={1} onPress={handleCancel} />

        <View
          style={[
            styles.content,
            { backgroundColor: colors['--background'] },
          ]}
        >
          <View className="px-4 py-6">
            <Text style={[styles.title, { color: colors['--foreground'] }]}>
              {t('Commons.YearPicker.Title')}
            </Text>

            <View style={styles.pickerBox}>
              <View
                pointerEvents="none"
                style={[
                  styles.indicator,
                  {
                    borderColor: colors['--primary'],
                    backgroundColor: `${colors['--primary']}15`,
                  },
                ]}
              />

              <AnimatedFlatList
                ref={listRef}
                data={years}
                keyExtractor={keyExtractor}
                renderItem={renderItem}
                getItemLayout={getItemLayout}
                showsVerticalScrollIndicator={false}
                snapToInterval={ITEM_HEIGHT}
                decelerationRate={Platform.OS === 'ios' ? 'fast' : 0.98}
                removeClippedSubviews
                initialNumToRender={Math.min(12, years.length)}
                maxToRenderPerBatch={12}
                windowSize={9}
                onMomentumScrollEnd={onMomentumEnd}
                onScroll={Animated.event(
                  [{ nativeEvent: { contentOffset: { y: scrollY } } }],
                  {
                    useNativeDriver: true,
                    listener: onScrollLogical,
                  }
                )}
                scrollEventThrottle={16}
                // ✅ Keep the vertical padding so index/offset math can ignore TOP_PAD
                contentContainerStyle={{ paddingVertical: TOP_PAD }}
                onScrollToIndexFailed={(info) => {
                  const count = years.length;
                  const safeIndex = clamp(info.index, 0, count - 1);
                  setTimeout(() => {
                    const offset = offsetForIndex(safeIndex);
                    listRef.current?.scrollToOffset({ offset, animated: false });
                    lastYRef.current = offset;
                  }, 60);
                }}
              />
            </View>

            <View style={styles.buttonsRow} pointerEvents="box-none">
              <Button onPress={handleCancel} variant="outline" size="sm">
                <Text>{t('Commons.YearPicker.Cancel')}</Text>
              </Button>
              <Button onPress={handleConfirm} size="sm">
                <Text>{t('Commons.YearPicker.Confirm')}</Text>
              </Button>
            </View>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1, justifyContent: 'center', alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  backdrop: {
    position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, zIndex: 1,
  },
  content: {
    width: Dimensions.get('window').width * 0.9,
    maxWidth: 420,
    borderRadius: 16,
    elevation: 8,
    zIndex: 2,
  },
  title: { fontSize: 20, fontWeight: '700', marginBottom: 20 },
  pickerBox: {
    alignSelf: 'center',
    height: ITEM_HEIGHT * VISIBLE_ITEMS,
    width: '100%',
    justifyContent: 'center',
    overflow: 'hidden',
    borderRadius: 12,
    position: 'relative',
  },
  indicator: {
    position: 'absolute',
    top: '50%',
    left: 0, right: 0,
    transform: [{ translateY: -ITEM_HEIGHT / 2 }],
    height: ITEM_HEIGHT,
    borderTopWidth: 2, borderBottomWidth: 2, borderRadius: 8,
    zIndex: 5,
  },
  row: { justifyContent: 'center', alignItems: 'center' },
  buttonsRow: {
    marginTop: 16, flexDirection: 'row', justifyContent: 'flex-end', gap: 8, zIndex: 6,
  },
});

export default YearPicker;
