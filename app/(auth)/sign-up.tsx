import { useSignUp } from '@clerk/clerk-expo';
import * as React from 'react';
import { Image, View } from 'react-native';
import ReactNativeModal from 'react-native-modal';
import { SafeAreaView } from 'react-native-safe-area-context';

import OAuth from '@/components/shared/o-auth';
import { usePostUser } from '@/hooks/auth/usePostUser';
import { fireToast } from '@/providers/toaster';
import { Button } from 'components/ui/button';
import { Input } from 'components/ui/input';
import { Text } from 'components/ui/text';
import { IMAGES } from 'constants/images';

interface ISignUn {
  onSuccess: () => void;
  onNavigate: () => void;
}

export default function SignUpScreen({ onSuccess, onNavigate }: ISignUn) {
  const { isLoaded, signUp, setActive } = useSignUp();
  const { mutateAsync: postUser } = usePostUser();
  const [showSuccessModal, setShowSuccessModal] = React.useState(false);
  const [form, setForm] = React.useState({
    email: '',
    username: '',
    password: '',
  });
  const [verification, setVerification] = React.useState({
    state: 'default',
    error: '',
    code: '',
  });

  // Handle submission of sign-up form
  const onSignUpPress = async () => {
    if (!isLoaded) return;
    try {
      await signUp.create({
        emailAddress: form.email,
        password: form.password,
        username: form.username,
      });
      await signUp.prepareEmailAddressVerification({ strategy: 'email_code' });
      setVerification({
        ...verification,
        state: 'pending',
      });
    } catch (err) {
      fireToast.error('Error: ' + err.errors[0].longMessage);
    }
  };

  // Handle submission of verification form

  const onPressVerify = async () => {
    if (!isLoaded) return;

    try {
      const completeSignUp = await signUp.attemptEmailAddressVerification({
        code: verification.code,
      });
      if (completeSignUp.status === 'complete') {
        const payload = {
          username: completeSignUp.username,
          email: completeSignUp.emailAddress,
          clerkId: completeSignUp.createdUserId,
        };
        await postUser(payload);
        await setActive({ session: completeSignUp.createdSessionId });
        setVerification({
          ...verification,
          state: 'success',
        });
      } else {
        setVerification({
          ...verification,
          error: 'Verification failed. Please try again.',
          state: 'failed',
        });
        fireToast.error('Verification failed. Please try again.');
      }
    } catch (err) {
      setVerification({
        ...verification,
        error: err.errors[0].longMessage,
        state: 'failed',
      });
    }
  };

  return (
    <SafeAreaView>
      <View className="w-full max-w-md">
        <Text className="text-3xl font-bold text-primary mb-2 text-center">
          Join Us
        </Text>
        <Text className="text-sm text-muted-foreground text-center mb-6">
          Sign up with your email and password
        </Text>

        <Input
          label="Email"
          autoCapitalize="none"
          className="mb-4 p-3 rounded-lg bg-surface"
          value={form.email}
          placeholder="Enter your email"
          keyboardType="email-address"
          onChangeText={(email) => setForm({ ...form, email })}
        />

        <Input
          label="Username"
          className="mb-4 p-3 rounded-lg bg-surface"
          value={form.username}
          placeholder="Enter your username"
          onChangeText={(username) => setForm({ ...form, username })}
        />

        <Input
          label="Password"
          className="mb-10 p-3 rounded-lg bg-surface"
          value={form.password}
          placeholder="Enter your password"
          secureTextEntry
          onChangeText={(password) => setForm({ ...form, password })}
        />

        <Button
          onPress={onSignUpPress}
          className="p-4 rounded-lg bg-primary text-white"
        >
          <Text className="text-black text-center">Sign Up</Text>
        </Button>
      </View>
      <OAuth />

      <View className="mt-8 flex flex-row justify-center items-center gap-4 ">
        <Text className="text-sm text-muted-foreground text-center ">
          Already have an account?
        </Text>
        <Button variant="link" onPress={onNavigate}>
          <Text>Sign In</Text>
        </Button>
      </View>

      {/* MODALS */}

      <ReactNativeModal
        isVisible={verification.state === 'pending'}
        onBackdropPress={() =>
          setVerification({ ...verification, state: 'default' })
        }
        onModalHide={() => {
          if (verification.state === 'success') {
            setShowSuccessModal(true);
          }
        }}
      >
        <View className="bg-muted px-7 py-14 rounded-2xl ">
          <Text className="text-2xl font-bold mb-2">Verification</Text>
          <Text className="text-gray-600 mb-5">
            We&apos;ve sent a verification code to {form.email}.
          </Text>
          <Input
            placeholder="12345"
            className="p-3 rounded-lg bg-surface border border-gray-200"
            value={verification.code}
            keyboardType="numeric"
            onChangeText={(code) => setVerification({ ...verification, code })}
          />
          {verification.error && (
            <Text className="text-red-500 text-sm mt-2">
              {verification.error}
            </Text>
          )}
          <Button onPress={onPressVerify} className="mt-5 p-4 rounded-lg">
            <Text className="text-center">Verify Email</Text>
          </Button>
        </View>
      </ReactNativeModal>

      {/* SUCCESS MODAL */}

      <ReactNativeModal isVisible={showSuccessModal}>
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
            className="mt-5 bg-primary p-4 rounded-lg"
          >
            <Text className="text-center">Browse Home</Text>
          </Button>
        </View>
      </ReactNativeModal>
    </SafeAreaView>
  );
}
