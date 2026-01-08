import { cva, VariantProps } from 'class-variance-authority';
import React from 'react';
import { Image as ExpoImage, ImageProps as ExpoImageProps } from 'react-native';

import { FRIENDS } from '@/constants/images';
import { cn } from '@/lib/utils';

interface IImageProps
  extends VariantProps<typeof imageVariants>, Omit<ExpoImageProps, 'source' | 'defaultSource'> {
  source?: string | number;
  className?: string;
  defaultSource?: string | number;
}

export const imageVariants = cva('shrink-0 object-contain', {
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
    aspectRatio: {
      square: 'aspect-square',
      video: 'aspect-video',
      portrait: 'aspect-[3/2]',
    },
  },
  defaultVariants: {
    size: 'md',
    radius: 'full',
    border: 'yes',
    aspectRatio: 'square',
  },
});

const Image: React.FC<IImageProps> = ({
  source,
  className,
  defaultSource,
  size,
  radius,
  border,
  aspectRatio,
  ...props
}) => {
  const [hasError, setHasError] = React.useState(false);

  const imageSource =
    hasError || !source
      ? (defaultSource ?? FRIENDS.guest)
      : typeof source === 'string'
        ? { uri: source }
        : source;

  return (
    <ExpoImage
      source={imageSource}
      className={cn(imageVariants({ size, radius, border, aspectRatio }), className)}
      onError={() => setHasError(true)}
      {...props}
    />
  );
};

export default Image;
