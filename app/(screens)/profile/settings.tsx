import BottomSheet from '@gorhom/bottom-sheet';
import { useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import CustomBottomSheet from '@/components/shared/bottom-sheet';
import GoBack from '@/components/shared/go-back';
import { FLAGS, Language } from '@/components/shared/language';
import ThemeSwitcher from '@/components/shared/theme-switcher';
import { Text } from '@/components/ui/text';
import { useLanguageStore } from '@/store/defaults/language';
import { useThemeStore } from '@/store/defaults/theme';

const Settings = () => {
  const themeRef = useRef<BottomSheet>(null);
  const langRef = useRef<BottomSheet>(null);
  const { t } = useTranslation();
  const { colors } = useThemeStore();
  const { currentLanguage } = useLanguageStore();
  return (
    <SafeAreaView className="safe-area">
      <View className="main-area">
        <GoBack title="Settings" />
        <TouchableOpacity
          className="touchable mt-4"
          onPress={() => themeRef.current?.snapToIndex(2)}
        >
          <Text className="text-base text-muted-foreground ml-2">Theme</Text>
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
        <TouchableOpacity
          className="touchable"
          onPress={() => langRef.current?.snapToIndex(2)}
        >
          <Text className="text-base text-muted-foreground ml-2">Language</Text>

          <Text className="text-base text-muted-foreground ml-2">
            {FLAGS[currentLanguage]}{' '}
            {t('Defaults.Locales.languages.' + currentLanguage)}
          </Text>
        </TouchableOpacity>
      </View>

      <CustomBottomSheet sheetRef={themeRef}>
        <ThemeSwitcher />
      </CustomBottomSheet>
      <CustomBottomSheet sheetRef={langRef}>
        <Language />
      </CustomBottomSheet>
    </SafeAreaView>
  );
};

export default Settings;
