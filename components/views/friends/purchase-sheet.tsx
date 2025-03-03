import React, { useEffect, useState } from 'react';
import { View, TouchableOpacity, ActivityIndicator } from 'react-native';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  getSubscriptionPlans,
  purchasePackage,
  SubscriptionPlan,
} from '@/lib/revenuecat';
import { cn } from '@/lib/utils';
import { useTranslation } from 'react-i18next';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Text } from '@/components/ui/text';

export default function PurchaseSheet() {
  const { t } = useTranslation();
  const insets = useSafeAreaInsets();
  const [plans, setPlans] = useState<SubscriptionPlan[]>([]);
  const [loading, setLoading] = useState(true);
  const [purchasing, setPurchasing] = useState(false);
  const [selectedTab, setSelectedTab] = useState('monthly');

  useEffect(() => {
    loadPlans();
  }, []);

  const loadPlans = async () => {
    try {
      const availablePlans = await getSubscriptionPlans();
      setPlans(availablePlans);
    } catch (error) {
      console.error('Error loading plans:', error);
    } finally {
      setLoading(false);
    }
  };

  const handlePurchase = async (plan: SubscriptionPlan) => {
    try {
      setPurchasing(true);
      await purchasePackage(plan.identifier);
    } catch (error) {
      console.error('Purchase error:', error);
    } finally {
      setPurchasing(false);
    }
  };

  const monthlyPlan = plans.find((p) => p.period === 'P1M');
  const yearlyPlan = plans.find((p) => p.period === 'P1Y');

  if (loading) {
    return (
      <View className="flex-1 justify-center items-center p-5">
        <ActivityIndicator size="large" className="text-primary" />
      </View>
    );
  }

  return (
    <View>
      <Text className="text-2xl font-semibold mb-4 text-center">
        {t('Friends.Premium.ChoosePlan')}
      </Text>

      <Tabs value={selectedTab} onValueChange={setSelectedTab}>
        <TabsList className="flex-row w-full">
          <TabsTrigger value="monthly" className="flex-1">
            <Text>{t('Friends.Premium.Monthly')}</Text>
          </TabsTrigger>
          <TabsTrigger value="yearly" className="flex-1">
            <Text>{t('Friends.Premium.Yearly')}</Text>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="monthly" className="mt-4">
          <PlanDetails
            plan={monthlyPlan}
            onPurchase={handlePurchase}
            purchasing={purchasing}
          />
        </TabsContent>

        <TabsContent value="yearly" className="mt-4">
          <PlanDetails
            plan={yearlyPlan}
            onPurchase={handlePurchase}
            purchasing={purchasing}
            savings={
              yearlyPlan.originalPrice
                ? (yearlyPlan.originalPrice - yearlyPlan.price).toFixed(2)
                : undefined
            }
          />
        </TabsContent>
      </Tabs>

      <Text className="mt-6 text-center text-xs text-muted-foreground">
        {t('Friends.Premium.AutoRenew')}
      </Text>
    </View>
  );
}

function PlanDetails({
  plan,
  onPurchase,
  purchasing,
  savings,
}: {
  plan: SubscriptionPlan;
  onPurchase: (plan: SubscriptionPlan) => Promise<void>;
  purchasing: boolean;
  savings?: string;
}) {
  const { t } = useTranslation();

  return (
    <View className="items-center rounded shadow-sm">
      <View className="flex-row items-baseline mb-2">
        <Text className="text-3xl font-bold text-primary">${plan.price}</Text>
        <Text className="text-base text-muted-foreground ml-1">
          /{plan.period === 'P1M' ? 'month' : 'year'}
        </Text>
      </View>

      {savings && (
        <Text className="text-sm font-semibold text-green-500 mb-4">
          {t('Friends.Premium.SavePerYear', { amount: savings })}
        </Text>
      )}

      <TouchableOpacity
        className={cn(
          'bg-primary py-2 rounded-md w-full items-center mt-3',
          purchasing && 'opacity-70',
        )}
        onPress={() => onPurchase(plan)}
        disabled={purchasing}
      >
        {purchasing ? (
          <ActivityIndicator className="text-primary-foreground" />
        ) : (
          <Text className="text-base font-medium text-primary-foreground">
            {t('Friends.Premium.SubscribeNow')}
          </Text>
        )}
      </TouchableOpacity>

      <View className="flex flex-row items-center justify-center gap-2 mt-4">
        <TouchableOpacity onPress={() => console.log('Terms of Use pressed')}>
          <Text className="text-xs text-muted-foreground underline">
            {t('Friends.Premium.TermsButton')}
          </Text>
        </TouchableOpacity>
        <Text className="text-muted-foreground">|</Text>
        <TouchableOpacity
          onPress={() => console.log('Restore purchases pressed')}
        >
          <Text className="text-xs text-muted-foreground underline">
            {t('Friends.Premium.RestoreButton')}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
