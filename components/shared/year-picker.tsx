import React from 'react';
import DateTimePicker from '@react-native-community/datetimepicker';
import { View } from 'react-native';
import Modal from 'react-native-modal';

interface YearPickerProps {
  value: number;
  onChangeValue: (year: number) => void;
  isVisible: boolean;
  onBackdropPress: () => void;
}

const YearPicker: React.FC<YearPickerProps> = ({
  value,
  onChangeValue,
  isVisible,
  onBackdropPress,
}) => {
  const handleYearChange = (_: any, date?: Date) => {
    if (date) {
      // Only capture the year part and call onChangeValue
      onChangeValue(date.getFullYear());
    }
    onBackdropPress();
  };

  return (
    <Modal
      isVisible={isVisible}
      onBackdropPress={onBackdropPress}
      backdropOpacity={0.5}
    >
      <View className="bg-background rounded-lg p-4 py-6">
        <DateTimePicker
          value={new Date(value, 0)}
          mode="date"
          display="spinner"
          onChange={handleYearChange}
          maximumDate={new Date(2100, 0)}
          minimumDate={new Date(1900, 0)}
          textColor="#000"
        />
      </View>
    </Modal>
  );
};

export default YearPicker;
