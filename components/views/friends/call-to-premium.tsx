import React, { useState } from 'react';
import { View, ScrollView, TouchableOpacity, ActivityIndicator } from 'react-native';
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

// Main features to show initially
const MAIN_FEATURES = ['Friends', 'Awards', 'Widgets'] as const;
// Additional features to show when expanded
const EXTRA_FEATURES = ['Analytics', 'Reminders', 'Themes', 'Support'] as const;

const FeatureAccordion = ({ features }: { features: readonly string[] }) => {
  const { t } = useTranslation();
  
  return (
    <Accordion type='multiple'>
      {features.map((feature,index) => (
        <AccordionItem 
          key={`${feature}-${index}`} 
          value={`${feature}-${index}`}
        >
          <AccordionTrigger className='py-1'>
            <Text className="text-card-foreground font-normal tracking-tight">
              {t(`Premium.Features.${feature}.title`)}
            </Text>
          </AccordionTrigger>
          <AccordionContent className="px-1">
            <Text className="text-muted-foreground font-normal !text-sm leading-relaxed">
              {t(`Premium.Features.${feature}.description`)}
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
  const { isLoading, plans, isPremium, error, purchase, restore } = useSubscription();

  // Handle subscription purchase
  const handleSubscribe = async (planId: string) => {
    const success = await purchase(planId);
    if (success) {
      fireToast.success(t('Premium.SuccessMessage'));
    } else {
      fireToast.error(t('Premium.ErrorMessage'));
    }
  };

  // Handle restore purchase
  const handleRestore = async () => {
    const success = await restore();
    if (success) {
      fireToast.success(t('Premium.RestoreSuccess'));
    } else {
      fireToast.error(t('Premium.RestoreError'));
    }
  };

  return (
    <ScrollView
      contentContainerStyle={{ paddingBottom: insets.bottom + 50 }}
      showsVerticalScrollIndicator={false}
    >
      {/* Bismillah */}
      <Text className="text-muted-foreground text-center mt-6 text-sm font-medium">
        {t('Premium.BismillahMessage')}
      </Text>

      {/* Header Section */}
      <Text className="text-foreground text-2xl font-bold mt-4 text-center tracking-tight">
        {t('Premium.Title')}
      </Text>
      <Text className="text-muted-foreground text-lg text-center mt-1 font-medium">
        {t('Premium.Subtitle')}
      </Text>

      {/* Welcome Section */}
      <View className="bg-card rounded-2xl mt-6 w-full p-6">
        <Text className="text-card-foreground text-xl font-semibold text-center tracking-tight">
          {t('Premium.WelcomeTitle')}
        </Text>
        <Text className="text-muted-foreground text-center mt-3 text-base">
          {t('Premium.WelcomeMessage')}
        </Text>
      </View>

      {/* Team Section */}
      <View className="bg-card rounded-2xl mt-6 w-full p-6">
        <Text className="text-foreground text-xl font-semibold text-center tracking-tight">
          {t('Premium.TeamTitle')}
        </Text>
        <Text className="text-muted-foreground text-center mt-3 text-base">
          {t('Premium.TeamMessage')}
        </Text>
      </View>

      {/* Features Section */}
      <View className="bg-accent rounded-2xl mt-6 w-full p-6">
        <Text className="text-card-foreground text-xl font-semibold text-center mb-4 tracking-tight">
          {t('Premium.FeaturesTitle')}
        </Text>
        
        {/* Main Features */}
        <FeatureAccordion features={MAIN_FEATURES} />

        {/* More Features Button */}
        <TouchableOpacity
          className="mt-4 py-2"
          onPress={() => setShowAllFeatures(!showAllFeatures)}
        >
          <Text className="text-primary text-center font-medium">
            {showAllFeatures ? t('Premium.LessFeatures') : t('Premium.MoreFeatures')}
          </Text>
        </TouchableOpacity>

        {/* Extra Features */}
        {showAllFeatures && (
          <View className="mt-2">
            <FeatureAccordion features={EXTRA_FEATURES} />
          </View>
        )}

        <Text className="text-muted-foreground text-sm text-center mt-4 italic">
          {t('Premium.Future')}
        </Text>
      </View>

      {/* Subscription Plans */}
      {isLoading ? (
        <ActivityIndicator className="mt-8" color="var(--primary)" />
      ) : error ? (
        <Text className="text-destructive text-center mt-8">{error}</Text>
      ) : (
        <View className="mt-8 space-y-4">
          {plans.map((plan) => (
            <Button
              key={plan.identifier}
              className="bg-primary rounded-full py-4 px-8 w-full"
              onPress={() => handleSubscribe(plan.identifier)}
            >
              <View>
                <Text className="text-primary-foreground font-bold text-center text-lg">
                  {plan.description}
                </Text>
                {plan.originalPrice && plan.originalPrice > plan.price && (
                  <Text className="text-primary-foreground text-sm line-through">
                    ${plan.originalPrice.toFixed(2)}
                  </Text>
                )}
                <Text className="text-primary-foreground text-lg">
                  ${plan.price.toFixed(2)} / {plan.period}
                </Text>
              </View>
            </Button>
          ))}
        </View>
      )}

      {/* Restore Button */}
      <TouchableOpacity
        className="mt-4 mb-8"
        onPress={handleRestore}
      >
        <Text className="text-muted-foreground underline text-center font-medium text-base">
          {t('Premium.RestoreButton')}
        </Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default CallToAction;
