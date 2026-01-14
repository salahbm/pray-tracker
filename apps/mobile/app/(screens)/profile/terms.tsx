import React from 'react';
import { useTranslation } from 'react-i18next';
import { ScrollView, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import GoBack from '@/components/shared/go-back';
import { Text } from '@/components/ui/text';

export default function TermsScreen() {
  const { t } = useTranslation();

  return (
    <SafeAreaView className="safe-area">
      <GoBack title={t('profile.terms.title')} />
      <ScrollView className="main-area">
        <View>
          <Text className="text-lg font-semibold mb-2">{t('profile.terms.agreement.title')}</Text>
          <Text className="text-muted-foreground">{t('profile.terms.agreement.content')}</Text>
        </View>

        <View>
          <Text className="text-lg font-semibold mb-2">{t('profile.terms.usage.title')}</Text>
          <Text className="text-muted-foreground">{t('profile.terms.usage.content')}</Text>
        </View>

        {/* NEW SECTION FOR APPLE REVIEW */}
        <View>
          <Text className="text-lg font-semibold mb-2">
            {t('profile.terms.subscriptions.title')}
          </Text>
          <Text className="text-muted-foreground whitespace-pre-line">
            {t('profile.terms.subscriptions.content')}
          </Text>
        </View>

        <View>
          <Text className="text-lg font-semibold mb-2">{t('profile.terms.userContent.title')}</Text>
          <Text className="text-muted-foreground">{t('profile.terms.userContent.content')}</Text>
        </View>

        <View>
          <Text className="text-lg font-semibold mb-2">{t('profile.terms.termination.title')}</Text>
          <Text className="text-muted-foreground">{t('profile.terms.termination.content')}</Text>
        </View>

        <View>
          <Text className="text-lg font-semibold mb-2">{t('profile.terms.changes.title')}</Text>
          <Text className="text-muted-foreground">{t('profile.terms.changes.content')}</Text>
        </View>

        <View className="mb-10">
          <Text className="text-lg font-semibold mb-2">{t('profile.terms.contact.title')}</Text>
          <Text className="text-muted-foreground">{t('profile.terms.contact.content')}</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
