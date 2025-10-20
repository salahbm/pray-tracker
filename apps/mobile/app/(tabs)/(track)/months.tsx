import { debounce } from '@/utils/debounce';
import { useColorScheme } from 'nativewind';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { View } from 'react-native';
import { CalendarList, DateData } from 'react-native-calendars';
import { RenderHeader } from '@/components/views/pray-history/month-header';
import { useHeaderMonthControls } from '@/hooks/common/useCalendarHeader';
import { useThemeStore } from '@/store/defaults/theme';
import { useAuthStore } from '@/store/auth/auth-session';
import { useGetPrays, useUpdateOldPray } from '@/hooks/prays';
import { format } from 'date-fns';
import { IPrays } from '@/types/prays';
import { getMonthTheme } from '@/styles/calendar.theme';
import DayComponent from '@/components/views/pray-history/day';
import { useLanguage } from '@/hooks/common/useTranslation';
import { setCalendarLocale } from '@/utils/month-names';
import { useTranslation } from 'react-i18next';
import PrevPayUpdateModal from '@/components/views/pray-history/prev-pray-modal';

const today = new Date().toISOString();

type MarkedDateProps = {
  marked: boolean;
  dotColor: string;
  selected: boolean;
  selectedTextColor: string;
  disableTouchEvent?: boolean;
  selectedColor?: string;
};

const MonthScreen = () => {
  const { t } = useTranslation();
  const { currentLanguage } = useLanguage();
  const calendarRef = useRef(null);
  const { colorScheme } = useColorScheme();
  const { colors } = useThemeStore();
  const theme = useMemo(() => getMonthTheme(colors), [colors]);
  const monthControlsCallback = useHeaderMonthControls(calendarRef);
  const { mutateAsync: updateOldPray } = useUpdateOldPray();

  const handleVisibleMonthsChange = useMemo(
    () => debounce(monthControlsCallback, 10),
    [monthControlsCallback]
  );

  const [selected, setSelected] = useState('');
  const { user } = useAuthStore();
  const { data: prays } = useGetPrays(user?.id!, 2025);

  const prayerCountByDate = useMemo(() => {
    if (!prays?.length) return {};
    return prays.reduce(
      (acc, pray: IPrays) => {
        const date = format(new Date(pray.date), 'yyyy-MM-dd');
        const count =
          (pray.fajr ? 1 : 0) +
          (pray.dhuhr ? 1 : 0) +
          (pray.asr ? 1 : 0) +
          (pray.maghrib ? 1 : 0) +
          (pray.isha ? 1 : 0) +
          (pray.nafl ? 1 : 0);
        acc[date] = count;
        return acc;
      },
      {} as Record<string, number>
    );
  }, [prays]);

  const onDayPress = useCallback((day: DateData) => {
    setSelected(day.dateString);
  }, []);

  const marked = useMemo(() => {
    const entries: Record<string, MarkedDateProps> = {};

    // Always mark today
    entries[today] = {
      marked: true,
      dotColor: colors['--secondary'], // Use secondary color for today's dot
      selected: selected === today,
      selectedTextColor: colors['--secondary-foreground'],
    };

    // Mark selected date
    if (selected) {
      entries[selected] = {
        ...(entries[selected] || {}),
        selected: true,
        disableTouchEvent: true,
        selectedColor: colors['--primary'],
        selectedTextColor: colors['--primary-foreground'],
      };
    }

    return entries;
  }, [selected, colors]);

  useEffect(() => {
    setCalendarLocale(currentLanguage as 'en' | 'ru' | 'uz' | 'ar');
  }, [currentLanguage]);

  return (
    <View
      className="safe-area flex-1"
      key={`${colorScheme}-${Date.now()}-${currentLanguage}`}
      style={{ backgroundColor: colors['--background'], paddingBottom: 100, paddingVertical: 10 }}
    >
      <CalendarList
        ref={calendarRef}
        id={`${currentLanguage}-${Date.now()}-${colorScheme}`}
        key={`${currentLanguage}-${Date.now()}-${colorScheme}`}
        current={new Date().toISOString()}
        pastScrollRange={12}
        futureScrollRange={1}
        firstDay={1}
        onVisibleMonthsChange={handleVisibleMonthsChange}
        theme={theme}
        renderHeader={RenderHeader}
        hideDayNames
        calendarHeight={260}
        markedDates={marked}
        extraData={selected}
        scrollEventThrottle={32}
        removeClippedSubviews
        dayComponent={({ date }) => (
          <DayComponent
            date={date}
            prayerCountByDate={prayerCountByDate}
            onDayPress={onDayPress}
            colors={colors}
          />
        )}
      />

      <PrevPayUpdateModal
        selected={selected}
        setSelected={setSelected}
        prays={prays!}
        colors={colors}
      />
    </View>
  );
};

export default MonthScreen;
