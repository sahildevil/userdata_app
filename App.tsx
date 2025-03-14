/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, { useState, useEffect } from 'react';
import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  View,
  ActivityIndicator,
} from 'react-native';
import HomeScreen from './src/screens/HomeScreen';
import LandingScreen from './src/screens/LandingScreen';
import { FONTS } from './src/styles/typography';
import { ThemeProvider, useTheme } from './src/context/ThemeContext';

// Override default text styles globally
Text.defaultProps = {
  ...(Text.defaultProps || {}),
  style: { fontFamily: FONTS.regular }
};

// Override default TextInput styles globally
TextInput.defaultProps = {
  ...(TextInput.defaultProps || {}),
  style: { fontFamily: FONTS.regular }
};

// App content component (inside ThemeProvider)
const AppContent = () => {
  const [showHome, setShowHome] = useState(false);
  const [fontsLoaded, setFontsLoaded] = useState(false);
  const { isThemeLoaded, theme } = useTheme();

  // Simulate font loading
  useEffect(() => {
    setFontsLoaded(true);
  }, []);

  const handleStartPress = () => {
    setShowHome(true);
  };

  // Show loading screen while fonts or theme is loading
  if (!fontsLoaded || !isThemeLoaded) {
    return (
      <View style={[styles.loadingContainer, { backgroundColor: theme?.background || '#000000' }]}>
        <ActivityIndicator size="large" color="#FC3D21" />
        <Text style={styles.loadingText}>Loading...</Text>
      </View>
    );
  }

  return showHome ? (
    <HomeScreen />
  ) : (
    <LandingScreen onStartPress={handleStartPress} />
  );
};

function App(): React.JSX.Element {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
}

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 16,
    fontSize: 16,
    color: '#FFFFFF',
    fontFamily: FONTS.regular,
  }
});

export default App;
