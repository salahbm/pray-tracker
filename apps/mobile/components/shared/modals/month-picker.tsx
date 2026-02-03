import React, { useState } from 'react';
import { Modal, View, TouchableOpacity, ScrollView } from 'react-native';
import { useTranslation } from 'react-i18next';
import { format } from 'date-fns';
import * as allLocales from 'date-fns/locale';

import { Text } from '@/components/ui/text';
import { Button } from '@/components/ui/button';
import { useThemeStore } from '@/store/defaults/theme';
import { useLanguage } from '@/hooks/common/useTranslation';

interface MonthPickerProps {
  visible: boolean;
  value: Date;
  minYear?: number;
  onConfirm: (date: Date) => void;
  onCancel: () => void;
}

const localeMap: { [key: string]: any } = {
  en: allLocales.enUS,
  uz: allLocales.uz,
  ru: allLocales.ru,
  tr: allLocales.tr,
};

const MonthPicker: React.FC<MonthPickerProps> = ({
  visible,
  value,
  minYear = 1980,
  onConfirm,
  onCancel,
}) => {
  const { t } = useTranslation();
  const { colors } = useThemeStore();
  const { currentLanguage } = useLanguage();
  const [selectedDate, setSelectedDate] = useState(value);

  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: currentYear - minYear + 1 }, (_, i) => currentYear - i);
  const months = Array.from({ length: 12 }, (_, i) => i);

  const selectedLocale = localeMap[currentLanguage] || allLocales.enUS;

  const handleMonthSelect = (month: number) => {
    const newDate = new Date(selectedDate.getFullYear(), month, 1);
    setSelectedDate(newDate);
  };

  const handleYearSelect = (year: number) => {
    const newDate = new Date(year, selectedDate.getMonth(), 1);
    setSelectedDate(newDate);
  };

  const handleConfirm = () => {
    onConfirm(selectedDate);
  };

  return (
    <Modal visible={visible} animationType="fade" transparent>
      <View className="flex-1 justify-center items-center bg-black/40">
        <View className="w-11/12 rounded-xl p-6 border border-border bg-muted">
          <Text className="text-xl font-heading mb-4 text-center">{t('common.selectMonth')}</Text>

          {/* Month Grid */}
          <View className="mb-4">
            <Text className="text-sm font-medium mb-2 text-muted-foreground">
              {t('common.month')}
            </Text>
            <View className="flex-row flex-wrap gap-2">
              {months.map(month => {
                const monthName = format(new Date(2000, month, 1), 'MMM', {
                  locale: selectedLocale,
                });
                const isSelected = selectedDate.getMonth() === month;

                return (
                  <TouchableOpacity
                    key={month}
                    onPress={() => handleMonthSelect(month)}
                    className="rounded-lg px-4 py-2"
                    style={{
                      backgroundColor: isSelected ? colors['--primary'] : colors['--muted'],
                      minWidth: '22%',
                    }}
                  >
                    <Text
                      className="text-center capitalize"
                      style={{
                        color: isSelected ? colors['--primary-foreground'] : colors['--foreground'],
                      }}
                    >
                      {monthName}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </View>
          </View>

          {/* Year Scroll */}
          <View className="mb-6">
            <Text className="text-sm font-medium mb-2 text-muted-foreground">
              {t('common.year')}
            </Text>
            <ScrollView
              className="max-h-40"
              showsVerticalScrollIndicator={false}
              contentContainerStyle={{ gap: 8 }}
            >
              {years.map(year => {
                const isSelected = selectedDate.getFullYear() === year;

                return (
                  <TouchableOpacity
                    key={year}
                    onPress={() => handleYearSelect(year)}
                    className="rounded-lg px-4 py-3"
                    style={{
                      backgroundColor: isSelected ? colors['--primary'] : colors['--muted'],
                    }}
                  >
                    <Text
                      className="text-center font-medium"
                      style={{
                        color: isSelected ? colors['--primary-foreground'] : colors['--foreground'],
                      }}
                    >
                      {year}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </ScrollView>
          </View>

          {/* Actions */}
          <View className="flex-row gap-3">
            <Button variant="outline" className="flex-1" onPress={onCancel}>
              <Text>{t('common.cancel')}</Text>
            </Button>
            <Button className="flex-1" onPress={handleConfirm}>
              <Text className="text-primary-foreground">{t('common.confirm')}</Text>
            </Button>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default MonthPicker;
