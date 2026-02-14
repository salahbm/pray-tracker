// API Response types
export interface IResponse<T> {
  success: boolean;
  message?: string;
  data: T;
}

export interface IErrorResponse {
  message: string;
  statusCode: number;
  code?: string | number;
}

export interface IPaginatedResponse<T> {
  data: T[];
  meta: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}

export type { IPaginatedResponse as PaginatedResponse };

// User types
export interface User {
  id: string;
  name: string;
  email: string;
  image: string | null;
  locale: string | null;
  totalPoints: number | null;
  emailVerified: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface UserStats {
  totalPrayers: number;
  currentStreak: number;
  longestStreak: number;
  totalPoints: number;
  rank: number;
}

// Inquiry types
export enum InquiryStatus {
  OPEN = 'OPEN',
  CLOSED = 'CLOSED',
}

export enum InquirySenderRole {
  USER = 'USER',
  OWNER = 'OWNER',
}

// Re-export for convenience
export { InquiryStatus as Status, InquirySenderRole as SenderRole };

export interface InquiryMessage {
  id: string;
  inquiryId: string;
  senderRole: InquirySenderRole;
  body: string;
  userId: string | null;
  createdAt: string;
  user?: {
    id: string;
    name: string;
    email: string;
    image: string | null;
  } | null;
}

export interface Inquiry {
  id: string;
  userId: string | null;
  email: string;
  subject: string;
  status: InquiryStatus;
  createdAt: string;
  updatedAt: string;
  messages?: InquiryMessage[];
  user?: {
    id: string;
    name: string;
    email: string;
    image: string | null;
  } | null;
}

// Dashboard stats
export interface DashboardStats {
  totalUsers: number;
  totalInquiries: number;
  openInquiries: number;
  closedInquiries: number;
  newUsersThisWeek: number;
  newUsersThisMonth: number;
  totalPrayers: number;
  userGrowth: Array<{
    date: string;
    count: number;
  }>;
  inquiryTrend: Array<{
    date: string;
    open: number;
    closed: number;
  }>;
}

export interface OnboardingPreferences {
  id: string;
  userId: string;
  email: string;
  prayerKnowledge: string | null;
  supportNeeded: string | null;
  learnIslam: string | null;
  whyHere: string[];
  whereDidYouHearAboutUs: string | null;
  locationPermissionGranted: boolean;
  locationCity: string | null;
  locationTimezone: string | null;
  notificationPermissionGranted: boolean;
  notificationPreset: string | null;
  enabledModules: string[];
  defaultHomeTab: string | null;
  createdAt: string;
  updatedAt: string;
}
