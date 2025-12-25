// react 19.2 activity component clone for lower versions

import { Fragment } from 'react';

export const Activity = ({
  children,
  mode,
}: {
  children: React.ReactNode;
  mode: 'visible' | 'hidden';
}) => {
  return <Fragment>{mode === 'visible' ? children : null}</Fragment>;
};
