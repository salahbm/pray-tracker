import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { View, ScrollView, TouchableOpacity } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Button } from '@/components/ui/button';
import { Text } from '@/components/ui/text';

// Main features to show initially
const MAIN_FEATURES = ['Friends', 'Awards', 'Widgets'] as const;
// Additional features to show when expanded
const EXTRA_FEATURES = ['Analytics', 'Reminders', 'Themes', 'Support'] as const;

const FeatureAccordion = ({ features }: { features: readonly string[] }) => {
  const { t } = useTranslation();

  return (
    <Accordion type="multiple">
      {features.map((feature, index) => (
        <AccordionItem
          key={`${feature}-${index}`}
          value={`${feature}-${index}`}
        >
          <AccordionTrigger className="py-1">
            <Text className="text-popover-foreground font-normal tracking-tight">
              {t(`Friends.Pro.Features.${feature}.title`)}
            </Text>
          </AccordionTrigger>
          <AccordionContent className="px-1">
            <Text className="text-popover-foreground font-normal !text-sm leading-relaxed">
              {t(`Friends.Pro.Features.${feature}.description`)}
            </Text>
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
};

const CallToAction = () => {
  const { t } = useTranslation();
  const insets = useSafeAreaInsets();
  const [showAllFeatures, setShowAllFeatures] = useState(false);

  return (
    <React.Fragment>
      <ScrollView
        contentContainerStyle={{ paddingBottom: insets.bottom + 100 }}
        showsVerticalScrollIndicator={false}
        className="relative"
      >
        {/* Bismillah */}
        <Text className="text-muted-foreground text-center mt-6 text-sm font-medium">
          {t('Friends.Pro.BismillahMessage')}
        </Text>

        {/* Header Section */}
        <Text className="text-foreground text-2xl font-bold mt-4 text-center tracking-tight">
          {t('Friends.Pro.Title')}
        </Text>
        <Text className="text-muted-foreground text-lg text-center mt-1 font-medium">
          {t('Friends.Pro.Subtitle')}
        </Text>

        {/* Welcome Section */}
        <View className="bg-popover rounded-2xl mt-6 w-full p-6">
          <Text className="text-popover-foreground text-xl font-semibold text-center tracking-tight">
            {t('Friends.Pro.WelcomeTitle')}
          </Text>
          <Text className="text-foreground text-center mt-3 text-base">
            {t('Friends.Pro.WelcomeMessage')}
          </Text>
        </View>

        {/* Team Section */}
        <View className="bg-popover rounded-2xl mt-6 w-full p-6">
          <Text className="text-popover-foreground text-xl font-semibold text-center tracking-tight">
            {t('Friends.Pro.TeamTitle')}
          </Text>
          <Text className="text-foreground text-center mt-3 text-base">
            {t('Friends.Pro.TeamMessage')}
          </Text>
        </View>

        {/* Features Section */}
        <View className="bg-popover rounded-2xl mt-6 w-full p-6">
          <Text className="text-popover-foreground text-xl font-semibold text-center mb-4 tracking-tight">
            {t('Friends.Pro.FeaturesTitle')}
          </Text>

          {/* Main Features */}
          <FeatureAccordion features={MAIN_FEATURES} />

          {/* More Features Button */}
          <TouchableOpacity
            className="mt-4 py-2"
            onPress={() => setShowAllFeatures(!showAllFeatures)}
          >
            <Text className="text-primary text-center font-normal text-sm">
              {showAllFeatures
                ? t('Friends.Pro.LessFeatures')
                : t('Friends.Pro.MoreFeatures')}
            </Text>
          </TouchableOpacity>

          {/* Extra Features */}
          {showAllFeatures && (
            <View className="mt-2">
              <FeatureAccordion features={EXTRA_FEATURES} />
            </View>
          )}

          <Text className="text-secondary text-sm text-center mt-4 italic">
            {t('Friends.Pro.Future')}
          </Text>
        </View>

        {/* Subscription Plans */}

        <Button className="bg-primary rounded-full py-4 px-8 w-full mt-8">
          <Text>{t('Friends.Pro.SubscribeButton')} ❤️</Text>
        </Button>
      </ScrollView>
    </React.Fragment>
  );
};

export default CallToAction;
