import React, {createContext, useContext, useState} from 'react';

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

const ThemeContext = createContext();

export const ThemeProvider = ({children}) => {
  const [isDark, setIsDark] = useState(true);

  const theme = isDark ? themes.dark : themes.light;

  const toggleTheme = () => {
    setIsDark(!isDark);
  };

  return (
    <ThemeContext.Provider value={{theme, isDark, toggleTheme}}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
