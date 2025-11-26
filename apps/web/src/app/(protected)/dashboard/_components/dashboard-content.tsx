// 'use client';

// import { BiLoaderAlt } from 'react-icons/bi';

// import { useGetUser } from '@/hooks/user/useGetUser';
// import { isProUser } from '@/utils/helpers';

// import { ProfileSection } from './profile-section';
// import { SubscriptionSection } from './subscription-section';

// interface DashboardContentProps {
//   userId: string;
// }

// export function DashboardContent({ userId }: DashboardContentProps) {
//   const { data: userData, isLoading: isUserLoading } = useGetUser(userId);

//   if (isUserLoading) {
//     return (
//       <div className="flex items-center justify-center min-h-[60vh]">
//         <div className="text-center">
//           <BiLoaderAlt className="animate-spin h-8 w-8 text-primary mx-auto" />
//           <p className="mt-2 text-sm text-gray-600">Loading your dashboard...</p>
//         </div>
//       </div>
//     );
//   }

//   if (!userData) {
//     return (
//       <div className="flex items-center justify-center min-h-[60vh]">
//         <div className="text-center">
//           <h2 className="text-xl font-semibold text-gray-900">Not Authorized</h2>
//           <p className="mt-2 text-sm text-gray-600">Please sign in to view your dashboard</p>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="space-y-6 px-4 lg:px-0">
//       {/* Welcome Section */}
//       <div className="bg-white overflow-hidden shadow rounded-md">
//         <div className="p-6">
//           <div className="flex items-center justify-between">
//             <div>
//               <h1 className="text-2xl font-bold text-gray-900">
//                 Welcome back, {userData.username}
//               </h1>
//               <p className="mt-1 text-sm text-gray-500">
//                 Manage your account settings and view your prayer statistics
//               </p>
//             </div>
//             <div className="hidden sm:block">
//               <span className="inline-flex items-center px-3 py-0.5 rounded-full text-sm font-medium bg-primary-50 text-primary">
//                 {isProUser(userData) ? 'Pro Member' : 'Free Plan'}
//               </span>
//             </div>
//           </div>
//         </div>
//       </div>

//       <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
//         <ProfileSection user={userData} />
//         <SubscriptionSection user={userData} />
//       </div>
//     </div>
//   );
// }
