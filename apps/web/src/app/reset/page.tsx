import { ResetPasswordView } from '@/components/ResetView';
import { NextPage } from 'next';
import { Suspense } from 'react';

const ResetPage: NextPage = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ResetPasswordView />
    </Suspense>
  );
};

export default ResetPage;
