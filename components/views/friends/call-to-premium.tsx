import React, { useRef, useState } from 'react';
import { View, ScrollView, TouchableOpacity } from 'react-native';
import { useTranslation } from 'react-i18next';
import { useSubscription } from '@/hooks/use-subscription';

import { Button } from '@/components/ui/button';
import { Text } from '@/components/ui/text';
import { fireToast } from '@/providers/toaster';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import CustomBottomSheet from '@/components/shared/bottom-sheet';
import PurchaseSheet from './purchase-sheet';
import BottomSheet from '@gorhom/bottom-sheet';

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
            <Text className="text-card-foreground font-normal tracking-tight">
              {t(`Friends.Premium.Features.${feature}.title`)}
            </Text>
          </AccordionTrigger>
          <AccordionContent className="px-1">
            <Text className="text-muted-foreground font-normal !text-sm leading-relaxed">
              {t(`Friends.Premium.Features.${feature}.description`)}
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
  const { isLoading, restore } = useSubscription();

  // Handle restore purchase
  const handleRestore = async () => {
    const success = await restore();
    if (success) {
      fireToast.success(t('Friends.Premium.RestoreSuccess'));
    } else {
      fireToast.error(t('Friends.Premium.RestoreError'));
    }
  };

  // BOTTOM SHEETS REFERENCES
  const ref = useRef<BottomSheet>(null);

  return (
    <React.Fragment>
      <ScrollView
        contentContainerStyle={{ paddingBottom: insets.bottom + 100 }}
        showsVerticalScrollIndicator={false}
        className="relative"
      >
        {/* Bismillah */}
        <Text className="text-muted-foreground text-center mt-6 text-sm font-medium">
          {t('Friends.Premium.BismillahMessage')}
        </Text>

        {/* Header Section */}
        <Text className="text-foreground text-2xl font-bold mt-4 text-center tracking-tight">
          {t('Friends.Premium.Title')}
        </Text>
        <Text className="text-muted-foreground text-lg text-center mt-1 font-medium">
          {t('Friends.Premium.Subtitle')}
        </Text>

        {/* Welcome Section */}
        <View className="bg-card rounded-2xl mt-6 w-full p-6">
          <Text className="text-card-foreground text-xl font-semibold text-center tracking-tight">
            {t('Friends.Premium.WelcomeTitle')}
          </Text>
          <Text className="text-secondary text-center mt-3 text-base">
            {t('Friends.Premium.WelcomeMessage')}
          </Text>
        </View>

        {/* Team Section */}
        <View className="bg-card rounded-2xl mt-6 w-full p-6">
          <Text className="text-card-foreground text-xl font-semibold text-center tracking-tight">
            {t('Friends.Premium.TeamTitle')}
          </Text>
          <Text className="text-secondary text-center mt-3 text-base">
            {t('Friends.Premium.TeamMessage')}
          </Text>
        </View>

        {/* Features Section */}
        <View className="bg-card rounded-2xl mt-6 w-full p-6">
          <Text className="text-card-foreground text-xl font-semibold text-center mb-4 tracking-tight">
            {t('Friends.Premium.FeaturesTitle')}
          </Text>

          {/* Main Features */}
          <FeatureAccordion features={MAIN_FEATURES} />

          {/* More Features Button */}
          <TouchableOpacity
            className="mt-4 py-2"
            onPress={() => setShowAllFeatures(!showAllFeatures)}
          >
            <Text className="text-secondary text-center font-normal text-sm">
              {showAllFeatures
                ? t('Friends.Premium.LessFeatures')
                : t('Friends.Premium.MoreFeatures')}
            </Text>
          </TouchableOpacity>

          {/* Extra Features */}
          {showAllFeatures && (
            <View className="mt-2">
              <FeatureAccordion features={EXTRA_FEATURES} />
            </View>
          )}

          <Text className="text-secondary text-sm text-center mt-4 italic">
            {t('Friends.Premium.Future')}
          </Text>
        </View>

        {/* Subscription Plans */}

        <Button
          className="bg-primary rounded-full py-4 px-8 w-full mt-8"
          onPress={() => ref.current?.snapToIndex(1)}
          disabled={isLoading}
        >
          <Text>{t('Friends.Premium.SubscribeButton')} ❤️</Text>
        </Button>

        {/* Restore Button */}
        <TouchableOpacity
          className="mt-4 mb-8"
          onPress={handleRestore}
          disabled={isLoading}
        >
          <Text className="text-secondary underline text-center font-medium text-base">
            {t('Friends.Premium.RestoreButton')}
          </Text>
        </TouchableOpacity>
      </ScrollView>
      {/* BOTTOM SHEET */}
      <CustomBottomSheet sheetRef={ref} snapPoints={['40%', '60%']}>
        <PurchaseSheet />
      </CustomBottomSheet>
    </React.Fragment>
  );
};

export default CallToAction;
