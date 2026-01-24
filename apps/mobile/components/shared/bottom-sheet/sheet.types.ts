import { BottomSheetScrollViewProps } from '@gorhom/bottom-sheet/lib/typescript/components/bottomSheetScrollable/types';
import { BottomSheetViewProps } from '@gorhom/bottom-sheet/lib/typescript/components/bottomSheetView/types';
import { BottomSheetModalProps } from '@gorhom/bottom-sheet/lib/typescript/components/bottomSheetModal/types';

export type ScrollConfig = Partial<BottomSheetScrollViewProps> & {
  className?: string;
};

export type BottomSheetViewConfig = Partial<BottomSheetViewProps> & {
  className?: string;
};

export interface ScrollBottomSheetProps extends Omit<BottomSheetModalProps, 'children'> {
  backdropConfig?: {
    pressBehavior?: 'none' | 'close' | 'collapse' | number;
    appearsOnIndex?: number;
    disappearsOnIndex?: number;
    enableTouchThrough?: boolean;
  };
  scrollConfig?: ScrollConfig;
  children: React.ReactNode;
}

export const DEFAULT_SHEET_CONFIG: Partial<BottomSheetModalProps> = {
  enablePanDownToClose: true,
  enableContentPanningGesture: true,
  enableDismissOnClose: true,
  handleIndicatorStyle: {
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
  },
};
