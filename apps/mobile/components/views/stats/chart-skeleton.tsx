import Skeleton from '@/components/ui/skeleton';
import { View } from 'react-native';

type ChartType = 'bar' | 'line' | 'pie';

export function ChartSkeleton({
  type = 'bar',
  height = 200,
}: {
  type?: ChartType;
  height?: number;
}) {
  if (type === 'pie') {
    return (
      <View style={{ height }} className="items-center justify-center bg-muted rounded-md">
        <Skeleton className="w-56 h-56 rounded-full" />
      </View>
    );
  }

  if (type === 'line') {
    return (
      <View style={{ height }} className="justify-center gap-3 px-2 bg-muted rounded-md py-5">
        <Skeleton className="h-3 w-full rounded-full" />
        <Skeleton className="h-3 w-2/6 rounded-full" />
        <Skeleton className="h-3 w-4/6 rounded-full" />
        <Skeleton className="h-3 w-3/6 rounded-full" />
        <Skeleton className="h-3 w-5/6 rounded-full" />
      </View>
    );
  }

  // BAR (default)
  return (
    <View
      style={{ height }}
      className="flex-row items-end justify-between gap-2 px-4 py-0.5 bg-muted rounded-md"
    >
      {[40, 70, 55, 90, 60].map((h, i) => (
        <Skeleton key={i} className="w-10 rounded-md" style={{ height: `${h}%` } as any} />
      ))}
    </View>
  );
}
