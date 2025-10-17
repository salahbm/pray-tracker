import { ActivityIndicator, View } from 'react-native';

import { cn } from '@/lib/utils';

const Loader = ({
  visible,
  className,
  size = 'large',
  color = 'text-primary',
}: {
  visible: boolean;
  className?: string;
  size?: 'large' | 'small';
  color?: string;
}) => {
  if (!visible) return null;
  return (
    <View
      className={cn(
        'flex flex-1 items-center justify-center absolute top-0 left-0 right-0 bottom-0 z-50 bg-[rgba(0,0,0,0.5)] backdrop:blur-md',
        className
      )}
    >
      <ActivityIndicator size={size} className={color} />
    </View>
  );
};

export default Loader;
