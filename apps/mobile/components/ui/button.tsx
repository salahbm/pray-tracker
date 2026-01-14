import { cva, type VariantProps } from 'class-variance-authority';
import * as React from 'react';
import { Pressable } from 'react-native';

import { TextClassContext } from '@/components/ui/text';
import { cn } from '@/lib/utils';

const buttonVariants = cva(
  'group flex items-center relative justify-center rounded-md gap-2 flex-row web:ring-offset-background web:transition-colors web:focus-visible:outline-none web:focus-visible:ring-2 web:focus-visible:ring-border-focus web:focus-visible:ring-offset-2',
  {
    variants: {
      variant: {
        default: 'bg-primary web:hover:opacity-90 active:opacity-90',
        destructive:
          'bg-transparent border border-destructive web:hover:opacity-90 active:opacity-90 disabled:bg-muted disabled:text-muted-foreground',
        outline:
          'border border-border bg-transparent web:hover:bg-primary/10 web:hover:text-primary active:bg-primary/10 active:text-primary',
        ghost:
          'web:hover:bg-primary/10 web:hover:text-primary active:bg-primary/10 active:text-primary',
        link: 'web:underline-offset-4 web:hover:underline web:focus:underline',
        icon: 'bg-transparent active:bg-transparent active:opacity-100',
      },
      size: {
        default: 'h-12 px-4 py-2 native:h-12 native:px-5 native:py-3',
        sm: 'h-10 rounded-md px-3',
        lg: 'h-12 rounded-md px-8 native:h-14',
        icon: 'h-10 w-10 px-1',
      },
      width: {
        auto: 'w-auto',
        sm: 'w-[64px]',
        md: 'w-[80px]',
        lg: 'w-[120px]',
        full: 'w-full',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
      width: 'auto',
    },
  }
);

const buttonTextVariants = cva(
  'web:whitespace-nowrap text-sm native:text-base font-medium text-foreground web:transition-colors',
  {
    variants: {
      variant: {
        default: 'text-primary-foreground group-active:text-foreground',
        destructive: 'text-destructive disabled:text-muted-foreground',
        outline: 'group-active:text-primary',
        ghost: 'group-active:text-primary',
        link: 'text-primary group-active:underline',
        icon: '',
      },
      size: {
        default: '',
        sm: '',
        lg: 'native:text-lg',
        icon: '',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
);

type ButtonProps = React.ComponentPropsWithoutRef<typeof Pressable> &
  VariantProps<typeof buttonVariants>;

const Button = React.forwardRef<React.ElementRef<typeof Pressable>, ButtonProps>(
  ({ className, variant, size, ...props }, ref) => {
    return (
      <TextClassContext.Provider
        value={buttonTextVariants({
          variant,
          size,
          className: 'web:pointer-events-none',
        })}
      >
        <Pressable
          className={cn(
            props.disabled && 'opacity-50 web:pointer-events-none',
            buttonVariants({ variant, size, className })
          )}
          ref={ref}
          role="button"
          {...props}
        />
      </TextClassContext.Provider>
    );
  }
);

Button.displayName = 'Button';

export { Button, buttonTextVariants, buttonVariants };
export type { ButtonProps };
