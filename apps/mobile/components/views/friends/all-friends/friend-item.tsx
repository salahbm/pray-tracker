import { formatDistanceToNow } from 'date-fns';
import React, { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { Pressable, View } from 'react-native';
import Animated, { FadeInDown, LinearTransition } from 'react-native-reanimated';

import SwiperButton from '@/components/shared/swiper';
import { Button } from '@/components/ui/button';
import Image from '@/components/ui/image';
import { Text } from '@/components/ui/text';
import { useAcceptRequest } from '@/hooks/friends/member/useAccept';
import { useDeleteFriend } from '@/hooks/friends/member/useDelete';
import { useRejectRequest } from '@/hooks/friends/member/useReject';
import { useAuthStore } from '@/store/auth/auth-session';
import { FriendActivity } from '@/types/friends';

import { FriendItemProps } from './types';

export const FriendItem: React.FC<FriendItemProps> = ({ item, index }) => {
  const { t } = useTranslation();
  const { user } = useAuthStore();

  const { mutateAsync: deleteFriend, isPending: isDeleting } = useDeleteFriend();
  const { mutateAsync: acceptFriendRequest, isPending: isAccepting } = useAcceptRequest();
  const { mutateAsync: rejectFriendRequest, isPending: isRejecting } = useRejectRequest();

  const handleReject = async (item: FriendActivity) => {
    if (item.type === 'friend' || !user?.id) return;

    await rejectFriendRequest({
      friendshipId: item.id,
      userId: user.id,
    });
  };

  const handleApprove = async (item: FriendActivity) => {
    if (item.type !== 'received' || !user?.id) return;

    await acceptFriendRequest({
      friendshipId: item.id,
      userId: user.id,
    });
  };

  const handleRemoveFriend = async (item: FriendActivity) => {
    if (item.type !== 'friend' || !user?.id) return;

    await deleteFriend({
      friendshipId: item.id,
      userId: user.id,
    });
  };

  const timeAgo = useMemo(
    () => formatDistanceToNow(new Date(item.createdAt), { addSuffix: true }),
    [item.createdAt]
  );

  const statusMessage = useMemo(() => {
    if (item.type === 'friend') return t('friends.allFriends.isFriend', { name: item.username });
    if (item.type === 'sent') return t('friends.allFriends.requestSent', { name: item.username });
    return t('friends.allFriends.requestReceived', { name: item.username });
  }, [item.type, t]);

  return (
    <Animated.View
      entering={FadeInDown.delay(index * 30)
        .duration(400)
        .springify()}
      layout={LinearTransition.springify()}
    >
      <SwiperButton
        size="sm"
        title={t('common.actions.remove')}
        onPress={() => handleRemoveFriend(item)}
        disabled={isDeleting}
        enabled={item.type === 'friend'}
      >
        <Pressable className="px-4 py-3 active:bg-muted/30">
          <View className="flex-row items-center">
            <Image source={item.photo} className="w-11 h-11" />

            <View className="flex-1 ml-3">
              <View className="flex-row items-center gap-1.5">
                <Text className="text-[15px] font-semibold text-foreground" numberOfLines={1}>
                  {item.username}
                </Text>
                <Text className="text-xs text-muted-foreground">·</Text>
                <Text className="text-xs text-muted-foreground">{timeAgo}</Text>
              </View>

              <Text className="text-[13px] text-muted-foreground mt-0.5" numberOfLines={2}>
                {statusMessage}
              </Text>
            </View>
          </View>
          <View className="ml-2 mt-2 items-end">
            {item.type === 'sent' && (
              <Button
                size="sm"
                variant="secondary"
                disabled={isRejecting}
                onPress={() => handleReject(item)}
                className="rounded-lg px-4 h-8"
              >
                <Text className="text-xs font-semibold">{t('common.actions.cancel')}</Text>
              </Button>
            )}

            {item.type === 'received' && (
              <View className="flex-row gap-x-2">
                <Button
                  size="sm"
                  variant="secondary"
                  disabled={isRejecting}
                  onPress={() => handleReject(item)}
                  className="rounded-lg px-3 h-8"
                >
                  <Text className="text-xs font-semibold">{t('common.actions.reject')}</Text>
                </Button>
                <Button
                  size="sm"
                  disabled={isAccepting}
                  onPress={() => handleApprove(item)}
                  className="rounded-lg px-3 h-8"
                >
                  <Text className="text-xs font-semibold">{t('common.actions.accept')}</Text>
                </Button>
              </View>
            )}
          </View>
        </Pressable>
      </SwiperButton>

      <View className="h-[0.5px] bg-border ml-[68px]" />
    </Animated.View>
  );
};

export default FriendItem;
