import type { UserAppMetadata } from '@supabase/supabase-js';
import type { User } from '../generated/prisma';
import { TStoredUser } from './user';

declare global {
  namespace Express {
    interface Request {
      user?: UserAppMetadata;
    }
  }
}
