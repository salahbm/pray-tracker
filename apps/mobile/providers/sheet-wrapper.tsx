import React, { Fragment, useRef } from 'react';
import CustomBottomSheet from '@/components/shared/bottom-sheet';
import ProfilePage from '@/app/(screens)/profile';
import BottomSheet from '@gorhom/bottom-sheet';
import { useAuthBottomSheetStore, useProfileBottomSheetStore } from '@/store/bottom-sheets';
import SignInScreen from '@/app/(auth)/sign-in';
import SignUpScreen from '@/app/(auth)/sign-up';
import ForgotPasswordScreen from '@/app/(auth)/forgot-pwd';

interface ISheetWrapperProps {}

const SheetWrapper: React.FC<ISheetWrapperProps> = props => {
  const { profileSheetRef } = useProfileBottomSheetStore();
  const { signInSheetRef, signUpSheetRef, forgotPwdRef } = useAuthBottomSheetStore();
  const handlePresentSignIn = () => {
    signInSheetRef.current?.expand();
  };
  const handlePresentSignUp = () => {
    signUpSheetRef.current?.expand();
  };
  const handlePresentForgotPwd = () => {
    forgotPwdRef.current?.expand();
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
    </Fragment>
  );
};

export default SheetWrapper;
