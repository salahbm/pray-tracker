import { format } from 'date-fns';

export const getLocalDateKey = (date: Date = new Date()) => format(date, 'yyyy-MM-dd');

export const getUtcDateKey = (date: Date | string) => {
  const parsed = typeof date === 'string' ? new Date(date) : date;
  if (Number.isNaN(parsed.getTime())) return '';
  return parsed.toISOString().split('T')[0];
};

export const parseLocalDateKey = (dateKey: string) => new Date(`${dateKey}T00:00:00`);
