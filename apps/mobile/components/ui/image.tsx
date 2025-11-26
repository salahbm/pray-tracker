import { Image as ExpoImage, ImageProps as ExpoImageProps } from 'expo-image';
import { cva, VariantProps } from 'class-variance-authority';
import React from 'react';

import { FRIENDS } from '@/constants/images';
import { cn } from '@/lib/utils';

interface IImageProps extends VariantProps<typeof imageVariants>, Omit<ExpoImageProps, 'source' | 'defaultSource'> {
  source?: string | number;
  className?: string;
  defaultSource?: string | number;
}

export const imageVariants = cva('shrink-0 grow-0', {
  variants: {
    size: {
      sm: 'w-8 h-8',
      md: 'w-12 h-12',
      lg: 'w-16 h-16',
    },
    radius: {
      sm: 'rounded-sm',
      md: 'rounded-md',
      lg: 'rounded-lg',
      full: 'rounded-full',
    },
    border: {
      yes: 'border border-border',
      no: 'border-none',
    },
  },
  defaultVariants: {
    size: 'md',
    radius: 'full',
    border: 'yes',
  },
});

const Image: React.FC<IImageProps> = ({
  source,
  className,
  defaultSource,
  size,
  radius,
  border,
  ...props
}) => {
  return (
    <ExpoImage
      source={source ? (typeof source === 'string' ? { uri: source } : source) : (defaultSource ?? FRIENDS.guest)}
      className={cn(imageVariants({ size, radius, border }), className)}
      contentFit="cover"
      transition={200}
      {...props}
    />
  );
};

export default Image;
