/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, { useState } from 'react';
import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
  useColorScheme,
} from 'react-native';
import HomeScreen from './src/screens/HomeScreen';
import LandingScreen from './src/screens/LandingScreen';
import { Colors } from 'react-native/Libraries/NewAppScreen';

function App(): React.JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';
  const [showHome, setShowHome] = useState(false);

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
    flex: 1,
  };

  const handleStartPress = () => {
    setShowHome(true);
  };

  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={backgroundStyle.backgroundColor}
      />
      {showHome ? (
        <HomeScreen />
      ) : (
        <LandingScreen onStartPress={handleStartPress} />
      )}
    </SafeAreaView>
  );
}

export default App;
