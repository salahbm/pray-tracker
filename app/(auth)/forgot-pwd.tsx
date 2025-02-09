import { X } from 'lucide-react-native';
import React, { useState, useCallback } from 'react';
import { Image, View } from 'react-native';
import ReactNativeModal from 'react-native-modal';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Text } from '@/components/ui/text';
import { IMAGES } from '@/constants/images';
import { useResetPwd } from '@/hooks/auth/useForgotPwd';

export default function ForgotPasswordScreen({
  onNavigate,
  onSuccess,
}: {
  onNavigate: () => void;
  onSuccess: () => void;
}) {
  const [email, setEmail] = useState('');
  const [token, setToken] = useState('');
  const { verifyRequest, sendRequest, isRequestPending, isVerifyPending } =
    useResetPwd();

  // Modals
  const [showOtpModal, setShowOtpModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const onResetPassword = useCallback(async () => {
    await sendRequest.mutateAsync(email).then(() => {
      setShowOtpModal(true);
    });
  }, [email, sendRequest]);

  // Handle email verification
  const handlePressVerify = async () => {
    await verifyRequest.mutateAsync({
      email,
      token,
    });

    setEmail('');
    setToken('');
    setShowOtpModal(false);
    setShowSuccessModal(true);
  };

  return (
    <React.Fragment>
      <View className="w-full max-w-md mt-8">
        <Text className="text-3xl font-bold text-primary mb-6 text-center">
          Reset Password
        </Text>
        <Input
          label="Email"
          autoCapitalize="none"
          className="mb-4 p-3"
          value={email}
          placeholder="Enter your email"
          keyboardType="email-address"
          onChangeText={setEmail}
        />
        <Button
          className="mb-4"
          onPress={onResetPassword}
          disabled={isRequestPending || isVerifyPending}
        >
          <Text className="font-bold">Send Verification</Text>
        </Button>
      </View>

      <View className="mt-8 flex flex-row justify-center items-center">
        <Text className="text-sm text-muted-foreground text-center">
          Remembered your password?
        </Text>
        <Button
          variant="link"
          onPress={onNavigate}
          disabled={isRequestPending || isVerifyPending}
        >
          <Text className="font-primary">Sign In</Text>
        </Button>
      </View>

      {/* VERIFICATION MODAL */}
      <ReactNativeModal
        isVisible={showOtpModal}
        backdropOpacity={0.4}
        avoidKeyboard
      >
        <View className="bg-muted px-7 py-14 rounded-2xl relative border border-border">
          <Button
            className="absolute top-2 right-0"
            variant="ghost"
            disabled={isRequestPending || isVerifyPending}
          >
            <X
              size={24}
              onPress={() => setShowOtpModal(false)}
              className="fill-white"
            />
          </Button>
          <Text className="text-2xl font-bold mb-2">Verification</Text>
          <Text className=" mb-5">
            We&apos;ve sent a verification code to {email}.
          </Text>
          <Input
            placeholder="Enter Code"
            value={token}
            keyboardType="numeric"
            onChangeText={setToken}
          />

          <Button
            onPress={handlePressVerify}
            className="mt-5"
            disabled={isRequestPending || isVerifyPending}
          >
            <Text>Verify Email</Text>
          </Button>
        </View>
      </ReactNativeModal>

      {/* SUCCESS MODAL */}
      <ReactNativeModal
        isVisible={showSuccessModal}
        onBackdropPress={() => {
          setShowSuccessModal(false);
          onSuccess();
        }}
      >
        <View className="bg-muted px-7 py-9 rounded-2xl min-h-[300px]">
          <Image
            source={IMAGES.check}
            className="w-[110px] h-[110px] mx-auto my-5"
          />
          <Text className="text-3xl font-bold text-center">Verified</Text>
          <Text className="text-base text-muted-foreground text-center mt-2">
            You have successfully verified your account.
          </Text>
          <Button
            onPress={() => {
              setShowSuccessModal(false);
              onSuccess();
            }}
            className="mt-5"
          >
            <Text>Browse Home</Text>
          </Button>
        </View>
      </ReactNativeModal>
    </React.Fragment>
  );
}
