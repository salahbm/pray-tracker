import BottomSheet from '@gorhom/bottom-sheet';
import { BottomSheetMethods } from '@gorhom/bottom-sheet/lib/typescript/types';
import React, { forwardRef } from 'react';
import { useTranslation } from 'react-i18next';
import { Image, TouchableOpacity, View } from 'react-native';

import { Button } from '@/components/ui/button';
import { Text } from '@/components/ui/text';
import { FRIENDS } from '@/constants/images';
import { useLanguage } from '@/hooks/common/useTranslation';
import { cn } from '@/lib/utils';
import { AuthWrapper } from '@/providers/session';
import { triggerHaptic } from '@/utils/haptics';
import { useProfileBottomSheetStore } from '@/store/bottom-sheets';

interface HomeHeaderProps {
  user?: { name: string; photo?: string };
  today: Date;
  handlePresentSignIn: () => void;
}
const HomeHeader = ({ user, today, handlePresentSignIn }: HomeHeaderProps) => {
  const { currentLanguage } = useLanguage();
  const { t } = useTranslation();
  const { profileSheetRef } = useProfileBottomSheetStore();
  return (
    <View className={cn('flex-row items-center justify-between border-b border-border pb-5')}>
      <View>
        <Text numberOfLines={1} className={cn('text-xl font-bold max-w-[250px] truncate')}>
          {user ? `Salaam, ${user.name} 👋` : `Salaam, ${t('Auth.Welcome.Guest')} 👋`}
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
          {user?.photo ? (
            <Image
              source={{
                uri: user?.photo,
              }}
              className={cn('size-14 rounded-full border border-border max-w-14 max-h-14')}
            />
          ) : (
            <Image
              source={FRIENDS.guest}
              className={cn('size-14 rounded-full border border-border max-w-14 max-h-14')}
            />
          )}
        </TouchableOpacity>
      </AuthWrapper>

      <AuthWrapper mode="signedOut">
        <View className="flex-row justify-end gap-5 items-center">
          <Button size="sm" onPress={handlePresentSignIn}>
            <Text>{t('Auth.SignUp.SignInLink')}</Text>
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
}

// Add display name for debugging
HomeHeader.displayName = 'HomeHeader';

export default HomeHeader;
