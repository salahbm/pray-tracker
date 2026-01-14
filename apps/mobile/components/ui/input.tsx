import { cn } from '@lib/utils';
import { Eye, EyeClosed } from 'lucide-react-native';
import * as React from 'react';
import { TextInput, type TextInputProps, View } from 'react-native';

import { useThemeStore } from '@/store/defaults/theme';

import { Text } from './text';

const Input = React.forwardRef<
  React.ComponentRef<typeof TextInput>,
  TextInputProps & {
    label?: string;
    error?: string;
  }
>(({ className, label, secureTextEntry = false, ...props }, ref) => {
  const { colors } = useThemeStore();
  const [secure, setSecure] = React.useState(secureTextEntry);
  return (
    <View>
      {label && (
        <Text className={cn('mb-2 block text-md font-medium text-foreground')}>{label}</Text>
      )}
      <View style={{ position: 'relative' }}>
        <TextInput
          ref={ref}
          className={cn(
            'h-10 native:h-14 bg-background/50 rounded-md border border-border focus:border-focus hover:border-hover focus:bg-background/70 hover:bg-background/70 px-3 text-lg leading-[1.25] text-foreground',
            props.editable === false && 'opacity-50 -not-allowed',
            props.error && 'border-destructive',
            className
          )}
          {...props}
          placeholderTextColor={colors['--muted-foreground']}
          secureTextEntry={secure}
        />
        <View
          style={{
            position: 'absolute',
            right: 12,
            transform: [{ translateY: '50%' }],
          }}
        >
          {secureTextEntry &&
            (secure ? (
              <Eye
                size={24}
                color={colors['--foreground']}
                className=" cursor-pointer"
                onPress={() => setSecure(false)}
              />
            ) : (
              <EyeClosed
                size={24}
                color={colors['--foreground']}
                className=" cursor-pointer"
                onPress={() => setSecure(true)}
              />
            ))}
        </View>
      </View>
    </View>
  );
});

Input.displayName = 'Input';

export { Input };
