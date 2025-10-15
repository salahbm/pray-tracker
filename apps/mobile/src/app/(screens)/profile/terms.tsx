import React from 'react';
import { useTranslation } from 'react-i18next';
import { ScrollView, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import GoBack from '@/components/shared/go-back';
import { Text } from '@/components/ui/text';

export default function TermsScreen() {
  const { t } = useTranslation();

  return (
    <SafeAreaView className="flex-1 bg-background">
      <View className="flex-row items-center p-4 border-b border-border">
        <GoBack title={t('Profile.Terms.Title')} />
      </View>
      <ScrollView className="flex-1 p-4">
        <View className="flex flex-col gap-6">
          <View>
            <Text className="text-lg font-semibold mb-2">
              {t('Profile.Terms.Agreement.Title')}
            </Text>
            <Text className="text-muted-foreground">
              {t('Profile.Terms.Agreement.Content')}
            </Text>
          </View>

          <View>
            <Text className="text-lg font-semibold mb-2">
              {t('Profile.Terms.Usage.Title')}
            </Text>
            <Text className="text-muted-foreground">
              {t('Profile.Terms.Usage.Content')}
            </Text>
          </View>

          <View>
            <Text className="text-lg font-semibold mb-2">
              {t('Profile.Terms.UserContent.Title')}
            </Text>
            <Text className="text-muted-foreground">
              {t('Profile.Terms.UserContent.Content')}
            </Text>
          </View>

          <View>
            <Text className="text-lg font-semibold mb-2">
              {t('Profile.Terms.Termination.Title')}
            </Text>
            <Text className="text-muted-foreground">
              {t('Profile.Terms.Termination.Content')}
            </Text>
          </View>

          <View>
            <Text className="text-lg font-semibold mb-2">
              {t('Profile.Terms.Changes.Title')}
            </Text>
            <Text className="text-muted-foreground">
              {t('Profile.Terms.Changes.Content')}
            </Text>
          </View>

          <View className="mb-10">
            <Text className="text-lg font-semibold mb-2">
              {t('Profile.Terms.Contact.Title')}
            </Text>
            <Text className="text-muted-foreground">
              {t('Profile.Terms.Contact.Content')}
            </Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
