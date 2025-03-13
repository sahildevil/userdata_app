import React from 'react';
import {StyleSheet, View, TouchableOpacity, Text} from 'react-native';

const NavigationButtons = ({
  onPrevious,
  onNext,
  isFirstUser,
  isLastUser,
  currentIndex,
  totalUsers,
}) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={[styles.button, isFirstUser && styles.disabledButton]}
        onPress={onPrevious}
        disabled={isFirstUser}>
        <Text style={styles.buttonText}>Previous</Text>
      </TouchableOpacity>

      <Text style={styles.counter}>
        {currentIndex + 1} / {totalUsers}
      </Text>

      <TouchableOpacity
        style={[styles.button, isLastUser && styles.disabledButton]}
        onPress={onNext}
        disabled={isLastUser}>
        <Text style={styles.buttonText}>Next</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 20,
    paddingHorizontal: 16,
  },
  button: {
    backgroundColor: '#2196F3',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 5,
    minWidth: 100,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  disabledButton: {
    backgroundColor: '#CCCCCC',
  },
  counter: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default NavigationButtons;
