import React, {useEffect, useRef} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  SafeAreaView,
  Animated,
  Dimensions,
  Easing,
} from 'react-native';
import {FONTS} from '../styles/typography';

const {width, height} = Dimensions.get('window');

// Array of different user icon URLs
const userIcons = [
  'https://img.icons8.com/color/48/000000/user-male-circle--v1.png',
  'https://img.icons8.com/color/48/000000/user-female-circle--v1.png',
  'https://img.icons8.com/color/48/000000/user-male--v1.png',
  'https://img.icons8.com/color/48/000000/user-female--v1.png',
  'https://img.icons8.com/color/48/000000/administrator-male--v1.png',
  'https://img.icons8.com/color/48/000000/administrator-female--v1.png',
  'https://img.icons8.com/color/48/000000/business-man--v1.png',
  'https://img.icons8.com/color/48/000000/businesswoman--v1.png',
];

// Component for a single floating icon
const FloatingIcon = ({iconUrl, initialPosition, delay}) => {
  const posX = useRef(new Animated.Value(initialPosition.x)).current;
  const posY = useRef(new Animated.Value(initialPosition.y)).current;
  const rotation = useRef(new Animated.Value(0)).current;
  const scale = useRef(new Animated.Value(0.7)).current;

  useEffect(() => {
    // Create horizontal movement
    Animated.loop(
      Animated.sequence([
        Animated.timing(posX, {
          toValue: initialPosition.x + (Math.random() * 80 - 40),
          duration: 2000 + Math.random() * 3000,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
        Animated.timing(posX, {
          toValue: initialPosition.x,
          duration: 2000 + Math.random() * 3000,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
      ]),
    ).start();

    // Create vertical movement
    Animated.loop(
      Animated.sequence([
        Animated.timing(posY, {
          toValue: initialPosition.y + (Math.random() * 80 - 40),
          duration: 3000 + Math.random() * 2000,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
        Animated.timing(posY, {
          toValue: initialPosition.y,
          duration: 3000 + Math.random() * 2000,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
      ]),
    ).start();

    // Rotation animation
    Animated.loop(
      Animated.sequence([
        Animated.timing(rotation, {
          toValue: 1,
          duration: 5000 + Math.random() * 5000,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
        Animated.timing(rotation, {
          toValue: 0,
          duration: 5000 + Math.random() * 5000,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
      ]),
    ).start();

    // Initial appear animation with delay
    Animated.sequence([
      Animated.delay(delay),
      Animated.spring(scale, {
        toValue: 1,
        friction: 5,
        tension: 40,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  const spin = rotation.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  return (
    <Animated.View
      style={[
        styles.floatingIcon,
        {
          transform: [
            {translateX: posX},
            {translateY: posY},
            {rotate: spin},
            {scale: scale},
          ],
        },
      ]}>
      <Image source={{uri: iconUrl}} style={styles.iconImage} />
    </Animated.View>
  );
};

const LandingScreen = ({onStartPress}) => {
  // Generate random positions for icons
  const iconPositions = userIcons.map((_, index) => {
    const margin = 60; // Keep icons away from edges
    return {
      icon: userIcons[index % userIcons.length],
      position: {
        x: margin + Math.random() * (width - 2 * margin),
        y: margin + Math.random() * (height - 2 * margin),
      },
      delay: index * 150, // Staggered appearance
    };
  });

  return (
    <SafeAreaView style={styles.container}>
      {/* Floating background icons */}
      {iconPositions.map((icon, index) => (
        <FloatingIcon
          key={`icon-${index}`}
          iconUrl={icon.icon}
          initialPosition={icon.position}
          delay={icon.delay}
        />
      ))}

     

      <View style={styles.content}>
        <View style={styles.imageContainer}>
          {/* <Image
            source={{
              uri: 'https://img.icons8.com/fluency/240/000000/user-group-man-woman.png',
            }}
            style={styles.image}
            resizeMode="contain"
          /> */}
        </View>

        <Text style={styles.title}>Welcome to User Explorer</Text>

        <Text style={styles.description}>
          Discover profiles of 80 different users with detailed information
          including IDs, names, usernames, emails, and more. Navigate through
          the collection with intuitive controls.
        </Text>

        <TouchableOpacity style={styles.startButton} onPress={onStartPress}>
          <Text style={styles.startButtonText}>Start Exploring</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.footer}>
        <Text style={styles.footerText}>
          React Native Internship Assignment
        </Text>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 20,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#333333',
  },
  headerTitle: {
    fontSize: 24,
    fontFamily: FONTS.bold,
    color: '#FFFFFF',
  },
  content: {
    flex: 1,
    paddingHorizontal: 24,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 2, // Make sure content is above floating icons
  },
  imageContainer: {
    marginBottom: 40,
  },
  image: {
    width: 200,
    height: 200,
  },
  title: {
    fontSize: 28,
    fontFamily: FONTS.bold,
    color: '#FFFFFF',
    textAlign: 'center',
    marginBottom: 20,
  },
  description: {
    fontSize: 16,
    fontFamily: FONTS.regular,
    color: '#AAAAAA',
    textAlign: 'center',
    marginBottom: 40,
    lineHeight: 24,
  },
  startButton: {
    backgroundColor: '#FC3D21',
    paddingVertical: 16,
    paddingHorizontal: 48,
    borderRadius: 30,
    shadowColor: '#FF6B00',
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
  },
  startButtonText: {
    color: 'white',
    fontSize: 18,
    fontFamily: FONTS.bold,
  },
  footer: {
    paddingVertical: 20,
    alignItems: 'center',
  },
  footerText: {
    fontSize: 14,
    fontFamily: FONTS.regular,
    color: '#777777',
  },
  floatingIcon: {
    position: 'absolute',
    zIndex: 1, // Below the main content
  },
  iconImage: {
    width: 36,
    height: 36,
    opacity: 0.6, // Semi-transparent
  },
});

export default LandingScreen;