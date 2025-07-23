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
    paddingTop: 60,
    paddingBottom: spacing.xxl,
  },
  headerContainer: {
    alignItems: 'center',
    marginBottom: spacing.xxxl,
  },
  logoContainer: {
    width: 75,
    height: 75,
    borderRadius: radius.lg,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.xl,
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
    marginBottom: spacing.xl,
  },
  inputContainer: {
    marginBottom: spacing.xl,
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
  loginButton: {
    ...buttonSizes.extraLarge,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: spacing.xl,
    marginBottom: spacing.xl,
    ...shadows.medium,
  },
  loginButtonDisabled: {
    backgroundColor: colors.text.muted,
    shadowOpacity: 0.1,
  },
  loginButtonText: {
    ...typography.button,
    color: colors.text.white,
    fontSize: 16,
  },
  dividerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: spacing.xl,
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
  registerContainer: {
    alignItems: 'center',
    paddingVertical: spacing.lg,
  },
  registerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  registerLink: {
    backgroundColor: 'transparent',
    paddingVertical: 2,
    paddingHorizontal: 4,
  },
  registerLinkText: {
    ...typography.body,
    color: colors.text.secondary,
    textAlign: 'center',
  },
  registerLinkTextBold: {
    ...typography.bodySemiBold,
    color: colors.primary,
  },
  forgotPasswordLink: {
    ...buttonSizes.medium,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'transparent',
    marginTop: spacing.lg,
  },
  forgotPasswordText: {
    ...typography.bodySmall,
    color: colors.primary,
  },
});