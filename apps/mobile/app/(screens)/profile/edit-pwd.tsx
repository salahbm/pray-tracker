import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Image, ScrollView, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import GoBack from '@/components/shared/go-back';
import Loader from '@/components/shared/loader';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Text } from '@/components/ui/text';
import { FRIENDS } from '@/constants/images';
import { useLogout } from '@/hooks/auth/useLogOut';
import { useUpdatePassword } from '@/hooks/auth/usePwdUpdate';
import { fireToast } from '@/providers/toaster';
import { useAuthStore } from '@/store/auth/auth-session';

const EditPwd = () => {
  const { user } = useAuthStore();
  const { t } = useTranslation();
  const { mutateAsync: updatePassword, isPending } = useUpdatePassword();
  const { logOut, isLoggingOut } = useLogout();

  //   States
  const [newPassword, setNewPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');

  const validatePasswords = () => {
    if (newPassword.length < 6) {
      fireToast.error('Password must be at least 6 characters.');
      return false;
    }
    if (newPassword !== confirmPassword) {
      fireToast.error('Passwords do not match.');
      return false;
    }
    return true;
  };

  const handleUpdate = async () => {
    if (!validatePasswords()) return;

    if (newPassword) {
      await updatePassword({
        email: user?.email,
        newPassword,
      }).then(async () => {
        await logOut(undefined);
      });
    }
  };

  return (
    <SafeAreaView className="main-area">
      <Loader visible={isLoggingOut} />
      <GoBack title={t('Profile.EditPassword.Title')} />
      <ScrollView keyboardShouldPersistTaps="handled">
        {user?.photo ? (
          <Image
            source={{ uri: user.photo }}
            accessibilityLabel="Profile Photo"
            className="w-[150px] h-[150px] rounded-full mx-auto border border-border max-w-[150px] max-h-[150px] my-10"
          />
        ) : (
          <Image
            source={FRIENDS.guest}
            accessibilityLabel="Guest Profile"
            className="w-[150px] h-[150px] rounded-full mx-auto border border-border max-w-[150px] max-h-[150px] my-10"
          />
        )}
        <View className="flex-1 gap-6">
          <Input
            label={t('Profile.EditPassword.Fields.NewPassword.Label')}
            placeholder={t('Profile.EditPassword.Fields.NewPassword.Placeholder')}
            autoCapitalize="none"
            secureTextEntry
            value={newPassword}
            onChangeText={setNewPassword}
          />
          <Input
            label={t('Profile.EditPassword.Fields.ConfirmPassword.Label')}
            placeholder={t('Profile.EditPassword.Fields.ConfirmPassword.Placeholder')}
            autoCapitalize="none"
            secureTextEntry
            value={confirmPassword}
            onChangeText={setConfirmPassword}
          />
        </View>
      </ScrollView>
      <View className="pb-4">
        <Button onPress={handleUpdate} disabled={isPending}>
          <Text>{t('Profile.EditPassword.SaveButton')}</Text>
        </Button>
      </View>
    </SafeAreaView>
  );
};

export default EditPwd;
