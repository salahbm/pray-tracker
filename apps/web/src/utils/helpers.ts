// TODO: Import User type from the appropriate location when needed
type User = {
  customer?: {
    subscriptions?: Array<{
      status: string;
    }>;
  };
};

export function isProUser(user: User): boolean {
  const subs = user.customer?.subscriptions ?? [];
  return subs.some(sub => sub.status === 'active');
}
