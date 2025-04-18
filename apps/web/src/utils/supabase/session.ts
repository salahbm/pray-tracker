// import { supabase } from '@/lib/supabase';
// import { redirect } from 'next/navigation';

// /**
//  * Get current user object
//  */
// export async function getUser() {
//   const { data, error } = await supabase.auth.getUser();
//   if (error || !data.user) return null;
//   return data.user;
// }

// /**
//  * Checks if user is authenticated
//  */
// export async function isAuthenticated() {
//   const user = await getUser();
//   return !!user;
// }

// /**
//  * Redirects to login if user is not authenticated
//  */
// export async function redirectIfNotAuthenticated() {
//   const user = await getUser();
//   if (!user) redirect('/login');
// }
