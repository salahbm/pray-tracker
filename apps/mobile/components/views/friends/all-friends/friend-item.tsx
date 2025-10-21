import React, { useMemo } from 'react';
import { View, Image, Pressable } from 'react-native';
import { useTranslation } from 'react-i18next';
import { formatDistanceToNow } from 'date-fns';
import Animated, { FadeInDown, LinearTransition } from 'react-native-reanimated';

import { Text } from '@/components/ui/text';
import { Button } from '@/components/ui/button';
import { FRIENDS } from '@/constants/images';

import { FriendItemProps } from './types';
import { useDeleteFriend } from '@/hooks/friends/member/useDelete';
import { useAcceptRequest } from '@/hooks/friends/member/useAccept';
import { useRejectRequest } from '@/hooks/friends/member/useReject';
import { FriendActivity } from '@/types/friends';
import { useAuthStore } from '@/store/auth/auth-session';

export const FriendItem: React.FC<FriendItemProps> = ({ item, index }) => {
  const { t } = useTranslation();
  const { user } = useAuthStore();

  const { mutateAsync: deleteFriend, isPending: isDeleting } = useDeleteFriend();
  const { mutateAsync: acceptFriendRequest, isPending: isAccepting } = useAcceptRequest();
  const { mutateAsync: rejectFriendRequest, isPending: isRejecting } = useRejectRequest();

  const handleReject = async (item: FriendActivity) => {
    if (item.type === 'friend') return;

    await rejectFriendRequest({
      friendshipId: item.id,
      friendId: item.friendId,
      userId: item.userId,
    });
  };

  const handleApprove = async (item: FriendActivity) => {
    if (item.type !== 'received') return;

    await acceptFriendRequest({
      friendshipId: item.id,
      friendId: item.friendId,
      userId: user?.id!,
    });
  };

  const handleRemoveFriend = async (item: FriendActivity) => {
    if (item.type !== 'friend') return;

    await deleteFriend({
      friendshipId: item.id,
      friendId: item.type === 'friend' ? item.friendId : item.id,
    });
  };

  const timeAgo = useMemo(
    () => formatDistanceToNow(new Date(item.createdAt), { addSuffix: true }),
    [item.createdAt]
  );

  const statusMessage = useMemo(() => {
    if (item.type === 'friend') return t('Friends.Pro.IsFriend');
    if (item.type === 'sent') return t('Friends.Pro.RequestSent');
    return t('Friends.Pro.RequestReceived');
  }, [item.type, t]);

  return (
    <Animated.View
      entering={FadeInDown.delay(index * 30)
        .duration(400)
        .springify()}
      layout={LinearTransition.springify()}
    >
      <Pressable className="flex-row items-center px-4 py-3 active:bg-muted/30">
        <Image
          source={{ uri: item.photo || FRIENDS.guest }}
          className="w-11 h-11 rounded-full bg-muted"
        />

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

        <View className="ml-2">
          {item.type === 'friend' && (
            <Button
              size="sm"
              variant="secondary"
              disabled={isDeleting}
              onPress={() => handleRemoveFriend(item)}
              className="rounded-lg px-4 h-8"
            >
              <Text className="text-xs font-semibold">{t('Friends.Pro.Remove')}</Text>
            </Button>
          )}

          {item.type === 'sent' && (
            <Button
              size="sm"
              variant="secondary"
              disabled={isRejecting}
              onPress={() => handleReject(item)}
              className="rounded-lg px-4 h-8"
            >
              <Text className="text-xs font-semibold">{t('Friends.Pro.Cancel')}</Text>
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
                <Text className="text-xs font-semibold">{t('Friends.Pro.Reject')}</Text>
              </Button>
              <Button
                size="sm"
                disabled={isAccepting}
                onPress={() => handleApprove(item)}
                className="rounded-lg px-3 h-8"
              >
                <Text className="text-xs font-semibold">{t('Friends.Pro.Accept')}</Text>
              </Button>
            </View>
          )}
        </View>
      </Pressable>

      <View className="h-[0.5px] bg-border ml-[68px]" />
    </Animated.View>
  );
};

export default FriendItem;
