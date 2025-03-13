import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Image} from 'react-native';

const LandingScreen = ({onStartPress}) => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>User Information App</Text>
        <Text style={styles.subtitle}>React Native Intern Assignment</Text>
      </View>

      <View style={styles.imageContainer}>
        <Image
          source={{
            uri: 'https://cdn-icons-png.flaticon.com/512/1077/1077114.png',
          }}
          style={styles.image}
          resizeMode="contain"
        />
      </View>

      <View style={styles.descriptionContainer}>
        <Text style={styles.description}>
          This app displays information for 80 users fetched from a public API.
          You can navigate between users using the previous and next buttons.
        </Text>
      </View>

      <TouchableOpacity style={styles.button} onPress={onStartPress}>
        <Text style={styles.buttonText}>Start</Text>
      </TouchableOpacity>

      <Text style={styles.footer}>
        Created as part of Internshala Assignment
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 40,
    paddingHorizontal: 20,
    backgroundColor: '#F5F5F5',
  },
  header: {
    alignItems: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#2196F3',
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    marginTop: 8,
  },
  imageContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    maxHeight: 250,
  },
  image: {
    width: 150,
    height: 150,
  },
  descriptionContainer: {
    marginVertical: 30,
    paddingHorizontal: 10,
  },
  description: {
    fontSize: 16,
    color: '#444',
    textAlign: 'center',
    lineHeight: 22,
  },
  button: {
    backgroundColor: '#2196F3',
    paddingVertical: 15,
    paddingHorizontal: 60,
    borderRadius: 25,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  footer: {
    marginTop: 20,
    fontSize: 12,
    color: '#999',
  },
});

export default LandingScreen;
