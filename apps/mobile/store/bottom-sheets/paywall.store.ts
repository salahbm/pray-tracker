import { create } from 'zustand';
import BottomSheet from '@gorhom/bottom-sheet';
import React from 'react';

type PaywallBottomSheetState = {
  paywallSheetRef: React.RefObject<BottomSheet | null>;
};

export const usePaywallBottomSheetStore = create<PaywallBottomSheetState>(() => {
  const ref = React.createRef<BottomSheet | null>();

  return {
    paywallSheetRef: ref,
  };
});
