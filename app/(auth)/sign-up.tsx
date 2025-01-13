import { useSignUp } from '@clerk/clerk-expo';
import { Link, useRouter } from 'expo-router';
import * as React from 'react';
import { Alert, Image, View } from 'react-native';
import ReactNativeModal from 'react-native-modal';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Button } from '~/components/ui/button';
import { Input } from '~/components/ui/input';
import { Text } from '~/components/ui/text';
import { IMAGES } from '~/constants/images';
import { fetchAPI } from '~/lib/fetch';

export default function SignUpScreen() {
  const { isLoaded, signUp, setActive } = useSignUp();
  const router = useRouter();
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
      });
      await signUp.prepareEmailAddressVerification({ strategy: 'email_code' });
      setVerification({
        ...verification,
        state: 'pending',
      });
    } catch (err: any) {
      console.log(JSON.stringify(err, null, 2));
      Alert.alert('Error', err.errors[0].longMessage);
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
        await fetchAPI('/(api)/user', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            username: form.username,
            email: form.email,
            clerkId: completeSignUp.createdUserId,
          }),
        });
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
      }
    } catch (err: any) {
      // See https://clerk.com/docs/custom-flows/error-handling
      // for more info on error handling
      setVerification({
        ...verification,
        error: err.errors[0].longMessage,
        state: 'failed',
      });
    }
  };

  return (
    <SafeAreaView className="flex h-full items-center justify-center bg-background px-6">
      <View className="w-full max-w-md">
        <Text className="text-3xl font-bold text-primary mb-6 text-center">
          Sign Up
        </Text>

        <Input
          autoCapitalize="none"
          className="mb-4 p-3 rounded-lg bg-surface"
          value={form.email}
          placeholder="Enter your email"
          keyboardType="email-address"
          onChangeText={(email) => setForm({ ...form, email })}
        />

        <Input
          className="mb-4 p-3 rounded-lg bg-surface"
          value={form.username}
          placeholder="Enter your username"
          onChangeText={(username) => setForm({ ...form, username })}
        />

        <Input
          className="mb-4 p-3 rounded-lg bg-surface"
          value={form.password}
          placeholder="Enter your password"
          secureTextEntry
          onChangeText={(password) => setForm({ ...form, password })}
        />

        <Button
          onPress={onSignUpPress}
          className="p-4 rounded-lg bg-primary text-white"
        >
          <Text className="text-white text-center">Sign Up</Text>
        </Button>
      </View>

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
        <View className="bg-white px-7 py-9 rounded-2xl min-h-[300px]">
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
            <Text className="text-white text-center">Verify Email</Text>
          </Button>
        </View>
      </ReactNativeModal>

      <ReactNativeModal isVisible={showSuccessModal}>
        <View className="bg-white px-7 py-9 rounded-2xl min-h-[300px]">
          <Image
            source={IMAGES.check}
            className="w-[110px] h-[110px] mx-auto my-5"
          />
          <Text className="text-3xl font-bold text-center">Verified</Text>
          <Text className="text-base text-gray-400 text-center mt-2">
            You have successfully verified your account.
          </Text>
          <Button
            onPress={() => router.push('/(tabs)')}
            className="mt-5 bg-primary p-4 rounded-lg"
          >
            <Text className="text-center">Browse Home</Text>
          </Button>
        </View>
      </ReactNativeModal>

      <View className="mt-8">
        <Text className="text-sm text-secondary text-center mb-2">
          Already have an account?
        </Text>
        <Link href="/(auth)/sign-in" className="text-primary text-center">
          <Text className="font-bold">Sign In</Text>
        </Link>
      </View>

      {/* Use as Guest */}
      <View className="mt-8 flex flex-row gap-2 justify-between items-center">
        <Text className="text-sm text-secondary text-center mb-2">
          Use as Guest
        </Text>
        <Link href="/(tabs)" className="text-primary text-center">
          <Text>Browse Home</Text>
        </Link>
      </View>
    </SafeAreaView>
  );
}
