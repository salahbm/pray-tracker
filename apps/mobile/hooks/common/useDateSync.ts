import { useEffect, useRef } from 'react';

/**
 * Hook to detect when the date changes (after midnight)
 * Calls the callback function when a new day starts
 */
export const useDateSync = (callback: () => void) => {
  const lastDateRef = useRef(new Date().toDateString());

  useEffect(() => {
    // Check every minute if the date has changed
    const interval = setInterval(() => {
      const currentDate = new Date().toDateString();

      if (currentDate !== lastDateRef.current) {
        console.log('📅 Date changed - refreshing data');
        lastDateRef.current = currentDate;
        callback();
      }
    }, 60000); // Check every 60 seconds

    return () => clearInterval(interval);
  }, [callback]);
};
