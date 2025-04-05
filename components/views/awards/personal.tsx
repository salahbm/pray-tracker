import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { View, FlatList, TouchableOpacity, RefreshControl } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import Loader from '@/components/shared/loader';
import Modal from '@/components/shared/modal';
import { Text } from '@/components/ui/text';
import { useAwards } from '@/hooks/awards/useGetAwards';
import { cn } from '@/lib/utils';
import { useAuthStore } from '@/store/auth/auth-session';
import { useThemeStore } from '@/store/defaults/theme';
import { awardRules } from '@/utils/award-helpers';

interface IAward {
  id?: string;
  title: string;
  points: number;
  awardedAt?: string;
  isEarned?: boolean;
  earnedDate?: string;
}

const getAwardEmoji = (title: string) => {
  const emojiMap = {
    'First Prayer Logged': '🌟',
    'Completed First Full Day': '📅',
    '7 Day Streak': '🔥',
    '14 Day Streak': '🌋',
    '30 Day Streak': '⚡️',
    '90 Day Streak': '💫',
    'Early Fajr Master': '🌅',
    'On Time Warrior': '⚔️',
    'Consistency Champ': '🏆',
    'The Devoted': '👑',
    'Nafl Initiator': '🌙',
    'Bounce Back': '💪',
  };

  if (title.includes('Strike')) {
    if (title.includes('Fajr')) return '🌄';
    if (title.includes('Dhuhr')) return '☀️';
    if (title.includes('Asr')) return '🌤️';
    if (title.includes('Maghrib')) return '🌅';
    if (title.includes('Isha')) return '🌙';
    if (title.includes('Nafl')) return '✨';
  }

  if (title.includes('Level')) return '🎯';

  return emojiMap[title] || '🏅';
};

const AwardCard = ({ award, isEarned, earnedDate, onPress }) => {
  const emoji = getAwardEmoji(award.title);

  return (
    <TouchableOpacity
      className={cn(
        'w-[48%] mb-3 rounded-xl overflow-hidden',
        'bg-card border border-border',
        isEarned ? 'opacity-100' : 'opacity-60',
      )}
      activeOpacity={0.8}
      onPress={() => onPress(award, isEarned, earnedDate)}
    >
      <View
        className={cn(
          'p-4 min-h-[140px] justify-between',
          isEarned ? 'bg-primary/10' : 'bg-muted/30',
        )}
      >
        <Text className="text-3xl mb-2">{emoji}</Text>
        <Text
          className={cn(
            'text-sm font-medium mb-2',
            isEarned ? 'text-primary' : 'text-muted-foreground',
          )}
          numberOfLines={2}
        >
          {award.title}
        </Text>
        {isEarned && (
          <View className="absolute top-5 right-2">
            <Text className="text-xs text-muted-foreground">
              {new Date(earnedDate).toLocaleDateString()}
            </Text>
          </View>
        )}
        {!isEarned && (
          <View className="absolute top-5 right-2">
            <Text className="text-base opacity-80">🔒</Text>
          </View>
        )}
        <Text className="text-xs text-muted-foreground">
          {award.points} points
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const AwardCategory = ({ title, earnedAwards, onPressAward }) => {
  const { t } = useTranslation();
  const categoryAwards = awardRules.filter((award) => {
    if (title === 'first') return award.title.includes('First');
    if (title === 'streak')
      return award.title.includes('Streak') || award.title.includes('Strike');
    if (title === 'prayer_quality')
      return award.title.includes('On Time') || award.title.includes('Early');
    if (title === 'milestone') return award.title.includes('Level');
    if (title === 'special')
      return (
        award.title === 'The Devoted' || award.title === 'Consistency Champ'
      );
    return false;
  });

  if (categoryAwards.length === 0) return null;

  return (
    <View className="mb-6 px-4">
      <Text className="text-xl font-semibold text-foreground mb-3 capitalize">
        {t(`Awards.Categories.${title}`)}
      </Text>
      <View className="flex-row flex-wrap justify-between">
        {categoryAwards.map((award) => {
          const earnedAward = earnedAwards?.find(
            (earned) => earned.title === award.title,
          );
          return (
            <AwardCard
              key={award.title}
              award={award}
              isEarned={!!earnedAward}
              earnedDate={earnedAward?.awardedAt}
              onPress={onPressAward}
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
          <Text className="text-2xl font-bold text-primary mr-1">{score}</Text>
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
  const { data, isLoading, refetch } = useAwards(user?.id);
  const insets = useSafeAreaInsets();
  const { t } = useTranslation();
  const { colors } = useThemeStore();
  const [selectedAward, setSelectedAward] = useState<IAward | null>(null);

  const categories = [
    'first',
    'streak',
    'prayer_quality',
    'milestone',
    'special',
  ];

  const earnedAwards = data?.data || [];
  const totalAwards = awardRules.length;
  const earnedCount = earnedAwards.length;
  const score = Math.round((earnedCount / totalAwards) * 100);

  const handleAwardPress = (award, isEarned, earnedDate) => {
    setSelectedAward({
      ...award,
      isEarned,
      earnedDate,
    });
  };

  if (isLoading) {
    return <Loader visible={isLoading} className="bg-transparent" />;
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
            onPressAward={handleAwardPress}
          />
        )}
        ListFooterComponent={
          <ListFooter earnedCount={earnedCount} score={score} />
        }
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingBottom: insets.bottom + 50,
        }}
        refreshControl={
          <RefreshControl
            refreshing={isLoading}
            onRefresh={refetch}
            tintColor={colors['--primary']}
          />
        }
      />

      <Modal
        isVisible={!!selectedAward}
        onBackdropPress={() => setSelectedAward(null)}
      >
        <View className="bg-card rounded-md relative">
          {selectedAward && (
            <View className="px-6 py-12">
              <Text className="text-xl font-bold mb-3 mt-3">
                {selectedAward.title}
              </Text>
              <Text className="text-sm text-muted-foreground mb-4">
                {selectedAward.points} points
              </Text>
              {selectedAward.isEarned && (
                <Text className="text-sm text-muted-foreground absolute top-4 right-4">
                  {new Date(selectedAward.earnedDate).toLocaleDateString()}
                </Text>
              )}
            </View>
          )}
        </View>
      </Modal>
    </View>
  );
}
