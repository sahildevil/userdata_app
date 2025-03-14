import React from 'react';
import {TouchableOpacity, StyleSheet, Text} from 'react-native';
import {useTheme} from '../context/ThemeContext';
import Icon from 'react-native-vector-icons/Feather';

const ThemeToggleButton = () => {
  const {isDark, toggleTheme, theme, isThemeLoaded} = useTheme();
  // Don't render until theme is loaded
  if (!isThemeLoaded) return null;

  return (
    <TouchableOpacity
      style={[styles.button, {backgroundColor: theme.cardBackground}]}
      onPress={toggleTheme}>
      <Icon
        name={isDark ? 'sun' : 'moon'}
        size={20}
        color={isDark ? '#FFFFFF' : '#333333'}
      />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 10,
  },
});

export default ThemeToggleButton;
