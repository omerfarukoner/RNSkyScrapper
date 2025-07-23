import { StyleSheet, Dimensions } from 'react-native';
import { colors, typography, spacing, buttonSizes, inputSizes, shadows, radius } from '../../theme';

const { width } = Dimensions.get('window');

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background.secondary,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: spacing.xl,
    paddingTop: 50,
    paddingBottom: spacing.xxl,
  },
  headerContainer: {
    alignItems: 'center',
    marginBottom: spacing.xl,
  },
  logoContainer: {
    width: 65,
    height: 65,
    borderRadius: radius.lg,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.lg,
    ...shadows.medium,
  },
  logoText: {
    ...typography.h2,
    color: colors.text.white,
    fontWeight: '800',
  },
  title: {
    ...typography.h1,
    color: colors.text.primary,
    textAlign: 'center',
    marginBottom: spacing.sm,
  },
  subtitle: {
    ...typography.bodySmall,
    color: colors.text.secondary,
    textAlign: 'center',
    lineHeight: 20,
  },
  form: {
    width: '100%',
    marginBottom: spacing.lg,
  },
  inputContainer: {
    marginBottom: spacing.lg,
    minHeight: 80,
  },
  inputLabel: {
    ...typography.captionMedium,
    color: colors.text.secondary,
    textTransform: 'uppercase',
    marginBottom: spacing.sm,
    letterSpacing: 0.5,
  },
  input: {
    height: 52,
    paddingHorizontal: 20,
    paddingVertical: 14,
    borderRadius: radius.md,
    borderWidth: 2,
    borderColor: colors.border.light,
    backgroundColor: colors.background.primary,
    color: colors.text.primary,
    fontSize: 16,
    fontWeight: '400',
    lineHeight: 20,
    shadowColor: colors.shadow.light,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 1,
    shadowRadius: 3,
    elevation: 2,
  },
  inputFocused: {
    borderColor: colors.primary,
    shadowColor: colors.primary,
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 4,
  },
  inputError: {
    borderColor: '#EF4444',
  },
  errorText: {
    ...typography.captionMedium,
    color: colors.error,
    marginTop: spacing.xs,
    marginLeft: spacing.xs,
    fontSize: 12,
    minHeight: 16,
  },
  registerButton: {
    ...buttonSizes.extraLarge,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: spacing.lg,
    marginBottom: spacing.lg,
    ...shadows.medium,
  },
  registerButtonDisabled: {
    backgroundColor: colors.text.muted,
    shadowOpacity: 0.1,
  },
  registerButtonText: {
    ...typography.button,
    color: colors.text.white,
    fontSize: 16,
  },
  dividerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: spacing.lg,
  },
  divider: {
    flex: 1,
    height: 1,
    backgroundColor: colors.border.light,
  },
  dividerText: {
    ...typography.captionMedium,
    color: colors.text.secondary,
    marginHorizontal: spacing.lg,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  loginContainer: {
    alignItems: 'center',
    paddingVertical: spacing.sm,
  },
  loginRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  loginLink: {
    backgroundColor: 'transparent',
    paddingVertical: 2,
    paddingHorizontal: 4,
  },
  loginLinkText: {
    ...typography.body,
    color: colors.text.secondary,
    textAlign: 'center',
  },
  loginLinkTextBold: {
    ...typography.bodySemiBold,
    color: colors.primary,
  },
});