import { Ionicons } from '@expo/vector-icons';
import Constants from 'expo-constants';
import { useTranslation } from 'react-i18next';
import { Image, Linking, TouchableOpacity, View } from 'react-native';
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

  const handleLink = (url: string) => {
    Linking.openURL(url).catch(err => console.error('Error opening link:', err));
  };

  return (
    <SafeAreaView className="safe-area">
      <ScrollView className="main-area">
        <GoBack title={t('Profile.About.Title')} />

        <View className="mt-8 gap-8">
          {/* App Logo */}
          <View className="items-center">
            <Image
              source={currentTheme === 'light' ? IMAGES.icon_light : IMAGES.icon_dark}
              className="w-32 h-32 rounded-full max-w-32 max-h-32"
            />
            <Text className="mt-2 text-2xl font-bold">Pray Tracker</Text>
            <Text className="text-muted-foreground text-sm mt-2">V {version}</Text>
          </View>

          {/* Mission */}
          <View className="gap-2">
            <Text className="text-xl font-bold">{t('Profile.About.Mission.Title')}</Text>
            <Text className="text-muted-foreground">{t('Profile.About.Mission.Description')}</Text>
          </View>

          {/* Credits */}
          <View className="gap-2">
            <Text className="text-xl font-bold">{t('Profile.About.Credits.Title')}</Text>
            <Text className="text-muted-foreground">{t('Profile.About.Credits.Description')}</Text>
          </View>

          {/* Contact & Support */}
          <View className="gap-4">
            <Text className="text-xl font-bold">{t('Profile.About.Contact.Title')}</Text>

            <View className="flex-row gap-8 mt-4 justify-center">
              <TouchableOpacity
                onPress={() => handleLink('https://github.com/salahbm/pray-tracker')}
                className="items-center"
              >
                <View className="w-12 h-12 bg-secondary rounded-full items-center justify-center">
                  <Ionicons name="logo-github" size={24} />
                </View>
                <Text className="mt-1 text-sm">GitHub</Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => handleLink('mailto:salahbm.dev@gmail.com')}
                className="items-center"
              >
                <View className="w-12 h-12 bg-secondary rounded-full items-center justify-center">
                  <Ionicons name="mail" size={24} />
                </View>
                <Text className="mt-1 text-sm">Email</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Buy Me Dates */}
          <TouchableOpacity
            onPress={() => handleLink('buymeacoffee.com/salahbm')}
            className="bg-accent p-4 rounded-lg items-center flex-row justify-center gap-2 mb-10"
          >
            <Ionicons name="gift-outline" size={24} color="white" />
            <Text className="text-accent-foreground font-bold">
              {t('Profile.About.BuyMeDates')}
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default About;
