export interface User {
  id: string;
  name: string;
  email: string;
  image: string;
  locale: string;
}

export interface TUser {
  id: string;
  username: string;
  email: string;
  photo: string;
  totalPoints: number;
  rank?: number;
  isCurrentUser?: boolean;
  firstName?: string;
  lastName?: string;
}
