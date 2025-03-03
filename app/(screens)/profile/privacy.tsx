import React from 'react';
import { useTranslation } from 'react-i18next';
import { ScrollView, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Text } from '@/components/ui/text';
import GoBack from '@/components/shared/go-back';

export default function PrivacyScreen() {
  const { t } = useTranslation();

  return (
    <SafeAreaView className="flex-1 bg-background">
      <View className="flex-row items-center p-4 border-b border-border">
        <GoBack title={t('Profile.Privacy.Title')} />
      </View>
      <ScrollView className="flex-1 p-4">
        <View className="flex flex-col gap-6">
          <View>
            <Text className="text-lg font-semibold mb-2">
              {t('Profile.Privacy.DataCollection.Title')}
            </Text>
            <Text className="text-muted-foreground">
              {t('Profile.Privacy.DataCollection.Content')}
            </Text>
          </View>

          <View>
            <Text className="text-lg font-semibold mb-2">
              {t('Profile.Privacy.DataUse.Title')}
            </Text>
            <Text className="text-muted-foreground">
              {t('Profile.Privacy.DataUse.Content')}
            </Text>
          </View>

          <View>
            <Text className="text-lg font-semibold mb-2">
              {t('Profile.Privacy.DataSharing.Title')}
            </Text>
            <Text className="text-muted-foreground">
              {t('Profile.Privacy.DataSharing.Content')}
            </Text>
          </View>

          <View>
            <Text className="text-lg font-semibold mb-2">
              {t('Profile.Privacy.Security.Title')}
            </Text>
            <Text className="text-muted-foreground">
              {t('Profile.Privacy.Security.Content')}
            </Text>
          </View>

          <View>
            <Text className="text-lg font-semibold mb-2">
              {t('Profile.Privacy.Changes.Title')}
            </Text>
            <Text className="text-muted-foreground">
              {t('Profile.Privacy.Changes.Content')}
            </Text>
          </View>

          <View>
            <Text className="text-lg font-semibold mb-2">
              {t('Profile.Privacy.Contact.Title')}
            </Text>
            <Text className="text-muted-foreground">
              {t('Profile.Privacy.Contact.Content')}
            </Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
