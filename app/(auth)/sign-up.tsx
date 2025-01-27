import React from 'react';
import { Image, View } from 'react-native';
import ReactNativeModal from 'react-native-modal';
import { SafeAreaView } from 'react-native-safe-area-context';

import { usePostUser } from '@/hooks/auth/usePostUser';
import { supabase } from '@/lib/supabase';
import { fireToast } from '@/providers/toaster';
import { hashPassword } from '@/utils/helpers';
import { Button } from 'components/ui/button';
import { Input } from 'components/ui/input';
import { Text } from 'components/ui/text';
import { IMAGES } from 'constants/images';

interface ISignUp {
  onSuccess: () => void;
  onNavigate: () => void;
}

export default function SignUpScreen({ onSuccess, onNavigate }: ISignUp) {
  const { mutateAsync: postUser } = usePostUser();
  const [form, setForm] = React.useState({
    email: '',
    username: '',
    password: '',
  });
  const [state, setState] = React.useState({
    loading: 'default',
    error: '',
    code: '',
  });

  // Modals
  const [showSuccessModal, setShowSuccessModal] = React.useState(false);
  const [showOtpModal, setShowOtpModal] = React.useState(false);

  // Handle sign-up process
  const onSignUpPress = async () => {
    try {
      setState({
        ...state,
        loading: 'pending',
      });

      const { data, error } = await supabase.auth.signUp({
        email: form.email,
        password: form.password,
        options: {
          data: { username: form.username },
        },
      });

      if (error) {
        throw new Error(error.message);
      }

      if (data.user) {
        fireToast.success('Verification email sent.📥');
        setShowOtpModal(true);
        setState({
          ...state,
          loading: 'verification',
        });
      }
    } catch (err) {
      fireToast.error('Error: ' + err.message);
    }
  };

  // Handle email verification
  const onPressVerify = async () => {
    try {
      const { data, error } = await supabase.auth.verifyOtp({
        email: form.email,
        token: state.code.toString(),
        type: 'signup',
      });

      if (error) {
        throw new Error(error.message);
      }

      if (data?.user) {
        const hashedPassword = await hashPassword(form.password); // Hash password
        const payload = {
          username: form.username,
          email: form.email,
          supabaseId: data.user.id,
          password: hashedPassword,
        };

        await postUser(payload).then(() => {
          setShowOtpModal(false);
          setShowSuccessModal(true);
          setState({
            ...state,
            loading: 'success',
          });
        });
      }
    } catch (err) {
      setState({
        ...state,
        error: err.message,
        loading: 'failed',
      });
    }
  };

  // Resend OTP
  const onResendOtp = async () => {
    try {
      const { error } = await supabase.auth.resend({
        email: form.email,
        type: 'signup',
      });

      if (error) {
        throw new Error(error.message);
      }

      fireToast.success('Verification code resent to your email. 📤');
      setShowOtpModal(true);
    } catch (err) {
      fireToast.error('Error: ' + err.message);
    }
  };

  return (
    <SafeAreaView>
      <View className="w-full max-w-md">
        <Text className="text-3xl font-bold text-primary mb-2 text-center">
          Join Us
        </Text>
        <Text className="text-sm text-muted-foreground text-center mb-6">
          Sign up with your email, username, and password
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
          onPress={
            state.loading === 'verification' ? onResendOtp : onSignUpPress
          }
          className="p-4 rounded-lg bg-primary text-white"
          disabled={state.loading === 'pending'}
        >
          <Text>Sign Up</Text>
        </Button>
      </View>

      <View className="mt-8 flex flex-row justify-center items-center gap-4 ">
        <Text className="text-sm text-muted-foreground text-center ">
          Already have an account?
        </Text>
        <Button variant="link" onPress={onNavigate}>
          <Text>Sign In</Text>
        </Button>
      </View>

      {/* VERIFICATION MODAL */}
      <ReactNativeModal
        isVisible={showOtpModal}
        onBackdropPress={() => setShowOtpModal(false)}
      >
        <View className="bg-muted px-7 py-14 rounded-2xl ">
          <Text className="text-2xl font-bold mb-2">Verification</Text>
          <Text className="text-gray-600 mb-5">
            We&apos;ve sent a verification code to {form.email}.
          </Text>
          <Input
            placeholder="12345"
            className="p-3 rounded-lg bg-surface border border-gray-200"
            value={state.code}
            keyboardType="numeric"
            onChangeText={(code) => setState({ ...state, code })}
          />
          {state.error && (
            <Text className="text-destructive text-sm mt-2">{state.error}</Text>
          )}
          <Button onPress={onPressVerify} className="mt-5 p-4 rounded-lg">
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
    </SafeAreaView>
  );
}
