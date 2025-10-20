import React, { Fragment, useCallback, useState } from 'react';
import { View } from 'react-native';
import CustomBottomSheet from '@/components/shared/bottom-sheet';
import ProfilePage from '@/app/(screens)/profile';
import BottomSheet, { BottomSheetTextInput } from '@gorhom/bottom-sheet';
import { useAuthBottomSheetStore, useProfileBottomSheetStore } from '@/store/bottom-sheets';
import { useFriendsBottomSheetStore } from '@/store/bottom-sheets/friends.store';
import SignInScreen from '@/app/(auth)/sign-in';
import SignUpScreen from '@/app/(auth)/sign-up';
import ForgotPasswordScreen from '@/app/(auth)/forgot-pwd';
import { triggerHaptic } from '@/utils/haptics';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Text } from '@/components/ui/text';
import { FolderPlus, Edit2, Trash2 } from 'lucide-react-native';
import { useTranslation } from 'react-i18next';
import { useThemeStore } from '@/store/defaults/theme';
import { useCreateGroup } from '@/hooks/friends/useCreateGroup';
import { useUpdateGroup } from '@/hooks/friends/useUpdateGroup';
import { useDeleteGroup } from '@/hooks/friends/useDeleteGroup';
import { useAuthStore } from '@/store/auth/auth-session';
import { cn } from '@/lib/utils';
import CreateGroupSheet from '@/components/views/friends/create-group-sheet';
import EditGroupSheet from '@/components/views/friends/edit-group-sheet';
import DeleteGroupSheet from '@/components/views/friends/delete-group-sheet';

interface ISheetWrapperProps {}

const SheetWrapper: React.FC<ISheetWrapperProps> = props => {
  const { t } = useTranslation();
  const { colors } = useThemeStore();
  const { user } = useAuthStore();
  const { profileSheetRef } = useProfileBottomSheetStore();
  const { signInSheetRef, signUpSheetRef, forgotPwdRef } = useAuthBottomSheetStore();
  const {
    createSheetRef,
    editSheetRef,
    deleteSheetRef,
    groupName,
    selectedGroup,
    setGroupName,
    setSelectedGroup,
  } = useFriendsBottomSheetStore();

  // Friends mutations
  const { mutateAsync: createGroup, isPending: isCreating } = useCreateGroup();
  const { mutateAsync: updateGroup, isPending: isUpdating } = useUpdateGroup();
  const { mutateAsync: deleteGroup, isPending: isDeleting } = useDeleteGroup();

  // Callbacks to present each sheet
  const handlePresentSignIn = useCallback(async () => {
    await triggerHaptic();
    forgotPwdRef.current?.close();
    signUpSheetRef.current?.close();
    signInSheetRef.current?.snapToIndex(1);
  }, []);

  const handlePresentSignUp = useCallback(async () => {
    await triggerHaptic();
    signInSheetRef.current?.close();
    signUpSheetRef.current?.snapToIndex(1);
  }, []);

  const handlePresentForgotPwd = useCallback(async () => {
    await triggerHaptic();
    signInSheetRef.current?.close();
    forgotPwdRef.current?.snapToIndex(1);
  }, []);

  // Friends group handlers
  const handleCreateGroup = async () => {
    if (!groupName.trim() || !user?.id) return;

    await createGroup({
      userId: user.id,
      name: groupName.trim(),
    }).then(() => {
      setGroupName('');
      createSheetRef.current?.close();
    });
  };

  const handleUpdateGroup = async () => {
    if (!groupName.trim() || !selectedGroup || !user?.id) return;

    await updateGroup({
      groupId: selectedGroup.id,
      name: groupName.trim(),
      userId: user.id,
    }).then(() => {
      setGroupName('');
      setSelectedGroup(null);
      editSheetRef.current?.close();
    });
  };

  const handleDeleteGroup = async () => {
    if (!selectedGroup || !user?.id) return;

    await deleteGroup({
      groupId: selectedGroup.id,
      userId: user.id,
    }).then(() => {
      setSelectedGroup(null);
      deleteSheetRef.current?.close();
    });
  };

  return (
    <Fragment>
      {/* BOTTOM SHEET */}
      <CustomBottomSheet sheetRef={signInSheetRef}>
        <SignInScreen
          onSuccess={() => signInSheetRef.current?.close()}
          onNavigate={handlePresentSignUp}
          onForgotPassword={handlePresentForgotPwd}
        />
      </CustomBottomSheet>
      {/* SIGN UP SHEET */}
      <CustomBottomSheet sheetRef={signUpSheetRef}>
        <SignUpScreen
          onSuccess={() => signUpSheetRef.current?.close()}
          onNavigate={handlePresentSignIn}
        />
      </CustomBottomSheet>
      {/* FORGOT  PASSWORD  SHEET */}
      <CustomBottomSheet sheetRef={forgotPwdRef}>
        <ForgotPasswordScreen
          onNavigate={handlePresentSignIn}
          onSuccess={() => forgotPwdRef.current?.close()}
        />
      </CustomBottomSheet>
      {/* PROFILE */}
      <CustomBottomSheet sheetRef={profileSheetRef}>
        <ProfilePage />
      </CustomBottomSheet>

      {/* GROUPS */}
      <CreateGroupSheet sheetRef={createSheetRef} />
      <EditGroupSheet sheetRef={editSheetRef} />
      <DeleteGroupSheet sheetRef={deleteSheetRef} />
    </Fragment>
  );
};

export default SheetWrapper;
