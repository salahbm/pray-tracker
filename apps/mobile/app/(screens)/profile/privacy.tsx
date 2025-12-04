import React from 'react';
import { useTranslation } from 'react-i18next';
import { ScrollView, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import GoBack from '@/components/shared/go-back';
import { Text } from '@/components/ui/text';

export default function PrivacyScreen() {
  const { t } = useTranslation();

  return (
    <SafeAreaView className="flex-1 bg-background">
      <View className="flex-row items-center p-4 border-b border-border">
        <GoBack title={t('profile.privacy.title')} />
      </View>
      <ScrollView className="flex-1 p-4">
        <View className="flex flex-col gap-6">
          <View>
            <Text className="text-lg font-semibold mb-2">
              {t('profile.privacy.dataCollection.title')}
            </Text>
            <Text className="text-muted-foreground">
              {t('profile.privacy.dataCollection.content')}
            </Text>
          </View>

          <View>
            <Text className="text-lg font-semibold mb-2">{t('profile.privacy.dataUse.title')}</Text>
            <Text className="text-muted-foreground">{t('profile.privacy.dataUse.content')}</Text>
          </View>

          <View>
            <Text className="text-lg font-semibold mb-2">
              {t('profile.privacy.dataSharing.title')}
            </Text>
            <Text className="text-muted-foreground">
              {t('profile.privacy.dataSharing.content')}
            </Text>
          </View>

          <View>
            <Text className="text-lg font-semibold mb-2">
              {t('profile.privacy.security.title')}
            </Text>
            <Text className="text-muted-foreground">{t('profile.privacy.security.content')}</Text>
          </View>

          <View>
            <Text className="text-lg font-semibold mb-2">{t('profile.privacy.changes.title')}</Text>
            <Text className="text-muted-foreground">{t('profile.privacy.changes.content')}</Text>
          </View>

          <View className="mb-10">
            <Text className="text-lg font-semibold mb-2">{t('profile.privacy.contact.title')}</Text>
            <Text className="text-muted-foreground">{t('profile.privacy.contact.content')}</Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
