import {StyleSheet} from 'react-native';

export const FONTS = {
  regular: 'SpaceMono-Regular',
  bold: 'SpaceMono-Bold',
  italic: 'SpaceMono-Italic',
  boldItalic: 'SpaceMono-BoldItalic',
};

export const typography = StyleSheet.create({
  h1: {
    fontFamily: FONTS.bold,
    fontSize: 28,
    lineHeight: 36,
  },
  h2: {
    fontFamily: FONTS.bold,
    fontSize: 24,
    lineHeight: 32,
  },
  h3: {
    fontFamily: FONTS.bold,
    fontSize: 20,
    lineHeight: 28,
  },
  body1: {
    fontFamily: FONTS.regular,
    fontSize: 16,
    lineHeight: 24,
  },
  body2: {
    fontFamily: FONTS.regular,
    fontSize: 14,
    lineHeight: 20,
  },
  caption: {
    fontFamily: FONTS.regular,
    fontSize: 12,
    lineHeight: 16,
  },
  button: {
    fontFamily: FONTS.bold,
    fontSize: 16,
    lineHeight: 24,
  },
});
