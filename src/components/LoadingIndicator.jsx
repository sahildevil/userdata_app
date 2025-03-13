import React from 'react';
import {View, Text, ActivityIndicator, StyleSheet} from 'react-native';
import {useTheme} from '../context/ThemeContext';
import {FONTS} from '../styles/typography';

const LoadingIndicator = ({message}) => {
  const {theme} = useTheme();

  return (
    <View style={[styles.container, {backgroundColor: theme.background}]}>
      <ActivityIndicator size="large" color={theme.primary} />
      <Text style={[styles.message, {color: theme.text}]}>
        {message || 'Loading...'}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  message: {
    marginTop: 20,
    fontSize: 16,
    fontFamily: FONTS.regular,
    textAlign: 'center',
  },
});

export default LoadingIndicator;
