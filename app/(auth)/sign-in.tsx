import { useSignIn } from '@clerk/clerk-expo';
import { useCallback, useState } from 'react';
import { View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import OAuth from '@/components/shared/o-auth';
import { Text } from '@/components/ui/text';
import { fireToast } from '@/providers/toaster';
import { Button } from 'components/ui/button';
import { Input } from 'components/ui/input';

interface ISignIn {
  onSuccess: () => void;
  onNavigate: () => void;
}

export default function SignInScreen({ onSuccess, onNavigate }: ISignIn) {
  const { signIn, setActive, isLoaded } = useSignIn();
  const [isLoading, setIsLoading] = useState(false);

  const [form, setForm] = useState({
    email: '',
    password: '',
  });

  const onSignInPress = useCallback(async () => {
    if (!isLoaded) return;
    setIsLoading(true);
    try {
      const signInAttempt = await signIn.create({
        identifier: form.email,
        password: form.password,
      });

      if (signInAttempt.status === 'complete') {
        await setActive({ session: signInAttempt.createdSessionId });
        onSuccess();
      } else {
        fireToast.error('Log in failed. Please try again.');
      }
    } catch (err) {
      fireToast.error(err.errors[0].longMessage);
    } finally {
      setIsLoading(false);
    }
  }, [isLoaded, form, signIn, setActive, onSuccess]);

  return (
    <SafeAreaView>
      <View className="w-full max-w-md">
        <Text className="text-3xl font-bold text-primary mb-6 text-center">
          Welcome back
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
          label="Password"
          className="mb-10 p-3 rounded-lg bg-surface"
          value={form.password}
          placeholder="Enter your password"
          secureTextEntry
          onChangeText={(password) => setForm({ ...form, password })}
        />
        <Button
          className="p-4 rounded-lg bg-primary text-white mb-4"
          onPress={onSignInPress}
        >
          <Text className="font-bold text-secondary">Sign In</Text>
        </Button>
        <OAuth />
      </View>

      <View className="mt-8 flex flex-row justify-center items-center gap-4">
        <Text className="text-sm text-muted-foreground text-center ">
          Don&apos;t have an account?
        </Text>
        <Button variant="link" onPress={onNavigate} disabled={isLoading}>
          <Text className="font-primary">Sign up</Text>
        </Button>
      </View>
    </SafeAreaView>
  );
}
