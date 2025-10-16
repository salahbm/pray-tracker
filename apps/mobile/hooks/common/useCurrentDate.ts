import { useState, useEffect } from 'react';

export const useCurrentDate = () => {
  const [date, setDate] = useState(new Date());

  useEffect(() => {
    // Update date immediately if it's from a previous day
    const now = new Date();
    if (date.getDate() !== now.getDate()) {
      setDate(now);
    }

    // Calculate time until next midnight
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    tomorrow.setHours(0, 0, 0, 0);
    const timeUntilMidnight = tomorrow.getTime() - now.getTime();

    // Set up timer to update date at midnight
    const timer = setTimeout(() => {
      setDate(new Date());
    }, timeUntilMidnight);

    return () => clearTimeout(timer);
  }, [date]);

  return date;
};
