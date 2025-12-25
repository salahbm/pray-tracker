import { useQuery } from '@tanstack/react-query';

import agent from '@/lib/agent';
import { IResponseArray } from '@/types/api';
import QueryKeys from '@/constants/query-keys';
interface GroupMember {
  id: string;
  userId: string;
  username: string;
  email: string;
  photo: string;
}

interface Group {
  id: string;
  name: string;
  memberCount: number;
  creatorId: string;
  members: GroupMember[];
  createdAt: string;
  updatedAt: string;
}

export const useGetGroups = (userId: string) => {
  return useQuery({
    queryKey: QueryKeys.friends.groups,
    queryFn: async () => {
      const response = await agent.get<IResponseArray<Group>>(`/friends/groups?userId=${userId}`);
      return response.data;
    },
    enabled: !!userId,
  });
};
