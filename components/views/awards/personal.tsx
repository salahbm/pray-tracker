import React from 'react';
import { View, FlatList, TouchableOpacity } from 'react-native';
import { useTranslation } from 'react-i18next';
import { Text } from '@/components/ui/text';
import AWARDS from '@/constants/awards';
import { useAwards } from '@/hooks/awards/useGetAwards';
import { cn } from '@/lib/utils';
import { useAuthStore } from '@/store/auth/auth-session';
import { env } from 'process';
import Loader from '@/components/shared/loader';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

interface Award {
  title: string;
  awardedAt: Date;
}

const AwardCard = ({ award, isEarned, earnedDate }) => {
  const { t } = useTranslation();
  const awardText = t(`Awards.${award.title}`);
  const [emoji, ...descriptionParts] = awardText.split(' ');
  const description = descriptionParts.join(' ');

  return (
    <TouchableOpacity 
      className={cn(
        "w-[48%] mb-3 rounded-xl overflow-hidden",
        "bg-card border border-border",
        isEarned ? "opacity-100" : "opacity-60"
      )}
      activeOpacity={0.8}
    >
      <View className={cn(
        "p-4 min-h-[140px] justify-between",
        isEarned ? "bg-primary/10" : "bg-muted/30"
      )}>
        <Text className="text-3xl mb-2">{emoji}</Text>
        <Text className={cn(
          "text-sm font-medium mb-2",
          isEarned ? "text-primary" : "text-muted-foreground"
        )} numberOfLines={2}>
          {description}
        </Text>
        {isEarned && (
          <Text className="text-xs text-muted-foreground">
            {new Date(earnedDate).toLocaleDateString()}
          </Text>
        )}
        {!isEarned && (
          <View className="absolute top-2 right-2">
            <Text className="text-base opacity-80">🔒</Text>
          </View>
        )}
      </View>
    </TouchableOpacity>
  );
};

const AwardCategory = ({ title, earnedAwards }) => {
  const { t } = useTranslation();
  const categoryAwards = AWARDS.filter(award => 
    award.title.toLowerCase().startsWith(title.toLowerCase())
  );

  if (categoryAwards.length === 0) return null;

  return (
    <View className="mb-6 px-4">
      <Text className="text-xl font-semibold text-foreground mb-3 capitalize">
        {t(`Awards.Categories.${title}`)}
      </Text>
      <View className="flex-row flex-wrap justify-between">
        {categoryAwards.map((award) => {
          const earnedAward = earnedAwards?.find(earned => earned.title === award.title);
          return (
            <AwardCard
              key={award.title}
              award={award}
              isEarned={!!earnedAward}
              earnedDate={earnedAward?.awardedAt}
            />
          );
        })}
      </View>
    </View>
  );
};

const ListHeader = ({ earnedCount, totalAwards }) => {
  const { t } = useTranslation();
  return (
    <View className="px-4 py-6">
      <Text className="text-2xl font-bold text-foreground mb-2">
        {t('Awards.YourAwards')}
      </Text>
      <Text className="text-base text-muted-foreground">
        {t('Awards.Completed')}: {earnedCount}/{totalAwards}
      </Text>
    </View>
  );
};

const ListFooter = ({ earnedCount, score }) => {
  const { t } = useTranslation();
  return (
    <View className="p-4 py-6 border-t border-border">
      <View className="flex-row justify-between items-center">
        <Text className="text-base text-foreground font-medium">
          {t('Awards.CurrentScore')}
        </Text>
        <View className="flex-row items-center">
          <Text className="text-2xl font-bold text-primary mr-1">
            {score}
          </Text>
          <Text className="text-base text-muted-foreground">%</Text>
        </View>
      </View>
      <Text className="text-sm text-muted-foreground mt-1">
        {earnedCount} {t('Awards.AwardsEarned')}
      </Text>
    </View>
  );
};

export default function PersonalTab() {
  const { user } = useAuthStore();
  const { data, isLoading } = useAwards(user?.id);
  const insets = useSafeAreaInsets();

  const categories = [
    'first',
    'streak',
    'prayer_count',
    'fajr',
    'prayer_quality',
    'sunnah',
    'dhikr_quran',
    'special_times',
    'community',
    'milestone',
    'special'
  ];

  const earnedAwards = data?.data || [];
  const totalAwards = AWARDS.length;
  const earnedCount = earnedAwards.length;
  const score = Math.round((earnedCount / totalAwards) * 100);

  if (isLoading) {
    return <Loader visible={isLoading} className="bg-transparent" />
  }

  return (
    <View className="flex-1 bg-background">
      <FlatList
        data={categories}
        keyExtractor={(item) => item}
        ListHeaderComponent={
          <ListHeader earnedCount={earnedCount} totalAwards={totalAwards} />
        }
        renderItem={({ item: category }) => (
          <AwardCategory
            title={category}
            earnedAwards={earnedAwards}
          />
        )}
        ListFooterComponent={
          <ListFooter earnedCount={earnedCount} score={score} />
        }
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingBottom: insets.bottom + 50
        }}
      />
    </View>
  );
}
