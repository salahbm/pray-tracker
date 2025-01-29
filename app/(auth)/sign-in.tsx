import * as SecureStore from 'expo-secure-store';
import { useCallback, useEffect, useState } from 'react';
import { View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import OAuth from '@/components/shared/o-auth';
import { Text } from '@/components/ui/text';
import { useGetUser } from '@/hooks/auth/useGetUser';
import { useLoginUser } from '@/hooks/auth/useLogin';
import { supabase } from '@/lib/supabase';
import { useAuthStore } from '@/store/auth/auth-session';
import { Button } from 'components/ui/button';
import { Input } from 'components/ui/input';

interface ISignIn {
  onSuccess: () => void;
  onNavigate: () => void;
}

export default function SignInScreen({ onSuccess, onNavigate }: ISignIn) {
  const { mutateAsync: signIn, isPending, data: loginData } = useLoginUser();
  const { data: user } = useGetUser(loginData?.user.id); // Fetch user data from API
  const { setUser } = useAuthStore(); // Zustand for auth state

  const [form, setForm] = useState({
    email: '',
    password: '',
  });

  const onSignInPress = useCallback(async () => {
    const userData = await signIn(form);

    if (userData) {
      const { access_token, refresh_token } = userData.session;

      // Store tokens securely
      await SecureStore.setItemAsync('access_token', access_token);
      await SecureStore.setItemAsync('refresh_token', refresh_token);

      // Set session in Supabase
      await supabase.auth.setSession({ access_token, refresh_token });
    }
    onSuccess();
  }, [signIn, form, onSuccess]);

  // ✅ Update Zustand once user is fetched
  useEffect(() => {
    if (user) {
      setUser(user);
    }
  }, [user, setUser]);

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
          <Text className="font-bold">Sign In</Text>
        </Button>
        <OAuth />
      </View>

      <View className="mt-8 flex flex-row justify-center items-center gap-4">
        <Text className="text-sm text-muted-foreground text-center ">
          Don&apos;t have an account?
        </Text>
        <Button variant="link" onPress={onNavigate} disabled={isPending}>
          <Text className="font-primary">Sign up</Text>
        </Button>
      </View>
    </SafeAreaView>
  );
}
