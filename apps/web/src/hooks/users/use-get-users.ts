import { useQuery } from '@tanstack/react-query';
import agent from '@/lib/agent';
import { IPaginatedResponse, User } from '@/types';

interface GetUsersParams {
  page?: number;
  limit?: number;
  search?: string;
}

const getUsers = async (params: GetUsersParams): Promise<IPaginatedResponse<User>> => {
  const data = await agent.get<IPaginatedResponse<User>>('/users', { params });
  return data;
};

export const useGetUsers = (params: GetUsersParams) =>
  useQuery({
    queryKey: ['users', 'list', params],
    queryFn: () => getUsers(params),
  });
