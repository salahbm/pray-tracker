import { useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { TouchableOpacity, View } from 'react-native';

import { Button } from '@/components/ui/button';
import { Text } from '@/components/ui/text';
import { FRIENDS } from '@/constants/images';
import { useLanguage } from '@/hooks/common/useTranslation';
import { cn } from '@/lib/utils';
import { AuthWrapper } from '@/providers/session';
import { useAuthBottomSheetStore, useProfileBottomSheetStore } from '@/store/bottom-sheets';
import { triggerHaptic } from '@/utils/haptics';
import { useAuthStore } from '@/store/auth/auth-session';
import Image from '@/components/ui/image';

interface HomeHeaderProps {
  today: Date;
}
const HomeHeader = ({ today }: HomeHeaderProps) => {
  const { t } = useTranslation();
  const { user } = useAuthStore();
  const { currentLanguage } = useLanguage();
  const { profileSheetRef } = useProfileBottomSheetStore();
  const { signInSheetRef, signUpSheetRef, forgotPwdRef } = useAuthBottomSheetStore();

  // Callbacks to present each sheet
  const handlePresentSignIn = useCallback(async () => {
    await triggerHaptic();
    forgotPwdRef.current?.close();
    signUpSheetRef.current?.close();
    signInSheetRef.current?.snapToIndex(1);
  }, []);

  return (
    <View className={cn('flex-row items-center justify-between border-b border-border pb-5')}>
      <View>
        <Text numberOfLines={1} className={cn('text-xl font-bold max-w-[250px] truncate')}>
          {user ? `Salaam, ${user.name} 👋` : `Salaam, ${t('auth.welcome.guest')} 👋`}
        </Text>
        <Text className={cn('text-muted-foreground')}>
          {today.toLocaleDateString(currentLanguage)}
        </Text>
      </View>

      <AuthWrapper mode="signedIn">
        <TouchableOpacity
          onPress={async () => {
            if (profileSheetRef && 'current' in profileSheetRef && profileSheetRef.current) {
              await triggerHaptic();
              profileSheetRef.current.snapToIndex(1);
            }
          }}
        >
          <Image
            src={user?.image}
            className={cn('size-14 rounded-full border border-border max-w-14 max-h-14')}
          />
        </TouchableOpacity>
      </AuthWrapper>

      <AuthWrapper mode="signedOut">
        <View className="flex-row justify-end gap-5 items-center">
          <Button size="sm" onPress={handlePresentSignIn}>
            <Text>{t('auth.signUp.signInLink')}</Text>
          </Button>
          <TouchableOpacity
            onPress={async () => {
              if (profileSheetRef && 'current' in profileSheetRef && profileSheetRef.current) {
                await triggerHaptic();

                profileSheetRef.current.snapToIndex(1);
              }
            }}
          >
            <Image
              source={FRIENDS.guest}
              className={cn(
                'size-14 rounded-full bg-foreground border border-border max-w-14 max-h-14'
              )}
            />
          </TouchableOpacity>
        </View>
      </AuthWrapper>
    </View>
  );
};

// Add display name for debugging
HomeHeader.displayName = 'HomeHeader';

export default HomeHeader;
