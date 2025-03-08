import { View, Image, Linking, TouchableOpacity } from 'react-native';
import { useTranslation } from 'react-i18next';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import Constants from 'expo-constants';

import GoBack from '@/components/shared/go-back';
import { Text } from '@/components/ui/text';
import { ScrollView } from 'react-native-gesture-handler';

const About = () => {
  const { t } = useTranslation();
  const version = Constants.expoConfig?.version || '1.0.0';
  const buildNumber = Constants.expoConfig?.ios?.buildNumber || '100';

  const handleLink = (url: string) => {
    Linking.openURL(url).catch((err) =>
      console.error('Error opening link:', err),
    );
  };

  return (
    <SafeAreaView className="safe-area">
      <ScrollView className="main-area">
        <GoBack title={t('Profile.About.Title')} />

        <View className="mt-8 gap-8">
          {/* App Logo */}
          <View className="items-center">
            <Image
              source={require('@/assets/images/icon.png')}
              className="w-24 h-24 rounded-2xl"
            />
            <Text className="mt-2 text-2xl font-bold">Pray Tracker</Text>
          </View>

          {/* Version Info */}
          <View className="bg-card p-4 rounded-lg">
            <Text className="text-xl font-bold">
              {t('Profile.About.Version.Title')}
            </Text>
            <View className="mt-2 gap-1">
              <Text className="text-muted-foreground">
                {t('Profile.About.Version.Number', { version })}
              </Text>
              <Text className="text-muted-foreground">
                {t('Profile.About.Version.Build', { buildNumber })}
              </Text>
              <Text className="text-muted-foreground">
                {t('Profile.About.Version.Released')}
              </Text>
            </View>
          </View>

          {/* Mission */}
          <View className="gap-2">
            <Text className="text-xl font-bold">
              {t('Profile.About.Mission.Title')}
            </Text>
            <Text className="text-muted-foreground">
              {t('Profile.About.Mission.Description')}
            </Text>
          </View>

          {/* Credits */}
          <View className="gap-2">
            <Text className="text-xl font-bold">
              {t('Profile.About.Credits.Title')}
            </Text>
            <Text className="text-muted-foreground">
              {t('Profile.About.Credits.Description')}
            </Text>
          </View>

          {/* Contact & Support */}
          <View className="gap-4">
            <Text className="text-xl font-bold">
              {t('Profile.About.Contact.Title')}
            </Text>

            <View className="flex-row gap-4 justify-center">
              <TouchableOpacity
                onPress={() =>
                  handleLink('https://github.com/salahbm/pray-tracker')
                }
                className="items-center"
              >
                <View className="w-12 h-12 bg-secondary rounded-full items-center justify-center">
                  <Ionicons name="logo-github" size={24} />
                </View>
                <Text className="mt-1 text-sm">GitHub</Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => handleLink('mailto:support@praytracker.app')}
                className="items-center"
              >
                <View className="w-12 h-12 bg-secondary rounded-full items-center justify-center">
                  <Ionicons name="mail" size={24} />
                </View>
                <Text className="mt-1 text-sm">Email</Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => handleLink('https://t.me/praytracker')}
                className="items-center"
              >
                <View className="w-12 h-12 bg-secondary rounded-full items-center justify-center">
                  <Ionicons name="paper-plane" size={24} />
                </View>
                <Text className="mt-1 text-sm">Telegram</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Buy Me Dates */}
          <TouchableOpacity
            onPress={() =>
              handleLink('https://www.buymeacoffee.com/praytracker')
            }
            className="bg-accent p-4 rounded-lg items-center flex-row justify-center gap-2"
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
