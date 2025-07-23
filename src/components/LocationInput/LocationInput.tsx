import React, { memo } from 'react';
import { TextInput, View, TouchableOpacity, Text } from 'react-native';
import styles from './LocationInput.styles';
import { colors } from '../../theme';
import { strings } from '../../constants';

interface LocationInputProps {
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
}

const LocationInput: React.FC<LocationInputProps> = ({
  value,
  onChangeText,
  placeholder = 'Enter location',
}) => {
  const handleClearText = () => {
    onChangeText('');
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder={placeholder}
        placeholderTextColor={colors.text.secondary}
        value={value}
        onChangeText={onChangeText}
        autoCapitalize="words"
        autoCorrect={false}
        returnKeyType="next"
      />
      {value.length > 0 && (
        <TouchableOpacity style={styles.clearButton} onPress={handleClearText} activeOpacity={0.7}>
          <Text style={styles.clearButtonText}>{strings.ui.closeButton}</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

export default memo(LocationInput);