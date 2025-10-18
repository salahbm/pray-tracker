'use client';

import { keepPreviousData, useQuery } from '@tanstack/react-query';

import  agent  from '@/lib/agent';

export interface User {
  id: string;
  supabaseId: string;
  email: string;
  username: string;
  firstName: string | null;
  lastName: string | null;
  photo: string | null;
  totalPoints: number;
  deviceToken: string | null;
  createdAt: string;
  updatedAt: string;
  customer?: {
    subscriptions?: {
      status: string;
      scheduledChange?: string | null;
    }[];
  };
}

const USER_QUERY_KEY = 'user';

const getUser = async (supabaseId: string): Promise<User> => {
  const data = await agent(`/users/${supabaseId}`);
  return data.data;
};

export const useGetUser = (supabaseId: string) => {
  return useQuery({
    queryKey: [USER_QUERY_KEY, supabaseId],
    queryFn: () => getUser(supabaseId),
    placeholderData: keepPreviousData,
    enabled: !!supabaseId,
  });
};
