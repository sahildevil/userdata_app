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
} from 'react-native';
import HomeScreen from './src/screens/HomeScreen';
import LandingScreen from './src/screens/LandingScreen';
import { FONTS } from './src/styles/typography';

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

function App(): React.JSX.Element {
  const [showHome, setShowHome] = useState(false);
  const [fontsLoaded, setFontsLoaded] = useState(false);

  // Simulate font loading
  useEffect(() => {
    // In real app, you might check if fonts are loaded here
    setFontsLoaded(true);
  }, []);

  const handleStartPress = () => {
    setShowHome(true);
  };

  if (!fontsLoaded) {
    // Show a loading screen while fonts load
    return (
      <SafeAreaView style={styles.container}>
        <StatusBar
          barStyle="light-content"
          backgroundColor="#000000"
        />
        <Text style={styles.loadingText}>Loading...</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar
        barStyle="light-content"
        backgroundColor="#000000"
      />
      {showHome ? (
        <HomeScreen />
      ) : (
        <LandingScreen onStartPress={handleStartPress} />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
  },
  loadingText: {
    color: '#FFFFFF',
    fontSize: 18,
    textAlign: 'center',
    marginTop: 50,
  }
});

export default App;
