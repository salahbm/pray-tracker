export type TUser = {
  id: string;
  supabaseId: string;
  username: string;
  email: string;
  password: string;
  photo?: string;
  totalPoints: number;
  deviceToken?: string;
  firstName?: string;
  lastName?: string;
  createdAt: string;
  updatedAt: string;
};

// Type for stored user without password
export type TStoredUser = Omit<TUser, 'password'>;

// Type guard to check if user has password
export function isFullUser(user: TUser | TStoredUser): user is TUser {
  return 'password' in user;
}
