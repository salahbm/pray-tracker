import { cn } from '@/lib/utils';
import BottomSheet, {
  BottomSheetBackdrop,
  BottomSheetScrollView,
  ScrollEventsHandlersHookType,
} from '@gorhom/bottom-sheet';
import React from 'react';
import { StyleProp, View, ViewStyle } from 'react-native';
import { AnimatedStyle } from 'react-native-reanimated';
import { NativeSyntheticEvent, NativeScrollEvent } from 'react-native';

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
}: IBottomSheet) => {
  return (
    <BottomSheet
      ref={sheetRef}
      index={index} // Start closed
      snapPoints={snapPoints}
      enablePanDownToClose={true} // Enable swipe down to close
      onChange={handleSheetChange}
      style={bottomSheetStyle}
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
      handleComponent={() => (
        <View className="bg-muted flex justify-center rounded-t-md py-4">
          <View className="h-2 w-[60px] rounded bg-muted-foreground self-center" />
        </View>
      )}
    >
      <BottomSheetScrollView
        onScroll={onScroll}
        contentContainerStyle={scrollStyle}
        className={cn('bg-muted px-6 flex-1', scrollClassName)}
      >
        {children}
      </BottomSheetScrollView>
    </BottomSheet>
  );
};

export default CustomBottomSheet;
