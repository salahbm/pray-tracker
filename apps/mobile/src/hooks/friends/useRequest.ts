import { useQueryClient } from '@tanstack/react-query';

import useMutation from '../common/useMutation';
import { pendingFriendsList } from '@/constants/query-keys';
import { agent } from '@/lib/agent';
import { IResponse } from '@/types/api';
import { IFriend } from '@/types/friends';
import { TUser } from '@/types/user';
import { sendPushNotification } from '@/utils/notification';

type TParams = {
  userId: string;
  friendEmail: string;
};

interface IFriendship {
  sentBy: TUser;
  friend: IFriend;
}

const sendRequest = async (
  params: TParams,
): Promise<IResponse<IFriendship>> => {
  const res = await agent('/friends/request', {
    method: 'POST',
    body: JSON.stringify({
      userId: params.userId,
      friendEmail: params.friendEmail,
    }),
  });
  return res;
};

export const useRequest = () => {
  const queryClient = useQueryClient();
  // TODO: i18n in title and body
  // const { t } = useTranslation();
  return useMutation({
    mutationFn: sendRequest,
    options: {
      onSuccess: async (response) => {
        await queryClient.invalidateQueries({ queryKey: [pendingFriendsList] });

        const { sentBy, friend } = response.data ?? {};

        // Optional: notify the friend if device token exists
        if (friend?.deviceToken && sentBy?.email) {
          await sendPushNotification({
            to: friend.deviceToken,
            title: '👤 Friend',
            body: `${sentBy.email}`,
          });
        }
      },
    },
  });
};
