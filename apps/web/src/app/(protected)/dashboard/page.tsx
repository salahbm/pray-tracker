// import { Metadata } from 'next';

// import { getUser } from '@/hooks/user/useUser';

// import { DashboardContent } from './_components/dashboard-content';

// export const metadata: Metadata = {
//   title: 'Dashboard - Pray Tracker',
//   description: 'Manage your Pray Tracker account and subscription',
// };

// export default async function Page() {
//   const { data } = await getUser();
//   if (!data?.user) {
//     return <div>Not Authorized</div>;
//   }

//   return <DashboardContent userId={data.user.id.trim().toString()} />;
// }


import { NextPage } from 'next'

type SampleProps = {}

const Sample: NextPage<SampleProps> = () => {
  return <div>Sample Page</div>
}

export default Sample