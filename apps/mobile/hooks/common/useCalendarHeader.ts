import { format } from 'date-fns';
import { useNavigation } from 'expo-router';
import { useCallback, useLayoutEffect } from 'react';

type Month = {
  dateString: string;
  day: number;
  month: number;
  timestamp: number;
  year: number;
};

export const useHeaderMonthControls = (calendarRef: React.RefObject<any>) => {
  const navigation = useNavigation();

  // Pass ref once
  useLayoutEffect(() => {
    navigation.setOptions({
      calendarRef,
    });
  }, [navigation, calendarRef]);

  // Update month + year on scroll
  return useCallback(
    (months: Month[]) => {
      if (!months.length) return;

      navigation.setOptions({
        title: format(months[0].dateString, 'MMMM'),
        headerBackTitle: months[0].year.toString(),
      });
    },
    [navigation]
  );
};
