import { useQueryClient } from '@tanstack/react-query';
import * as SecureStore from 'expo-secure-store';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { TouchableOpacity, View } from 'react-native';

import OAuth from '@/components/shared/o-auth';
import { Text } from '@/components/ui/text';
import { userKeys } from '@/constants/query-keys';
import { useGetUser } from '@/hooks/auth/useGetUser';
import { useLoginUser } from '@/hooks/auth/useLogin';
import { supabase } from '@/lib/supabase';
import { fireToast } from '@/providers/toaster';
import { useAuthStore } from '@/store/auth/auth-session';
import { Button } from 'components/ui/button';
import { Input } from 'components/ui/input';

interface ISignIn {
  onSuccess: () => void;
  onNavigate: () => void;
  onForgotPassword: () => void;
}

export default function SignInScreen({
  onSuccess,
  onNavigate,
  onForgotPassword,
}: ISignIn) {
  const { mutateAsync: signIn, isPending, data: supabaseUser } = useLoginUser();
  const queryClient = useQueryClient();
  const { setUser } = useAuthStore();
  const hasUpdatedSession = useRef(false); // Prevent multiple updates

  const [form, setForm] = useState({
    email: '',
    password: '',
  });

  const { data, isLoading, refetch } = useGetUser(supabaseUser?.user.id);

  useEffect(() => {
    if (supabaseUser?.user.id) {
      refetch(); // Fetch user data after login
    }
  }, [supabaseUser?.user.id, refetch]);

  useEffect(() => {
    if (!supabaseUser || !data || hasUpdatedSession.current) return;

    (async () => {
      hasUpdatedSession.current = true; // Mark as updated to prevent looping

      setUser(data);

      const { access_token, refresh_token } = supabaseUser.session;

      await SecureStore.setItemAsync('access_token', access_token);
      await SecureStore.setItemAsync('refresh_token', refresh_token);

      await supabase.auth.setSession({ access_token, refresh_token });

      queryClient.invalidateQueries(userKeys);

      onSuccess();
      fireToast.success('Signed in successfully.');
    })();
  }, [supabaseUser, data, setUser, queryClient, onSuccess]);

  const onSignInPress = useCallback(async () => {
    await signIn(form);
  }, [signIn, form]);

  return (
    <React.Fragment>
      <View className="w-full max-w-md mt-8">
        <Text className="text-3xl font-bold text-primary mb-6 text-center">
          Welcome back
        </Text>
        <Input
          label="Email"
          autoCapitalize="none"
          className="mb-4 p-3"
          value={form.email}
          placeholder="Enter your email"
          keyboardType="email-address"
          onChangeText={(email) => setForm({ ...form, email })}
        />
        <Input
          label="Password"
          className="mb-10 p-3"
          value={form.password}
          placeholder="Enter your password"
          secureTextEntry
          onChangeText={(password) => setForm({ ...form, password })}
        />
        <Button
          className="mb-4"
          disabled={isPending || isLoading}
          onPress={onSignInPress}
        >
          <Text className="font-bold">Sign In</Text>
        </Button>
        {/* OAuth */}
        <OAuth />
      </View>

      <View className="mt-8 flex flex-row justify-center items-center">
        <Text className="text-sm text-muted-foreground text-center ">
          Don&apos;t have an account?
        </Text>
        <Button variant="link" onPress={onNavigate}>
          <Text className="font-primary">Sign up</Text>
        </Button>
      </View>

      <View className="justify-center items-center mt-24">
        <TouchableOpacity onPress={onForgotPassword}>
          <Text className="font-primary underline">Forgot your password?</Text>
        </TouchableOpacity>
      </View>
    </React.Fragment>
  );
}
