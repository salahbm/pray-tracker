import { useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ScrollView, TextInput, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import GoBack from '@/components/shared/go-back';
import Loader from '@/components/shared/loader';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Text } from '@/components/ui/text';
import { useLogout } from '@/hooks/auth/useLogOut';
import { useUpdatePassword } from '@/hooks/auth/usePwdUpdate';
import { fireToast } from '@/providers/toaster';
import { useAuthStore } from '@/store/auth/auth-session';
import Image from '@/components/ui/image';

const EditPwd = () => {
  const { user } = useAuthStore();
  const { t } = useTranslation();
  const { mutateAsync: updatePassword, isPending } = useUpdatePassword();
  const { logOut, isLoggingOut } = useLogout();

  //   States
  const [currentPassword, setCurrentPassword] = useState<string>('');
  const [newPassword, setNewPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const newPwdRef = useRef<TextInput | null>(null);
  const confirmPwdRef = useRef<TextInput | null>(null);
  

  const validatePasswords = () => {
    if (!currentPassword) {
      fireToast.error(t('Profile.EditPassword.Errors.CurrentPasswordRequired'));
      return false;
    }
    if (newPassword.length < 8) {
      fireToast.error(t('Profile.EditPassword.Errors.MinPasswordLength'));
      return false;
    }
    if (newPassword !== confirmPassword) {
      fireToast.error(t('Profile.EditPassword.Errors.PasswordMismatch'));
      return false;
    }
    return true;
  };

  const handleUpdate = async () => {
    if (!validatePasswords()) return;

    try {
      await updatePassword({
        currentPassword,
        newPassword,
        revokeOtherSessions: true,
      });
      
      fireToast.success(t('Profile.EditPassword.Success'));
      
      // Log out user after password change
      setTimeout(() => {
        logOut(undefined);
      }, 1000);
    } catch (error) {
      fireToast.error((error as Error)?.message || t('Profile.EditPassword.Errors.UpdateFailed'));
    }
  };

  return (
    <SafeAreaView className="main-area">
      <Loader visible={isLoggingOut} />
      <GoBack title={t('Profile.EditPassword.Title')} />
      <ScrollView keyboardShouldPersistTaps="handled">
        <Image
          source={user?.image}
          className="w-[150px] h-[150px] rounded-full mx-auto border border-border max-w-[150px] max-h-[150px] my-10"
        />

        <View className="flex-1 gap-6">
          <Input
            label={t('Profile.EditPassword.Fields.CurrentPassword.Label')}
            placeholder={t('Profile.EditPassword.Fields.CurrentPassword.Placeholder')}
            autoCapitalize="none"
            secureTextEntry
            returnKeyType="next"
            value={currentPassword}
            onSubmitEditing={() => newPwdRef.current?.focus()}
            onChangeText={setCurrentPassword}
          />
          <Input
            ref={newPwdRef}
            label={t('Profile.EditPassword.Fields.NewPassword.Label')}
            placeholder={t('Profile.EditPassword.Fields.NewPassword.Placeholder')}
            autoCapitalize="none"
            secureTextEntry
            returnKeyType="next"
            onSubmitEditing={() => confirmPwdRef.current?.focus()}  
            value={newPassword}
            onChangeText={setNewPassword}
          />
          <Input
            ref={confirmPwdRef}
            onSubmitEditing={handleUpdate}
            label={t('Profile.EditPassword.Fields.ConfirmPassword.Label')}
            placeholder={t('Profile.EditPassword.Fields.ConfirmPassword.Placeholder')}
            autoCapitalize="none"
            secureTextEntry
            returnKeyType="done"
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
