import { StyleSheet, Dimensions } from 'react-native';
import { colors, typography, spacing } from '../../theme';

const { width, height } = Dimensions.get('window');

export default StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: colors.background.primary,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    height: height * 0.75,
    paddingBottom: 34,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: spacing.xl,
    paddingVertical: spacing.lg,
    borderBottomWidth: 1,
    borderBottomColor: colors.border.light,
  },
  modalTitle: {
    ...typography.h2,
    color: colors.text.primary,
    fontWeight: '600',
  },
  closeButton: {
    ...typography.h1,
    color: colors.text.secondary,
    fontSize: 28,
    fontWeight: '300',
  },
  selectionInfo: {
    paddingHorizontal: spacing.xl,
    paddingVertical: spacing.md,
    backgroundColor: colors.background.secondary,
  },
  selectionInfoText: {
    ...typography.bodySmall,
    color: colors.text.secondary,
    marginBottom: 4,
  },
  calendarContainer: {
    flex: 1,
    paddingBottom: spacing.xl,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: spacing.xl,
    paddingVertical: spacing.lg,
  },
  navButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: colors.background.secondary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  navButtonText: {
    fontSize: 24,
    color: colors.primary,
    fontWeight: '600',
  },
  monthText: {
    ...typography.h3,
    color: colors.text.primary,
    fontWeight: '600',
  },
  weekDaysContainer: {
    flexDirection: 'row',
    paddingHorizontal: spacing.xl,
    marginBottom: spacing.sm,
  },
  weekDayText: {
    ...typography.captionMedium,
    color: colors.text.secondary,
    flex: 1,
    textAlign: 'center',
    fontWeight: '500',
  },
  daysGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: spacing.xl,
    paddingBottom: spacing.xl,
  },
  dayButton: {
    width: (width - spacing.xl * 2) / 7,
    height: 48,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 4,
  },
  emptyDay: {
    width: (width - spacing.xl * 2) / 7,
    height: 48,
  },
  selectedDay: {
    backgroundColor: colors.primary,
    borderRadius: 24,
  },
  departureDay: {
    backgroundColor: colors.primary,
    borderTopLeftRadius: 24,
    borderBottomLeftRadius: 24,
    borderTopRightRadius: 4,
    borderBottomRightRadius: 4,
  },
  returnDay: {
    backgroundColor: colors.primary,
    borderTopLeftRadius: 4,
    borderBottomLeftRadius: 4,
    borderTopRightRadius: 24,
    borderBottomRightRadius: 24,
  },
  inRangeDay: {
    backgroundColor: colors.primaryLight,
    borderRadius: 0,
  },
  pastDay: {
    opacity: 0.3,
  },
  dayText: {
    ...typography.body,
    color: colors.text.primary,
    fontWeight: '500',
  },
  selectedDayText: {
    color: colors.text.white,
    fontWeight: '600',
  },
  inRangeDayText: {
    color: colors.primary,
    fontWeight: '500',
  },
  pastDayText: {
    color: colors.text.muted,
  },
});