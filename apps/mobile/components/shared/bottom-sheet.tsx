import BottomSheet, {
  BottomSheetBackdrop,
  BottomSheetScrollView,
  ScrollEventsHandlersHookType,
} from '@gorhom/bottom-sheet';
import React from 'react';
import { StyleProp, View, ViewStyle } from 'react-native';
import { NativeScrollEvent, NativeSyntheticEvent } from 'react-native';
import { AnimatedStyle } from 'react-native-reanimated';

import { cn } from '@/lib/utils';

interface IBottomSheet {
  sheetRef: React.RefObject<BottomSheet | null>;
  index?: number;
  snapPoints?: string[];
  handleSheetChange?: (index: number) => void;
  children: React.ReactNode;
  bottomSheetStyle?: StyleProp<
    AnimatedStyle<
      Omit<
        ViewStyle,
        'flexDirection' | 'position' | 'top' | 'left' | 'bottom' | 'right' | 'opacity' | 'transform'
      >
    >
  >;
  scrollStyle?: StyleProp<ViewStyle> | undefined;
  opacity?: number;
  scrollClassName?: string;
  onScroll?: (event: NativeSyntheticEvent<NativeScrollEvent>) => void;
  containerStyle?: StyleProp<ViewStyle> | undefined;
  detached?: boolean;
  grabbable?: boolean;
}

const CustomBottomSheet = ({
  sheetRef,
  snapPoints = ['90%', '100%'],
  handleSheetChange,
  children,
  bottomSheetStyle,
  scrollStyle,
  index = -1,
  opacity = 0.4,
  scrollClassName,
  onScroll,
  detached = false,
  containerStyle,
  grabbable = true,
}: IBottomSheet) => {
  return (
    <BottomSheet
      ref={sheetRef}
      index={index} // Start closed
      snapPoints={snapPoints}
      enablePanDownToClose={true} // Enable swipe down to close
      onChange={handleSheetChange}
      style={bottomSheetStyle}
      detached={detached}
      containerStyle={containerStyle}
      enableContentPanningGesture={true} // Enable content panning gesture for Android
      backdropComponent={backdropProps => (
        <BottomSheetBackdrop
          {...backdropProps}
          appearsOnIndex={0}
          disappearsOnIndex={-1}
          enableTouchThrough={true}
          opacity={opacity}
        />
      )}
      handleComponent={null}
    >
      <BottomSheetScrollView
        invertStickyHeaders
        scrollEventThrottle={16}
        scrollEnabled={true}
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
        keyboardDismissMode="on-drag"
        onScroll={onScroll}
        contentContainerStyle={scrollStyle}
        className={cn('bg-muted px-6 flex-1 rounded-t-md', scrollClassName)}
      >
        {grabbable ? (
          <View className="flex-center py-4">
            <View className="h-2 w-16 rounded bg-muted-foreground" />
          </View>
        ) : null}
        {children}
      </BottomSheetScrollView>
    </BottomSheet>
  );
};

export default CustomBottomSheet;
