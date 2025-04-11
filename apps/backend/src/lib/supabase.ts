import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config();

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseRoleKey = process.env.SUPABASE_ROLE_KEY;

if (!supabaseUrl || !supabaseRoleKey) {
  throw new Error(
    'Missing Supabase configuration. Check your environment variables.'
  );
}

export const supabase = createClient(supabaseUrl, supabaseRoleKey);
