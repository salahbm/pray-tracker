import { User } from '@/hooks/user/useGetUser';

export function isProUser(user: User): boolean {
  const subs = user.customer?.subscriptions ?? [];
  return subs.some((sub) => sub.status === 'active');
}
