import BottomSheet, {
  BottomSheetBackdrop,
  BottomSheetScrollView,
} from '@gorhom/bottom-sheet';
import React from 'react';
import { StyleProp, View, ViewStyle } from 'react-native';
import { AnimatedStyle } from 'react-native-reanimated';

interface IBottomSheet {
  sheetRef: React.RefObject<BottomSheet>;
  index?: number;
  snapPoints?: string[];
  handleSheetChange?: (index: number) => void;
  children: React.ReactNode;
  bottomSheetStyle?: StyleProp<
    AnimatedStyle<
      Omit<
        ViewStyle,
        | 'flexDirection'
        | 'position'
        | 'top'
        | 'left'
        | 'bottom'
        | 'right'
        | 'opacity'
        | 'transform'
      >
    >
  >;
  scrollStyle?: StyleProp<ViewStyle> | undefined;
}

const CustomBottomSheet = ({
  sheetRef,
  snapPoints = ['50%', '90%', '100%'],
  handleSheetChange,
  children,
  bottomSheetStyle,
  scrollStyle,
  index = -1,
}: IBottomSheet) => {
  return (
    <BottomSheet
      ref={sheetRef}
      index={index} // Start closed
      snapPoints={snapPoints}
      enablePanDownToClose={true} // Enable swipe down to close
      onChange={handleSheetChange}
      style={bottomSheetStyle}
      containerStyle={{ zIndex: 10000 }}
      backdropComponent={(backdropProps) => (
        <BottomSheetBackdrop {...backdropProps} enableTouchThrough={true} />
      )}
      handleComponent={() => (
        <View className="bg-muted  flex justify-center rounded-t-lg py-4">
          <View className="h-2 w-[60px] rounded-[3px] bg-muted-foreground self-center" />
        </View>
      )}
    >
      <BottomSheetScrollView
        contentContainerStyle={scrollStyle}
        className="bg-muted px-6"
      >
        {children}
      </BottomSheetScrollView>
    </BottomSheet>
  );
};

export default CustomBottomSheet;
