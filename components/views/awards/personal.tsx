import LottieView from 'lottie-react-native';
import React, { useMemo, useRef, useState } from 'react';
import { View, Image, FlatList, TouchableOpacity } from 'react-native';
import Modal from 'react-native-modal';

import Loader from '@/components/shared/loader';
import NoData from '@/components/shared/no-data';
import { Text } from '@/components/ui/text';
import { AWARDS } from '@/constants/awards';
import { IMAGES } from '@/constants/images';
import { useAwards } from '@/hooks/awards/useGetAwards';
import { cn } from '@/lib/utils';
import { useAuthStore } from '@/store/auth/auth-session';
import prize from 'assets/gif/prize.json';

export default function PersonalTab() {
  const { user } = useAuthStore();
  const { data, isLoading } = useAwards(user?.id);
  const obtainedAwards = useMemo(
    () => data?.map((award) => award.title) || [],
    [data],
  );
  const prizeRef = useRef<LottieView>(null);
  const [selectedAward, setSelectedAward] = useState(null);

  return (
    <React.Fragment>
      <Loader visible={isLoading} className="bg-transparent" />
      <FlatList
        data={AWARDS}
        keyExtractor={(award) => award.title}
        renderItem={({ item }) => {
          const isAchieved = obtainedAwards.includes(item.title);
          const obtainedAward = data?.find(
            (award) => award.title === item.title,
          );
          return (
            <TouchableOpacity
              onPress={() => {
                setSelectedAward(
                  obtainedAward
                    ? { ...item, achievedAt: obtainedAward.achievedAt }
                    : item,
                );
                setTimeout(() => {
                  prizeRef.current?.play();
                }, 100);
              }}
            >
              <View
                className={cn(
                  'flex-row items-center mb-4 px-2 py-3 rounded-lg border',
                  isAchieved
                    ? 'bg-accent border-primary'
                    : 'bg-popover border-border opacity-50',
                )}
              >
                {/* Badge Icon */}
                <View className="w-16 h-16 rounded-full border border-border flex items-center justify-center">
                  {isAchieved ? (
                    <Image source={IMAGES.check} className="w-14 h-14" />
                  ) : (
                    <Text>🏆</Text>
                  )}
                </View>

                {/* Award Info */}
                <View className="ml-4">
                  <Text
                    className={cn(
                      'text-lg font-semibold',
                      isAchieved
                        ? 'text-accent-foreground font-bold'
                        : 'text-popover-foreground',
                    )}
                  >
                    {item.title}
                  </Text>
                  <Text
                    numberOfLines={1}
                    ellipsizeMode="tail"
                    className={cn(
                      'text-sm text-muted-foreground truncate',
                      isAchieved
                        ? 'text-accent-foreground'
                        : 'text-muted-foreground',
                    )}
                  >
                    {item.description}
                  </Text>
                </View>
              </View>
            </TouchableOpacity>
          );
        }}
        ListEmptyComponent={() => <NoData className="mt-[45%]" />}
        contentContainerStyle={{ gap: 8 }}
        className="my-4"
        showsVerticalScrollIndicator={false}
        ListFooterComponent={() => (
          <View className="my-4 mx-auto">
            <Text className="text-lg font-semibold text-center">
              {user?.totalPoints} Points
            </Text>
            <Text className="text-lg font-semibold text-center">
              {AWARDS.length - obtainedAwards.length === 0
                ? '🎉'
                : `${AWARDS.length - obtainedAwards.length} Awards to go!`}
            </Text>
          </View>
        )}
      />

      {/* Award Details Modal */}
      <Modal
        isVisible={!!selectedAward}
        onBackdropPress={() => {
          setSelectedAward(null);
          prizeRef.current?.reset();
        }}
      >
        <View className="py-6 px-4 bg-background rounded-lg border border-border">
          {selectedAward?.achievedAt && (
            <LottieView
              ref={prizeRef}
              source={prize}
              autoPlay={false}
              resizeMode="cover"
              style={{ width: 130, height: 130, alignSelf: 'center' }}
            />
          )}
          <View className="flex-row items-center flex justify-between mb-4">
            <Text className="text-xl font-bold ">{selectedAward?.title}</Text>
            <Text className="text-md text-muted-foreground font-medium">
              {selectedAward?.achievedAt
                ? new Date(selectedAward.achievedAt).toLocaleDateString()
                : 'Not obtained yet'}
            </Text>
          </View>
          <Text className="text-md text-foreground font-semibold mb-2">
            {selectedAward?.description}
          </Text>
        </View>
      </Modal>
    </React.Fragment>
  );
}
