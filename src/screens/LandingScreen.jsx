import React, {useEffect, useRef, useState} from 'react';
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
  StatusBar,
} from 'react-native';
import {FONTS} from '../styles/typography';
import {useTheme} from '../context/ThemeContext';

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

// Component for a single animated icon that moves out of the screen
const FloatingIcon = ({iconUrl, initialPosition, delay, exitDirection}) => {
  const posX = useRef(new Animated.Value(initialPosition.x)).current;
  const posY = useRef(new Animated.Value(initialPosition.y)).current;
  const rotation = useRef(new Animated.Value(0)).current;
  const scale = useRef(new Animated.Value(0)).current;
  const opacity = useRef(new Animated.Value(0)).current;

  // Calculate exit position based on direction
  const getExitPosition = () => {
    switch (exitDirection) {
      case 'top':
        return {x: initialPosition.x, y: -100};
      case 'bottom':
        return {x: initialPosition.x, y: height + 100};
      case 'left':
        return {x: -100, y: initialPosition.y};
      case 'right':
        return {x: width + 100, y: initialPosition.y};
      default:
        // Random diagonal exit
        const randomCorner = Math.floor(Math.random() * 4);
        switch (randomCorner) {
          case 0:
            return {x: -100, y: -100}; // top-left
          case 1:
            return {x: width + 100, y: -100}; // top-right
          case 2:
            return {x: -100, y: height + 100}; // bottom-left
          case 3:
            return {x: width + 100, y: height + 100}; // bottom-right
        }
    }
  };

  const exitPos = getExitPosition();

  useEffect(() => {
    // First fade in and scale up
    const appearAnimation = Animated.parallel([
      Animated.timing(opacity, {
        toValue: 0.7,
        duration: 800,
        delay,
        useNativeDriver: true,
      }),
      Animated.spring(scale, {
        toValue: 1,
        friction: 6,
        tension: 40,
        delay,
        useNativeDriver: true,
      }),
    ]);

    // Then move to exit position with rotation
    const exitAnimation = Animated.parallel([
      // X movement
      Animated.timing(posX, {
        toValue: exitPos.x,
        duration: 3000 + Math.random() * 2000,
        easing: Easing.inOut(Easing.ease),
        delay: 1500 + Math.random() * 2000, // Random delay before exit
        useNativeDriver: true,
      }),
      // Y movement
      Animated.timing(posY, {
        toValue: exitPos.y,
        duration: 3000 + Math.random() * 2000,
        easing: Easing.inOut(Easing.ease),
        delay: 1500 + Math.random() * 2000, // Random delay before exit
        useNativeDriver: true,
      }),
      // Rotation during exit
      Animated.timing(rotation, {
        toValue: 1,
        duration: 3000 + Math.random() * 2000,
        easing: Easing.inOut(Easing.ease),
        delay: 1500 + Math.random() * 2000, // Same delay as movement
        useNativeDriver: true,
      }),
      // Fade out during exit
      Animated.timing(opacity, {
        toValue: 0,
        duration: 1500,
        delay: 3000 + Math.random() * 2000, // Start fade out near end of movement
        useNativeDriver: true,
      }),
    ]);

    // Run animations in sequence
    Animated.sequence([appearAnimation, exitAnimation]).start();
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
          opacity,
          transform: [
            {translateX: posX},
            {translateY: posY},
            {rotate: spin},
            {scale: scale},
          ],
          left: 0, // Position will be handled by translateX
          top: 0, // Position will be handled by translateY
        },
      ]}>
      <Image source={{uri: iconUrl}} style={styles.iconImage} />
    </Animated.View>
  );
};

const LandingScreen = ({onStartPress}) => {
  const {theme} = useTheme();
  const [iconSet, setIconSet] = useState([]);

  // Generate a new set of icons for animation every 6 seconds
  useEffect(() => {
    // Generate initial set
    generateNewIconSet();

    // Set up interval to regenerate icons
    const intervalId = setInterval(() => {
      generateNewIconSet();
    }, 6000);

    return () => clearInterval(intervalId);
  }, []);

  // Function to generate a new set of icons
  const generateNewIconSet = () => {
    const newIcons = [];
    const iconCount = 8; // Total icons per set

    for (let i = 0; i < iconCount; i++) {
      // Randomly position icons around the edge of the screen
      const side = Math.floor(Math.random() * 4); // 0=top, 1=right, 2=bottom, 3=left
      let position, exitDirection;

      switch (side) {
        case 0: // Top
          position = {
            x: Math.random() * width,
            y: -20,
          };
          exitDirection = 'bottom';
          break;
        case 1: // Right
          position = {
            x: width + 20,
            y: Math.random() * height,
          };
          exitDirection = 'left';
          break;
        case 2: // Bottom
          position = {
            x: Math.random() * width,
            y: height + 20,
          };
          exitDirection = 'top';
          break;
        case 3: // Left
          position = {
            x: -20,
            y: Math.random() * height,
          };
          exitDirection = 'right';
          break;
      }

      newIcons.push({
        id: `icon-${Date.now()}-${i}`,
        icon: userIcons[i % userIcons.length],
        position,
        delay: i * 200,
        exitDirection,
      });
    }

    // Add new icons to existing set (they'll animate out automatically)
    setIconSet(prev => [...prev, ...newIcons]);

    // Clean up old icons after they've animated out (after 10 seconds)
    setTimeout(() => {
      setIconSet(prev =>
        prev.filter(
          icon => icon.id.startsWith(`icon-${Date.now() - 10000}`) === false,
        ),
      );
    }, 10000);
  };

  return (
    <SafeAreaView
      style={[styles.container, {backgroundColor: theme.background}]}>
      <StatusBar
        barStyle={theme.statusBar}
        backgroundColor={theme.background}
        translucent={true}
      />

      {/* Content */}
      <View style={styles.content}>
        <View style={styles.imageContainer}>
          <Image
            source={{
              uri: 'https://static.vecteezy.com/system/resources/previews/035/727/704/non_2x/3d-realistic-person-or-people-user-social-network-icon-3d-rendering-illustration-vector.jpg',
            }}
            style={styles.image}
            resizeMode="contain"
          />
        </View>

        <Text style={[styles.title, {color: theme.text}]}>
          Welcome to User Explorer
        </Text>

        <Text style={[styles.description, {color: theme.textSecondary}]}>
          Discover profiles of 80 different users with detailed information
          including IDs, names, usernames, emails, and more. Navigate through
          the collection with intuitive controls.
        </Text>

        <TouchableOpacity style={styles.startButton} onPress={onStartPress}>
          <Text style={styles.startButtonText}>Start Exploring</Text>
        </TouchableOpacity>
      </View>

      {/* Floating background icons */}
      {iconSet.map(icon => (
        <FloatingIcon
          key={icon.id}
          iconUrl={icon.icon}
          initialPosition={icon.position}
          delay={icon.delay}
          exitDirection={icon.exitDirection}
        />
      ))}

      <View style={styles.footer}>
        <Text style={[styles.footerText, {color: theme.textSecondary}]}>
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
  content: {
    flex: 1,
    paddingHorizontal: 24,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 2,
  },
  imageContainer: {
    marginBottom: 40,
  },
  image: {
    width: 200,
    height: 200,
    borderRadius: 100,
    borderWidth: 4,
    borderColor: '#FC3D21',
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
    zIndex: 1,
  },
  iconImage: {
    width: 36,
    height: 36,
    opacity: 0.7,
  },
});

export default LandingScreen;
