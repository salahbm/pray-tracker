import React from 'react';
import { View, ViewProps } from 'react-native';
import { cn } from '@/lib/utils';

interface ISkeletonProps extends ViewProps {}

const Skeleton: React.FC<ViewProps> = ({ className, ...props }) => {
  return (
    <View
      {...props}
      className={cn('animate-pulse w-full h-5 rounded-lg bg-foreground/20', className)}
    />
  );
};

export default Skeleton;
