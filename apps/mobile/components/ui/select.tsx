// components/ui/select/select.styles.ts
import { cva, type VariantProps } from 'class-variance-authority';

export const selectVariants = cva(
  'flex-row items-center justify-between rounded-xl border-2 px-4 py-3.5 min-h-[56px]',
  {
    variants: {
      variant: {
        default: '',
        outline: '',
      },
      selected: {
        true: '',
        false: '',
      },
    },
    compoundVariants: [
      {
        variant: 'default',
        selected: false,
        className: 'border-border bg-background',
      },
      {
        variant: 'default',
        selected: true,
        className: 'border-primary bg-primary/5',
      },
      {
        variant: 'outline',
        selected: false,
        className: 'border-border bg-transparent',
      },
      {
        variant: 'outline',
        selected: true,
        className: 'border-primary bg-primary/5',
      },
    ],
    defaultVariants: {
      variant: 'default',
      selected: false,
    },
  }
);

export type SelectVariantProps = VariantProps<typeof selectVariants>;

// components/ui/select/select.tsx
import React from 'react';
import { View, ViewStyle } from 'react-native';
import { MotiView } from 'moti';
import { cn } from '@/lib/utils';
import { PressableBounce } from '../shared/pressable-bounce';
import { Text } from './text';

export interface SelectOption<T = string> {
  value: T;
  label: string;
  description?: string;
  icon?: React.ReactNode;
  disabled?: boolean;
}

interface SelectProps<T = string> extends SelectVariantProps {
  option: SelectOption<T>;
  selected: boolean;
  onSelect: (value: T) => void;
  index?: number;
  disableAnimation?: boolean;
  containerClassName?: string;
  containerStyle?: ViewStyle;
}

export function Select<T = string>({
  option,
  selected,
  onSelect,
  variant = 'default',
  index = 0,
  disableAnimation = false,
  containerClassName,
  containerStyle,
}: SelectProps<T>) {
  const isDisabled = option.disabled || false;

  const handlePress = () => {
    if (!isDisabled) {
      onSelect(option.value);
    }
  };

  const content = (
    <PressableBounce
      onPress={handlePress}
      disabled={isDisabled}
      bounceScale={0.98}
      duration={200}
      stiffness={400}
      damping={20}
      className={cn(selectVariants({ variant, selected }), isDisabled && 'opacity-40')}
    >
      {/* Left content */}
      <View className="flex-1 flex-row items-center gap-3">
        {/* Icon */}
        {option.icon && (
          <MotiView
            animate={{
              opacity: selected ? 1 : 0.5,
              scale: selected ? 1 : 0.95,
            }}
            transition={{ type: 'timing', duration: 200 }}
          >
            {option.icon}
          </MotiView>
        )}

        {/* Text */}
        <View className="flex-1">
          <Text
            className={cn('text-base font-medium', selected ? 'text-primary' : 'text-foreground')}
            numberOfLines={2}
          >
            {option.label}
          </Text>

          {option.description && (
            <Text className="text-sm text-muted-foreground mt-0.5" numberOfLines={2}>
              {option.description}
            </Text>
          )}
        </View>
      </View>

      {/* Indicator */}
      <MotiView
        animate={{
          scale: selected ? 1 : 0,
          opacity: selected ? 1 : 0,
        }}
        transition={{
          type: 'spring',
          damping: 18,
          stiffness: 200,
        }}
      >
        <View className="w-5 h-5 rounded-full bg-primary items-center justify-center ml-3">
          <View className="w-2 h-2 rounded-full bg-primary-foreground" />
        </View>
      </MotiView>
    </PressableBounce>
  );

  if (disableAnimation) {
    return (
      <View className={cn('mb-3', containerClassName)} style={containerStyle}>
        {content}
      </View>
    );
  }

  return (
    <MotiView
      from={{ opacity: 0, translateY: 10, scale: 0.96 }}
      animate={{ opacity: 1, translateY: 0, scale: 1 }}
      transition={{
        type: 'spring',
        damping: 20,
        stiffness: 200,
        delay: index * 50,
      }}
      className={cn('mb-3', containerClassName)}
      style={containerStyle}
    >
      {content}
    </MotiView>
  );
}
