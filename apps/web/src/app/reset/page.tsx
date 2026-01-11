import { ResetPasswordView } from '@/components/reset-view';
import { NextPage } from 'next';
import { Suspense } from 'react';

type ResetProps = {};

const Reset: NextPage<ResetProps> = () => (
  <Suspense fallback={<div>Loading...</div>}>
    <ResetPasswordView />
  </Suspense>
);

export default Reset;
