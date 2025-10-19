import BottomSheet from '@gorhom/bottom-sheet';
import { useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { Switch, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import CustomBottomSheet from '@/components/shared/bottom-sheet';
import GoBack from '@/components/shared/go-back';
import { FLAGS, Language, LANGUAGES } from '@/components/shared/language';
import ThemeSwitcher from '@/components/shared/theme-switcher';
import { Text } from '@/components/ui/text';
// import { usePushNotifications } from '@/hooks/common/useNotifications';
import { useLanguage } from '@/hooks/common/useTranslation';
import { AuthWrapper } from '@/providers/session';
import { useThemeStore } from '@/store/defaults/theme';

const Settings = () => {
  const themeRef = useRef<BottomSheet>(null);
  const langRef = useRef<BottomSheet>(null);
  const { t } = useTranslation();
  const { colors } = useThemeStore();
  const { currentLanguage } = useLanguage();
  // const { isNotificationEnabled, toggleNotifications } = usePushNotifications();

  return (
    <SafeAreaView className="safe-area">
      <View className="main-area">
        <GoBack title={t('Profile.Settings.Title')} />
        <TouchableOpacity
          className="touchable mt-4"
          onPress={() => themeRef.current?.snapToIndex(1)}
        >
          <Text className="text-base text-muted-foreground ml-2">
            {t('Profile.Settings.Theme')}
          </Text>
          <View className="flex-row items-center justify-center w-[100px] h-5 border border-border">
            <View
              style={{
                width: 20,
                height: 20,
                borderStartStartRadius: 4,
                borderBottomLeftRadius: 4,
                backgroundColor: colors['--primary'],
              }}
            />
            <View
              style={{
                width: 20,
                height: 20,
                backgroundColor: colors['--background'],
              }}
            />
            <View
              style={{
                width: 20,
                height: 20,
                backgroundColor: colors['--accent'],
              }}
            />
            <View
              style={{
                width: 20,
                height: 20,
                backgroundColor: colors['--destructive'],
              }}
            />
            <View
              style={{
                width: 20,
                height: 20,
                borderEndEndRadius: 4,
                borderTopRightRadius: 4,
                backgroundColor: colors['--foreground'],
              }}
            />
          </View>
        </TouchableOpacity>
        <TouchableOpacity className="touchable" onPress={() => langRef.current?.snapToIndex(1)}>
          <Text className="text-base text-muted-foreground ml-2">
            {t('Profile.Settings.Language')}
          </Text>

          <Text className="text-base text-muted-foreground ml-2">
            {FLAGS[currentLanguage as keyof typeof FLAGS]} {LANGUAGES[currentLanguage as keyof typeof LANGUAGES]}
          </Text>
        </TouchableOpacity>
        {/* <AuthWrapper mode="signedIn">
          <View className="touchable">
            <Text className="text-base text-muted-foreground ml-2">
              {t('Profile.Settings.Notifications')}
            </Text>


            <Switch
              trackColor={{
                false: colors['--muted'],
                true: colors['--muted'],
              }}
              thumbColor={
                isNotificationEnabled ? colors['--primary'] : colors['--muted-foreground']
              }
              value={isNotificationEnabled}
              onValueChange={enabled => toggleNotifications(enabled)}
            />
          </View>
        </AuthWrapper> */}
      </View>

      <CustomBottomSheet sheetRef={themeRef} snapPoints={['80%']}>
        <ThemeSwitcher />
      </CustomBottomSheet>
      <CustomBottomSheet sheetRef={langRef} snapPoints={['80%']}>
        <Language />
      </CustomBottomSheet>
    </SafeAreaView>
  );
};

export default Settings;
