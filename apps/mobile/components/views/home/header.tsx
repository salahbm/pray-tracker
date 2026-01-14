import { useCallback } from 'react';
import { useTranslation } from 'react-i18next';

import { Button } from '@/components/ui/button';
import Image from '@/components/ui/image';
import { Text } from '@/components/ui/text';
import { FRIENDS } from '@/constants/images';
import { useLanguage } from '@/hooks/common/useTranslation';
import { cn } from '@/lib/utils';
import { AuthWrapper } from '@/providers/session';
import { useAuthStore } from '@/store/auth/auth-session';
import { useAuthBottomSheetStore } from '@/store/bottom-sheets';
import { triggerHaptic } from '@/utils/haptics';
import { router } from 'expo-router';
import { Menu } from '@/components/shared/icons';
import { PressableBounce } from '@/components/shared/pressable-bounce';
import { View } from 'react-native';

interface HomeHeaderProps {
  today: Date;
}

const HomeHeader = ({ today }: HomeHeaderProps) => {
  const { t } = useTranslation();
  const { user } = useAuthStore();
  const { currentLanguage } = useLanguage();
  const { signInSheetRef, signUpSheetRef, forgotPwdRef } = useAuthBottomSheetStore();

  const handlePresentSignIn = useCallback(async () => {
    await triggerHaptic();
    forgotPwdRef.current?.close();
    signUpSheetRef.current?.close();
    signInSheetRef.current?.snapToIndex(1);
  }, [forgotPwdRef, signUpSheetRef, signInSheetRef]);

  const handleProfileOpen = useCallback(async () => {
    await triggerHaptic();
    router.push('/(screens)/(settings)/settings');
  }, []);

  const formattedDate = today.toLocaleDateString(currentLanguage, {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

  return (
    <View className={cn('py-2')}>
      <View className={cn('flex-row items-center justify-between')}>
        {/* Left: Avatar, Name & Date */}
        <View className={cn('flex-row items-center gap-3 flex-1')}>
          <PressableBounce
            onPress={handleProfileOpen}
            className={cn(
              'rounded-full border-2 p-0.5 active:opacity-70',
              user ? 'border-primary/20' : 'border-border'
            )}
          >
            <Image
              src={user?.image}
              source={!user ? FRIENDS.guest : undefined}
              className={cn('w-12 h-12 rounded-full')}
            />
            {user && (
              <View
                className={cn(
                  'absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-primary-700 border-2 border-background rounded-full'
                )}
              />
            )}
          </PressableBounce>

          <View className={cn('flex-1 mr-4')}>
            <Text numberOfLines={1} className={cn('text-xl font-bold tracking-tight')}>
              {user ? user.name : t('auth.welcome.guest')}
            </Text>
            <Text className={cn('text-xs text-muted-foreground font-medium capitalize')}>
              {formattedDate}
            </Text>
          </View>
        </View>

        {/* Right: Login Button or Hamburger */}
        <AuthWrapper mode="signedOut">
          <Button size="sm" onPress={handlePresentSignIn} className={cn('px-5')}>
            <Text className={cn('font-semibold text-sm')}>{t('auth.signUp.signInLink')}</Text>
          </Button>
        </AuthWrapper>

        <AuthWrapper mode="signedIn">
          <PressableBounce
            onPress={handleProfileOpen}
            className={cn(
              'p-2.5 rounded-full bg-muted/15 items-center justify-center active:opacity-70 border border-border'
            )}
          >
            <Menu size={24} className="text-muted-foreground" />
          </PressableBounce>
        </AuthWrapper>
      </View>
    </View>
  );
};

HomeHeader.displayName = 'HomeHeader';

export default HomeHeader;
