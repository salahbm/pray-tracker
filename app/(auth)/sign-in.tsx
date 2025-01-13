import { useSignIn } from '@clerk/clerk-expo';
import { Link, router } from 'expo-router';
import { useCallback, useState } from 'react';
import { Text, View, Alert, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Button } from '~/components/ui/button';
import { Input } from '~/components/ui/input';

export default function Page() {
  const { signIn, setActive, isLoaded } = useSignIn();

  const [form, setForm] = useState({
    email: '',
    password: '',
  });

  const onSignInPress = useCallback(async () => {
    if (!isLoaded) return;

    try {
      const signInAttempt = await signIn.create({
        identifier: form.email,
        password: form.password,
      });

      if (signInAttempt.status === 'complete') {
        await setActive({ session: signInAttempt.createdSessionId });
        router.replace('/(tabs)');
      } else {
        // See https://clerk.com/docs/custom-flows/error-handling for more info on error handling
        console.log(JSON.stringify(signInAttempt, null, 2));
        Alert.alert('Error', 'Log in failed. Please try again.');
      }
    } catch (err: any) {
      console.log(JSON.stringify(err, null, 2));
      Alert.alert('Error', err.errors[0].longMessage);
    }
  }, [isLoaded, form]);

  return (
    <SafeAreaView className="flex h-full items-center justify-center bg-background px-6">
      <View className="w-full max-w-md">
        <Text className="text-3xl font-bold text-primary mb-6 text-center">
          Welcome Back
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
          value={form.password}
          placeholder="Enter your password"
          secureTextEntry
          onChangeText={(password) => setForm({ ...form, password })}
        />
        <Button
          className="p-4 rounded-lg bg-primary text-white mb-4"
          onPress={onSignInPress}
        >
          <Text className="font-bold text-white">Sign In</Text>
        </Button>
        <TouchableOpacity>
          <Text className="text-sm text-secondary text-center">
            Forgot Password?
          </Text>
        </TouchableOpacity>
      </View>

      <View className="mt-8">
        <Text className="text-sm text-secondary text-center mb-2">
          Don&apos;t have an account?
        </Text>
        <Link href="/(auth)/sign-up" className="text-primary text-center">
          <Text className="font-bold">Sign up</Text>
        </Link>
      </View>
    </SafeAreaView>
  );
}
