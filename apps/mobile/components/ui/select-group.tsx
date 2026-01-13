// components/ui/select/select-group.tsx
import React from 'react';
import { View, ViewStyle } from 'react-native';
import { cn } from '@/lib/utils';
import { Select, type SelectOption } from './select';
import { Text } from './text';
import type { SelectVariantProps } from './select';
import { triggerHaptic } from '@/utils';

interface SelectGroupProps<T = string> extends SelectVariantProps {
  title?: string;
  description?: string;
  options: SelectOption<T>[];
  value: T | T[];
  onChange: (value: T | T[]) => void;
  multiple?: boolean;
  disableAnimation?: boolean;
  containerClassName?: string;
  containerStyle?: ViewStyle;
}

export function SelectGroup<T = string>({
  title,
  description,
  options,
  value,
  onChange,
  multiple = false,
  variant = 'default',
  disableAnimation = false,
  containerClassName,
  containerStyle,
}: SelectGroupProps<T>) {
  const selectedValues = Array.isArray(value) ? value : [value];

  const handleSelect = (optionValue: T) => {
    if (multiple) {
      const isSelected = selectedValues.includes(optionValue);
      const newValues = isSelected
        ? selectedValues.filter(v => v !== optionValue)
        : [...selectedValues, optionValue];

      onChange(newValues as T & T[]);
    } else {
      onChange(optionValue);
    }
    triggerHaptic();
  };

  const isSelected = (optionValue: T) => selectedValues.includes(optionValue);

  return (
    <View className={cn('w-full', containerClassName)} style={containerStyle}>
      {/* Header */}
      {(title || description) && (
        <View className="mb-4">
          {title && <Text className="text-lg font-semibold text-foreground mb-1.5">{title}</Text>}
          {description && (
            <Text className="text-sm text-muted-foreground leading-relaxed">{description}</Text>
          )}
        </View>
      )}

      {/* Options */}
      <View>
        {options.map((option, index) => (
          <Select
            key={String(option.value)}
            option={option}
            selected={isSelected(option.value)}
            onSelect={handleSelect}
            variant={variant}
            index={index}
            disableAnimation={disableAnimation}
          />
        ))}
      </View>
    </View>
  );
}
