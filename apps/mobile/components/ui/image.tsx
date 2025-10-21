import { FRIENDS } from '@/constants/images';
import { cn } from '@/lib/utils';
import { cva, VariantProps } from 'class-variance-authority';
import React from 'react';
import { Image as RNImage } from 'react-native';

interface IImageProps extends VariantProps<typeof imageVariants> {
  source?: string;
  className?: string;
  defaultSource?: string;
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
    <>
      {source ? (
        <RNImage
          source={{ uri: source }}
          className={cn(imageVariants({ size, radius, border }), className)}
          {...props}
        />
      ) : (
        <RNImage
          source={defaultSource ?? FRIENDS.guest}
          className={cn(imageVariants({ size, radius, border }), className)}
          {...props}
        />
      )}
    </>
  );
};

export default Image;
