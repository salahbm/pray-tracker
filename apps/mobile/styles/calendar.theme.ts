// calendar.theme.ts
import { Theme } from 'react-native-calendars/src/types';
import { ThemeColors } from './theme.config';

export const getMonthTheme = (colors: ThemeColors): Theme => ({
  calendarBackground: colors['--background'],
  textSectionTitleColor: colors['--foreground'],
  dayTextColor: colors['--foreground'],
  todayTextColor: colors['--primary-foreground'],
  todayDotColor: colors['--primary'],
  selectedDayTextColor: colors['--primary-foreground'],
  selectedDayBackgroundColor: colors['--primary'],
  dotColor: colors['--primary'],
  selectedDotColor: colors['--primary'],
  textDisabledColor: colors['--muted-foreground'],
  monthTextColor: colors['--primary'],
  todayBackgroundColor: colors['--primary'],
  textMonthFontWeight: '600',
  textMonthFontSize: 14,
  textMonthFontFamily: 'Montserrat-Bold',
  textDayFontFamily: 'Montserrat-Regular',
});
