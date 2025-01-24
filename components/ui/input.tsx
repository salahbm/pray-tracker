import { Eye, EyeClosed } from 'lucide-react-native';
import * as React from 'react';
import { TextInput, View, type TextInputProps } from 'react-native';

import { Text } from './text';
import { useCurrentThemeColors } from '@/hooks/common/useCurrentTheme';
import { cn } from 'lib/utils';

const Input = React.forwardRef<
  React.ElementRef<typeof TextInput>,
  TextInputProps & {
    label?: string;
    error?: boolean;
  }
>(({ className, label, secureTextEntry = false, ...props }, ref) => {
  const colors = useCurrentThemeColors();
  const [secure, setSecure] = React.useState(secureTextEntry);
  return (
    <React.Fragment>
      {label && (
        <Text className={cn('mb-2 block text-md font-medium text-foreground')}>
          {label}
        </Text>
      )}
      <View style={{ position: 'relative' }}>
        <TextInput
          ref={ref}
          className={cn(
            'web:flex h-10 native:h-12 web:w-full rounded-md border border-input bg-background px-3 web:py-2 text-base lg:text-sm native:text-lg native:leading-[1.25] text-foreground  web:ring-offset-background file:border-0 file:bg-transparent file:font-medium web:focus-visible:outline-none web:focus-visible:ring-2 web:focus-visible:ring-ring web:focus-visible:ring-offset-2',
            props.editable === false && 'opacity-50 web:cursor-not-allowed',
            props.error && 'border-destructive',
            className,
          )}
          {...props}
          placeholderTextColor={colors['--muted-foreground']}
          secureTextEntry={secure}
        />
        <View
          style={{
            position: 'absolute',
            right: 10,
            transform: [{ translateY: '50%' }],
          }}
        >
          {secureTextEntry &&
            (secure ? (
              <Eye
                size={20}
                color={colors['--foreground']}
                className=" cursor-pointer"
                onPress={() => setSecure(false)}
              />
            ) : (
              <EyeClosed
                size={20}
                color={colors['--foreground']}
                className=" cursor-pointer"
                onPress={() => setSecure(true)}
              />
            ))}
        </View>
      </View>
    </React.Fragment>
  );
});

Input.displayName = 'Input';

export { Input };
