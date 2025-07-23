import { StyleSheet } from 'react-native';
import { colors } from '../../theme';

export default StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.background.primary,
    borderColor: colors.border.light,
    borderWidth: 1,
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 4,
    minHeight: 56,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: colors.text.primary,
    paddingVertical: 16,
  },
  clearButton: {
    padding: 8,
    marginLeft: 8,
    borderRadius: 16,
    backgroundColor: colors.background.secondary,
  },
  clearButtonText: {
    fontSize: 16,
    color: colors.text.secondary,
    fontWeight: 'bold',
  },
});