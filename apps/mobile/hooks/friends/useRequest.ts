import { useQueryClient } from '@tanstack/react-query';

import QueryKeys from '@/constants/query-keys';
import agent from '@/lib/agent';
import { IResponse } from '@/types/api';
import { IFriend } from '@/types/friends';
import { User } from '@/types/user';
import { sendPushNotification } from '@/utils/notification';

import useMutation from '../common/useMutation';

type TParams = {
  userId: string;
  friendEmail: string;
};

interface IFriendship {
  sentBy: User;
  friend: IFriend;
}

const sendRequest = async (params: TParams): Promise<IResponse<IFriendship>> =>  await agent.post<IResponse<IFriendship>>('/friends/request', {
    body: JSON.stringify({
      userId: params.userId,
      friendEmail: params.friendEmail,
    }),
  });


export const useRequest = () => {
  const queryClient = useQueryClient();
  // TODO: i18n in title and body
  // const { t } = useTranslation();
  return useMutation({
    mutationFn: sendRequest,
    options: {
      onSuccess: async response => {
        await queryClient.invalidateQueries({ queryKey: QueryKeys.friends.pending });

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
