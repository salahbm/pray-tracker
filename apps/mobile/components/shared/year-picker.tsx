import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Dimensions, StyleSheet, View } from 'react-native';

import { useThemeStore } from '@/store/defaults/theme';

import { Button } from '../ui/button';
import { Text } from '../ui/text';
import Modal from './modal';

interface YearPickerProps {
  value: number;
  onChangeValue: (year: number) => void;
  isVisible: boolean;
  onBackdropPress: () => void;
  minYear?: number;
}

const YearPicker: React.FC<YearPickerProps> = ({
  value,
  onChangeValue,
  isVisible,
  onBackdropPress,
  minYear = 1900,
}) => {
  const { t } = useTranslation();
  const currentYear = new Date().getFullYear();
  const { colors } = useThemeStore();
  const years = Array.from(
    { length: currentYear - minYear + 1 },
    (_, i) => (minYear + i).toString() // Convert years to strings
  );

  const [localSelectedYear, setLocalSelectedYear] = useState(value.toString()); // Store as string

  return (
    <Modal isVisible={isVisible} onBackdropPress={onBackdropPress}>
      <View style={styles.modalContainer} className="bg-muted">
        <Text style={styles.title}>{t('Commons.YearPicker.Title')}</Text>
        <View style={styles.pickerContainer}>
          {/* <Picker
            selectedValue={localSelectedYear}
            onValueChange={itemValue => setLocalSelectedYear(itemValue)}
            style={styles.picker}
            itemStyle={[styles.pickerItem, { color: colors['--foreground'] }]}
            mode="dropdown"
            dropdownIconColor={colors['--primary']}
          >
            {years.map(year => (
              <Picker.Item key={year} label={year} value={year} />
            ))}
          </Picker> */}
        </View>
        <View className="flex-row flex gap-2 mt-8 justify-end">
          <Button onPress={onBackdropPress} variant="destructive">
            <Text>{t('Commons.YearPicker.Cancel')}</Text>
          </Button>
          <Button
            onPress={() => {
              onChangeValue(Number(localSelectedYear)); // Convert back to number
              onBackdropPress();
            }}
          >
            <Text>{t('Commons.YearPicker.Confirm')}</Text>
          </Button>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    borderRadius: 10,
    padding: 20,
  },
  picker: {
    height: '100%',
    width: '100%',
  },
  pickerContainer: {
    alignItems: 'center',
    borderRadius: 10,
    height: 150,
    justifyContent: 'center',
    width: Dimensions.get('window').width * 0.8,
  },
  pickerItem: {
    fontSize: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
    textAlign: 'left',
  },
});

export default YearPicker;
