import React from 'react';
import { Image, View } from 'react-native';
import ReactNativeModal from 'react-native-modal';

import { X } from '@/components/shared/icons';
import { usePostUser } from '@/hooks/auth/usePostUser';
import { Button } from 'components/ui/button';
import { Input } from 'components/ui/input';
import { Text } from 'components/ui/text';
import { IMAGES } from 'constants/images';

interface ISignUp {
  onSuccess: () => void;
  onNavigate: () => void;
}

export default function SignUpScreen({ onSuccess, onNavigate }: ISignUp) {
  const {
    supabaseSignUp,
    onPressVerify,
    postUser,
    isPostUserSuccess,
    isPendingSupabaseSignUp,
    isPendingOnPressVerify,
    isPendingPostUser,
  } = usePostUser();

  const [form, setForm] = React.useState({
    email: '',
    username: '',
    password: '',
    token: '',
  });

  const [error, setError] = React.useState<string | null>(null);
  const [showSuccessModal, setShowSuccessModal] =
    React.useState(isPostUserSuccess);
  const [showOtpModal, setShowOtpModal] = React.useState(false);

  // Handle sign-up process
  const onSignUpPress = async () => {
    try {
      setError(null);
      await supabaseSignUp(form);
      setShowOtpModal(true);
    } catch (err) {
      setError(err.message || 'Sign-up failed.');
    }
  };

  // Handle email verification
  const handlePressVerify = async () => {
    try {
      setError(null);
      const data = await onPressVerify(form);

      const payload = {
        email: form.email,
        password: form.password,
        username: form.username,
        supabaseId: data.user.id,
      };

      await postUser(payload);

      setShowOtpModal(false);
      setShowSuccessModal(true);
    } catch (err) {
      setError(err.message || 'Verification failed.');
    }
  };

  return (
    <React.Fragment>
      <View className="w-full max-w-md mt-8">
        <Text className="text-3xl font-bold text-primary mb-2 text-center">
          Join Us
        </Text>
        <Text className="text-sm text-muted-foreground text-center mb-6">
          Create an account to continue
        </Text>

        <Input
          label="Email"
          autoCapitalize="none"
          className="mb-4"
          value={form.email}
          placeholder="Enter your email"
          keyboardType="email-address"
          onChangeText={(email) => setForm({ ...form, email })}
        />

        <Input
          label="Username"
          className="mb-4"
          value={form.username}
          placeholder="Enter your username"
          onChangeText={(username) => setForm({ ...form, username })}
        />

        <Input
          label="Password"
          className="mb-10"
          value={form.password}
          placeholder="Enter your password"
          secureTextEntry
          onChangeText={(password) => setForm({ ...form, password })}
        />

        <Button
          onPress={onSignUpPress}
          className="p-4 rounded-lg bg-primary text-white"
          disabled={isPendingSupabaseSignUp}
        >
          <Text>Sign Up</Text>
        </Button>
        {error && <Text className="text-destructive mt-2">{error}</Text>}
      </View>

      <View className="mt-8 flex flex-row justify-center items-center gap-4">
        <Text className="text-sm text-muted-foreground text-center">
          Already have an account?
        </Text>
        <Button variant="link" onPress={onNavigate}>
          <Text>Sign In</Text>
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
            disabled={isPendingPostUser || isPendingOnPressVerify}
          >
            <X
              size={24}
              onPress={() => setShowOtpModal(false)}
              className="fill-white"
            />
          </Button>
          <Text className="text-2xl font-bold mb-2">Verification</Text>
          <Text className="text-gray-600 mb-5">
            We&apos;ve sent a verification code to {form.email}.
          </Text>
          <Input
            placeholder="12345"
            className="p-3 rounded-lg bg-surface border border-gray-200"
            value={form.token}
            keyboardType="numeric"
            onChangeText={(token) => setForm({ ...form, token })}
          />
          {error && (
            <Text className="text-destructive text-sm mt-2">{error}</Text>
          )}
          <Button
            onPress={handlePressVerify}
            className="mt-5"
            disabled={isPendingOnPressVerify || isPendingPostUser}
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
