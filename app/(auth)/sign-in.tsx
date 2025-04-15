import React, { useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';
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
  const { t } = useTranslation();
  // HOOKS and STATES
  const { mutateAsync: signIn, isPending } = useLoginUser();

  const [form, setForm] = useState({
    email: '',
    password: '',
  });

  const onSignInPress = useCallback(async () => {
    await signIn(form);
    setForm({ email: '', password: '' });
    onSuccess();
  }, [form, signIn, onSuccess]);

  return (
    <React.Fragment>
      <View className="w-full mt-8">
        <Text className="text-3xl font-bold text-primary mb-6 text-center">
          {t('Auth.SignIn.Title')}
        </Text>
        <Input
          label={t('Auth.Email.Label')}
          value={form.email}
          onChangeText={(email) => setForm({ ...form, email })}
          autoCapitalize="none"
          className="mb-4 p-3"
          placeholder={t('Auth.Email.Placeholder')}
          keyboardType="email-address"
          autoCorrect={false}
          spellCheck={false}
        />
        <Input
          label={t('Auth.Password.Label')}
          className="mb-10 p-3"
          value={form.password}
          placeholder={t('Auth.Password.Placeholder')}
          secureTextEntry
          onChangeText={(password) => setForm({ ...form, password })}
        />
        <Button className="mb-4" disabled={isPending} onPress={onSignInPress}>
          <Loader visible={isPending} size="small" />
          <Text className="font-bold">{t('Auth.SignIn.Button')}</Text>
        </Button>
        {/* OAuth */}
        <OAuth onSuccess={onSuccess} />
      </View>

      <View className="mt-8 flex flex-row justify-center items-center">
        <Text className="text-sm text-muted-foreground text-center ">
          {t('Auth.SignIn.NoAccount')}
        </Text>
        <Button variant="link" onPress={onNavigate}>
          <Text className="font-primary">{t('Auth.SignIn.SignUpLink')}</Text>
        </Button>
      </View>

      <View className="justify-center items-center">
        <TouchableOpacity onPress={onForgotPassword}>
          <Text className="font-primary underline text-sm">
            {t('Auth.SignIn.ForgotPassword')}
          </Text>
        </TouchableOpacity>
      </View>
    </React.Fragment>
  );
}
