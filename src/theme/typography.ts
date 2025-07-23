import { StyleSheet, Platform } from 'react-native';

export const typography = StyleSheet.create({
  h1: {
    fontSize: 32,
    fontWeight: '800',
    lineHeight: 40,
    letterSpacing: -0.5,
    ...Platform.select({
      ios: { fontFamily: 'SF Pro Display' },
      android: { fontFamily: 'Roboto' },
    }),
  },
  h2: {
    fontSize: 24,
    fontWeight: '700',
    lineHeight: 32,
    letterSpacing: -0.3,
    ...Platform.select({
      ios: { fontFamily: 'SF Pro Display' },
      android: { fontFamily: 'Roboto' },
    }),
  },
  h3: {
    fontSize: 20,
    fontWeight: '600',
    lineHeight: 28,
    letterSpacing: -0.2,
    ...Platform.select({
      ios: { fontFamily: 'SF Pro Display' },
      android: { fontFamily: 'Roboto' },
    }),
  },
  h4: {
    fontSize: 18,
    fontWeight: '600',
    lineHeight: 24,
    letterSpacing: -0.1,
    ...Platform.select({
      ios: { fontFamily: 'SF Pro Text' },
      android: { fontFamily: 'Roboto' },
    }),
  },
  header3: {
    fontSize: 20,
    fontWeight: '600',
    lineHeight: 28,
    letterSpacing: -0.2,
    ...Platform.select({
      ios: { fontFamily: 'SF Pro Display' },
      android: { fontFamily: 'Roboto' },
    }),
  },
  bodyBold: {
    fontSize: 16,
    fontWeight: '700',
    lineHeight: 24,
    letterSpacing: 0,
    ...Platform.select({
      ios: { fontFamily: 'SF Pro Text' },
      android: { fontFamily: 'Roboto-Bold' },
    }),
  },
  body: {
    fontSize: 16,
    fontWeight: '400',
    lineHeight: 24,
    letterSpacing: 0,
    ...Platform.select({
      ios: { fontFamily: 'SF Pro Text' },
      android: { fontFamily: 'Roboto' },
    }),
  },
  bodyMedium: {
    fontSize: 16,
    fontWeight: '500',
    lineHeight: 24,
    letterSpacing: 0,
    ...Platform.select({
      ios: { fontFamily: 'SF Pro Text' },
      android: { fontFamily: 'Roboto-Medium' },
    }),
  },
  bodySemiBold: {
    fontSize: 16,
    fontWeight: '600',
    lineHeight: 24,
    letterSpacing: 0,
    ...Platform.select({
      ios: { fontFamily: 'SF Pro Text' },
      android: { fontFamily: 'Roboto-Medium' },
    }),
  },
  bodySmall: {
    fontSize: 14,
    fontWeight: '400',
    lineHeight: 20,
    letterSpacing: 0.1,
    ...Platform.select({
      ios: { fontFamily: 'SF Pro Text' },
      android: { fontFamily: 'Roboto' },
    }),
  },
  caption: {
    fontSize: 12,
    fontWeight: '400',
    lineHeight: 16,
    letterSpacing: 0.2,
    ...Platform.select({
      ios: { fontFamily: 'SF Pro Text' },
      android: { fontFamily: 'Roboto' },
    }),
  },
  captionMedium: {
    fontSize: 12,
    fontWeight: '500',
    lineHeight: 16,
    letterSpacing: 0.2,
    ...Platform.select({
      ios: { fontFamily: 'SF Pro Text' },
      android: { fontFamily: 'Roboto-Medium' },
    }),
  },
  button: {
    fontSize: 16,
    fontWeight: '600',
    lineHeight: 20,
    letterSpacing: 0.1,
    textAlign: 'center',
    ...Platform.select({
      ios: { fontFamily: 'SF Pro Text' },
      android: { fontFamily: 'Roboto-Medium' },
    }),
  },
  buttonSmall: {
    fontSize: 14,
    fontWeight: '600',
    lineHeight: 18,
    letterSpacing: 0.1,
    textAlign: 'center',
    ...Platform.select({
      ios: { fontFamily: 'SF Pro Text' },
      android: { fontFamily: 'Roboto-Medium' },
    }),
  },
});
