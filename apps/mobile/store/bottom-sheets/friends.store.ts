import { create } from 'zustand';
import BottomSheet from '@gorhom/bottom-sheet';
import React from 'react';

type FriendsBottomSheetState = {
  createSheetRef: React.RefObject<BottomSheet | null>;
  editSheetRef: React.RefObject<BottomSheet | null>;
  deleteSheetRef: React.RefObject<BottomSheet | null>;
  groupName: string;
  selectedGroup: { id: string; name: string } | null;
  setGroupName: (name: string) => void;
  setSelectedGroup: (group: { id: string; name: string } | null) => void;
};

export const useFriendsBottomSheetStore = create<FriendsBottomSheetState>((set) => {
  const createSheetRef = React.createRef<BottomSheet | null>();
  const editSheetRef = React.createRef<BottomSheet | null>();
  const deleteSheetRef = React.createRef<BottomSheet | null>();

  return {
    createSheetRef,
    editSheetRef,
    deleteSheetRef,
    groupName: '',
    selectedGroup: null,
    setGroupName: (name: string) => set({ groupName: name }),
    setSelectedGroup: (group: { id: string; name: string } | null) => set({ selectedGroup: group }),
  };
});
