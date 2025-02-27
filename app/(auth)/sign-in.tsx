import React, { useCallback, useState } from 'react';
import { TouchableOpacity, View } from 'react-native';

import Loader from '@/components/shared/loader';
import OAuth from '@/components/shared/o-auth';
import { Text } from '@/components/ui/text';
import { useLoginUser } from '@/hooks/auth/useLogin';
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
  // HOOKS and STATES
  const { mutateAsync: signIn, isPending } = useLoginUser();

  const [form, setForm] = useState({
    email: '',
    password: '',
  });

  const onSignInPress = useCallback(async () => {
    await signIn(form);

    await new Promise((resolve) => {
      setTimeout(() => {
        resolve(true);
      }, 1000);
    });

    setForm({ email: '', password: '' });
    onSuccess();
  }, [form, signIn, onSuccess]);

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
          autoCorrect={false}
          spellCheck={false}
        />
        <Input
          label="Password"
          className="mb-10 p-3"
          value={form.password}
          placeholder="Enter your password"
          secureTextEntry
          onChangeText={(password) => setForm({ ...form, password })}
        />
        <Button className="mb-4" disabled={isPending} onPress={onSignInPress}>
          <Loader visible={isPending} className="bg-transparent" />
          <Text className="font-bold">Sign In</Text>
        </Button>
        {/* OAuth */}
        <OAuth onSuccess={onSuccess} />
      </View>

      <View className="mt-8 flex flex-row justify-center items-center">
        <Text className="text-sm text-muted-foreground text-center ">
          Don&apos;t have an account?
        </Text>
        <Button variant="link" onPress={onNavigate}>
          <Text className="font-primary">Sign up</Text>
        </Button>
      </View>

      <View className="justify-center items-center">
        <TouchableOpacity onPress={onForgotPassword}>
          <Text className="font-primary underline text-sm">
            Forgot your password?
          </Text>
        </TouchableOpacity>
      </View>
    </React.Fragment>
  );
}
