import React, { memo } from 'react';
import {
  Controller,
  Control,
  FieldValues,
  Path,
  FieldPath,
  ControllerRenderProps,
} from 'react-hook-form';
import { View, ActivityIndicator } from 'react-native';
import { Text } from '@/components/ui/text';
import { cn } from '@/lib/utils';

type FormFieldProps<T extends FieldValues> = {
  control: Control<T>;
  name: Path<T>;
  label?: string;
  required?: boolean;
  className?: string;
  labelClassName?: string;
  message?: string;
  messageClassName?: string;
  loading?: boolean;
  render: (params: {
    field: ControllerRenderProps<T, FieldPath<T>>;
    fieldState: { error?: { message?: string } };
    formState: any;
  }) => React.ReactNode;
};

/**
 * Cross-platform version of shadcn/ui FormField for React Native + Expo
 */
const FormField = memo(<T extends FieldValues>(props: FormFieldProps<T>) => {
  const {
    control,
    name,
    label,
    required,
    className,
    labelClassName,
    message,
    messageClassName,
    loading,
    render,
  } = props;

  return (
    <Controller
      control={control}
      name={name}
      render={({ field, fieldState, formState }) => (
        <View className={cn('mb-4', className)}>
          {label && (
            <Text className={cn('mb-1 text-base font-medium text-foreground', labelClassName)}>
              {label}
              {required && <Text className="text-destructive">*</Text>}
            </Text>
          )}

          {loading ? (
            <View className="py-2 h-10 w-full rounded-md border border-input bg-muted animate-pulse" />
          ) : (
            render({ field, fieldState, formState })
          )}

          {message && (
            <Text className={cn('text-muted-foreground text-xs mt-1', messageClassName)}>
              {message}
            </Text>
          )}

          {fieldState.error && (
            <Text className="text-destructive text-xs mt-1">{fieldState.error.message}</Text>
          )}
        </View>
      )}
    />
  );
});

export default FormField as <T extends FieldValues>(props: FormFieldProps<T>) => React.ReactElement;
