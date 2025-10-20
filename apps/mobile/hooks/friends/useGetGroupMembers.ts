import agent from '@/lib/agent';
import { IResponse } from '@/types/api';
import QueryKeys from '@/constants/query-keys';
import { useQuery } from '@tanstack/react-query';

interface Prayer {
  fajr: number;
  dhuhr: number;
  asr: number;
  maghrib: number;
  isha: number;
  nafl: number;
}

interface GroupMember {
  id: string;
  userId: string;
  username: string;
  email: string;
  photo: string;
  prays: Prayer[];
}

interface GroupMembersResponse {
  id: string;
  name: string;
  members: GroupMember[];
}

export const useGetGroupMembers = (groupId: string, userId: string) => {
  return useQuery({
    queryKey: [...QueryKeys.friends.groupMembers, groupId, userId],
    queryFn: async () => {
      const response = await agent.get<IResponse<GroupMembersResponse>>(
        `/friends/groups/${groupId}/members?userId=${userId}`
      );
      return response.data;
    },
    enabled: !!groupId && !!userId,
  });
};
