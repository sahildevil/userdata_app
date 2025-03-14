import React from 'react';
import {View, Text, StyleSheet, ActivityIndicator} from 'react-native';
import {FONTS} from '../styles/typography';

const SplashScreen = () => {
  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color="#FC3D21" />
      <Text style={styles.text}>User Explorer</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000000',
  },
  text: {
    marginTop: 20,
    fontSize: 24,
    fontFamily: FONTS.bold,
    color: '#FFFFFF',
  },
});

export default SplashScreen;
