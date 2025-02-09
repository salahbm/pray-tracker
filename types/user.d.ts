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
  premium: boolean;
  premiumExpiry: Date | null;
  createdAt: string;
  updatedAt: string;
};
