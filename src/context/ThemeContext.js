import React, {createContext, useContext, useState, useEffect} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Define theme colors
export const themes = {
  dark: {
    background: '#000000',
    cardBackground: '#000000',
    text: '#FFFFFF',
    textSecondary: '#AAAAAA',
    border: '#333333',
    primary: '#FC3D21',
    disabled: '#444444',
    statusBar: 'light-content',
  },
  light: {
    background: '#FFFFFF',
    cardBackground: '#FFFFFF',
    text: '#333333',
    textSecondary: '#666666',
    border: '#DDDDDD',
    primary: '#FC3D21',
    disabled: '#CCCCCC',
    statusBar: 'dark-content',
  },
};

// Key for storing theme preference
const THEME_PREFERENCE_KEY = 'USER_THEME_PREFERENCE';

const ThemeContext = createContext();

export const ThemeProvider = ({children}) => {
  const [isDark, setIsDark] = useState(true); // Default to dark
  const [isThemeLoaded, setIsThemeLoaded] = useState(false);

  // Load saved theme preference when component mounts
  useEffect(() => {
    const loadThemePreference = async () => {
      try {
        const savedTheme = await AsyncStorage.getItem(THEME_PREFERENCE_KEY);

        // If a theme preference exists, use it
        if (savedTheme !== null) {
          setIsDark(savedTheme === 'dark');
        }
      } catch (error) {
        console.error('Failed to load theme preference:', error);
      } finally {
        setIsThemeLoaded(true);
      }
    };

    loadThemePreference();
  }, []);

  // Toggle theme and save preference
  const toggleTheme = async () => {
    const newThemeValue = !isDark;
    setIsDark(newThemeValue);

    try {
      // Save the new theme preference
      await AsyncStorage.setItem(
        THEME_PREFERENCE_KEY,
        newThemeValue ? 'dark' : 'light',
      );
    } catch (error) {
      console.error('Failed to save theme preference:', error);
    }
  };

  const theme = isDark ? themes.dark : themes.light;

  return (
    <ThemeContext.Provider value={{theme, isDark, toggleTheme, isThemeLoaded}}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
