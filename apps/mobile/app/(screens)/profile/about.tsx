import Constants from 'expo-constants';
import { useTranslation } from 'react-i18next';
import { Image, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';

import GoBack from '@/components/shared/go-back';
import { Text } from '@/components/ui/text';
import { IMAGES } from '@/constants/images';
import { useThemeStore } from '@/store/defaults/theme';

const About = () => {
  const { t } = useTranslation();
  const { currentTheme } = useThemeStore();
  const version = Constants.expoConfig?.version || '1.0.0';

  return (
    <SafeAreaView className="safe-area">
      <GoBack title={t('profile.about.title')} />
      <ScrollView className="main-area">
        <View className="mt-8 gap-8">
          {/* App Logo */}
          <View className="items-center">
            <Image
              source={currentTheme === 'light' ? IMAGES.icon_light : IMAGES.icon_dark}
              className="w-32 h-32 rounded-full max-w-32 max-h-32"
            />
            <Text className="mt-2 text-2xl font-bold">Noor - Pray Tracker</Text>
            <Text className="text-muted-foreground text-sm mt-2">V {version}</Text>
          </View>

          {/* Mission */}
          <View className="gap-2">
            <Text className="text-xl font-bold">{t('profile.about.mission.title')}</Text>
            <Text className="text-muted-foreground">{t('profile.about.mission.description')}</Text>
          </View>

          {/* Credits */}
          <View className="gap-2">
            <Text className="text-xl font-bold">{t('profile.about.credits.title')}</Text>
            <Text className="text-muted-foreground">{t('profile.about.credits.description')}</Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default About;
