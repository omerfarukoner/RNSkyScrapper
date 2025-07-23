import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Modal, ScrollView, Dimensions } from 'react-native';
import { colors } from '../../theme';
import { strings } from '../../constants';
import styles from './DateRangePicker.styles';

interface DateRangePickerProps {
  visible: boolean;
  onClose: () => void;
  onDateSelect: (date: Date, isReturn?: boolean) => void;
  selectedDepartureDate?: Date;
  selectedReturnDate?: Date | null;
  isRoundTrip: boolean;
}

const DateRangePicker: React.FC<DateRangePickerProps> = ({
  visible,
  onClose,
  onDateSelect,
  selectedDepartureDate,
  selectedReturnDate,
  isRoundTrip,
}) => {
  const [currentMonth, setCurrentMonth] = useState(() => {
    return selectedDepartureDate || new Date();
  });
  const [selectingReturn, setSelectingReturn] = useState(false);

  React.useEffect(() => {
    if (visible) {
      if (!isRoundTrip && selectedDepartureDate) {
        setCurrentMonth(new Date(selectedDepartureDate.getFullYear(), selectedDepartureDate.getMonth(), 1));
      } else if (isRoundTrip && selectingReturn && selectedReturnDate) {
        setCurrentMonth(new Date(selectedReturnDate.getFullYear(), selectedReturnDate.getMonth(), 1));
      } else if (selectedDepartureDate) {
        setCurrentMonth(new Date(selectedDepartureDate.getFullYear(), selectedDepartureDate.getMonth(), 1));
      } else {
        setCurrentMonth(new Date());
      }
      
      if (!isRoundTrip) {
        setSelectingReturn(false);
      }
    }
  }, [visible, selectedDepartureDate, selectedReturnDate, isRoundTrip, selectingReturn]);

  const getDaysInMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
  };

  const formatMonthYear = (date: Date) => {
    return date.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
  };

  const isSameDay = (date1: Date, date2?: Date | null) => {
    if (!date2) return false;
    return date1.getDate() === date2.getDate() &&
           date1.getMonth() === date2.getMonth() &&
           date1.getFullYear() === date2.getFullYear();
  };

  const isInRange = (date: Date) => {
    if (!selectedDepartureDate || !selectedReturnDate) return false;
    return date >= selectedDepartureDate && date <= selectedReturnDate;
  };

  const isPastDate = (date: Date) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return date < today;
  };

  const handleDatePress = (day: number) => {
    const selectedDate = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day);
    
    if (isPastDate(selectedDate)) return;

    if (!isRoundTrip) {
      onDateSelect(selectedDate, false);
      onClose();
      return;
    }

    if (!selectingReturn && !selectedDepartureDate) {
      onDateSelect(selectedDate);
      setSelectingReturn(true);
    } else if (!selectingReturn && selectedDepartureDate) {
      onDateSelect(selectedDate);
      setSelectingReturn(true);
    } else {
      if (selectedDepartureDate && selectedDate <= selectedDepartureDate) {
        onDateSelect(selectedDate);
        setSelectingReturn(true);
      } else {
        onDateSelect(selectedDate, true);
        onClose();
      }
    }
  };

  const navigateMonth = (direction: 'prev' | 'next') => {
    const newMonth = new Date(currentMonth);
    if (direction === 'prev') {
      newMonth.setMonth(newMonth.getMonth() - 1);
    } else {
      newMonth.setMonth(newMonth.getMonth() + 1);
    }
    setCurrentMonth(newMonth);
  };

  const renderCalendar = () => {
    const daysInMonth = getDaysInMonth(currentMonth);
    const firstDay = getFirstDayOfMonth(currentMonth);
    const days = [];

    for (let i = 0; i < firstDay; i++) {
      days.push(<View key={`empty-${i}`} style={styles.emptyDay} />);
    }

    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day);
      const isSelected = isSameDay(date, selectedDepartureDate) || (isRoundTrip && isSameDay(date, selectedReturnDate));
      const isInDateRange = isRoundTrip ? isInRange(date) : false;
      const isPast = isPastDate(date);
      const isDeparture = isSameDay(date, selectedDepartureDate);
      const isReturn = isRoundTrip && isSameDay(date, selectedReturnDate);

      days.push(
        <TouchableOpacity
          key={day}
          style={[
            styles.dayButton,
            isSelected && styles.selectedDay,
            isInDateRange && !isSelected && styles.inRangeDay,
            isPast && styles.pastDay,
            isDeparture && styles.departureDay,
            isReturn && styles.returnDay,
          ]}
          onPress={() => handleDatePress(day)}
          disabled={isPast}
          activeOpacity={0.7}
        >
          <Text
            style={[
              styles.dayText,
              isSelected && styles.selectedDayText,
              isInDateRange && !isSelected && styles.inRangeDayText,
              isPast && styles.pastDayText,
            ]}
          >
            {day}
          </Text>
        </TouchableOpacity>
      );
    }

    return days;
  };

  const renderHeader = () => {
    return (
      <View style={styles.header}>
        <TouchableOpacity style={styles.navButton} onPress={() => navigateMonth('prev')} activeOpacity={0.7}>
          <Text style={styles.navButtonText}>‹</Text>
        </TouchableOpacity>
        <Text style={styles.monthText}>{formatMonthYear(currentMonth)}</Text>
        <TouchableOpacity style={styles.navButton} onPress={() => navigateMonth('next')} activeOpacity={0.7}>
          <Text style={styles.navButtonText}>›</Text>
        </TouchableOpacity>
      </View>
    );
  };

  const renderWeekDays = () => {
    const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    return (
      <View style={styles.weekDaysContainer}>
        {weekDays.map((day) => (
          <Text key={day} style={styles.weekDayText}>
            {day}
          </Text>
        ))}
      </View>
    );
  };

  return (
    <Modal visible={visible} animationType="slide" transparent>
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>
              {isRoundTrip 
                ? (selectingReturn ? 'Select Return Date' : 'Select Departure Date')
                : 'Select Date'
              }
            </Text>
            <TouchableOpacity onPress={onClose} activeOpacity={0.7}>
              <Text style={styles.closeButton}>×</Text>
            </TouchableOpacity>
          </View>

          {isRoundTrip && (
            <View style={styles.selectionInfo}>
              <Text style={styles.selectionInfoText}>
                {selectedDepartureDate 
                  ? `Departure: ${selectedDepartureDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}`
                  : 'Select departure date first'
                }
              </Text>
              {selectedReturnDate && (
                <Text style={styles.selectionInfoText}>
                  Return: {selectedReturnDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                </Text>
              )}
            </View>
          )}

          <ScrollView style={styles.calendarContainer} showsVerticalScrollIndicator={false}>
            {renderHeader()}
            {renderWeekDays()}
            <View style={styles.daysGrid}>
              {renderCalendar()}
            </View>
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
};

export default DateRangePicker;