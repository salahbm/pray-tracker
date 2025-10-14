import type { UserAppMetadata } from '@supabase/supabase-js';
import type { User } from '@prayer/db';
import { TStoredUser } from './user';

declare global {
  namespace Express {
    interface Request {
      user?: UserAppMetadata;
    }
  }
}
