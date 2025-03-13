import React, {useEffect, useRef} from 'react';
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  Animated,
  Dimensions,
  Image,
  TouchableOpacity,
} from 'react-native';
import UserAvatar from './UserAvatar';
import {FONTS} from '../styles/typography';

const {width} = Dimensions.get('window');

const UserCard = ({user, animationDirection = 0}) => {
  if (!user) return null;

  // Create animated values
  const translateX = useRef(
    new Animated.Value(animationDirection * width),
  ).current;
  const opacity = useRef(new Animated.Value(0)).current;

  // Trigger animation when component mounts or when user changes
  useEffect(() => {
    // Reset position based on direction
    translateX.setValue(animationDirection * width);

    // Run animations in parallel
    Animated.parallel([
      // Slide animation
      Animated.spring(translateX, {
        toValue: 0,
        friction: 8,
        tension: 40,
        useNativeDriver: true,
      }),
      // Fade in animation
      Animated.timing(opacity, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }),
    ]).start();
  }, [user, animationDirection, translateX, opacity]);

  return (
    <Animated.View
      style={[
        styles.animatedContainer,
        {
          opacity,
          transform: [{translateX}],
        },
      ]}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {/* Profile Image */}
        <View style={styles.profileImageContainer}>
          <Image
            source={{uri: user.avatar}}
            style={styles.profileImage}
            resizeMode="cover"
          />
        </View>

        {/* Profile Info */}
        <Text style={styles.name}>
          {user.first_name} {user.last_name}
        </Text>
        <Text style={styles.username}>@{user.username}</Text>

        {/* Details Grid */}
        <View style={styles.detailsContainer}>
          <View style={styles.detailsRow}>
            <View style={styles.detailBox}>
              <Text style={styles.detailLabel}>ID</Text>
              <Text style={styles.detailValue}>{user.id}</Text>
            </View>
            <View style={styles.detailBox}>
              <Text style={styles.detailLabel}>UID</Text>
              <Text style={styles.detailValue}>{user.uid}</Text>
            </View>
          </View>

          <View style={styles.detailsRow}>
            <View style={styles.detailBox}>
              <Text style={styles.detailLabel}>First Name</Text>
              <Text style={styles.detailValue}>{user.first_name}</Text>
            </View>
            <View style={styles.detailBox}>
              <Text style={styles.detailLabel}>Last Name</Text>
              <Text style={styles.detailValue}>{user.last_name}</Text>
            </View>
          </View>

          <View style={styles.detailsRow}>
            <View style={styles.detailBox}>
              <Text style={styles.detailLabel}>Username</Text>
              <Text style={styles.detailValue}>{user.username}</Text>
            </View>
            <View style={styles.detailBox}>
              <Text style={styles.detailLabel}>Password</Text>
              <Text style={styles.detailValue}>{user.password}</Text>
            </View>
          </View>

          <View style={styles.detailsRow}>
            <View style={[styles.detailBox, {width: '100%'}]}>
              <Text style={styles.detailLabel}>Email</Text>
              <Text style={styles.detailValue}>{user.email}</Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  animatedContainer: {
    flex: 1,
    width: '100%',
  },
  scrollContainer: {
    paddingHorizontal: 16,
    paddingBottom: 30,
  },
  profileImageContainer: {
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 20,
  },
  profileImage: {
    width: 160,
    height: 160,
    borderRadius: 80,
    backgroundColor: '#333',
    borderWidth: 3,
    borderColor: '#FC3D21',
  },
  name: {
    fontSize: 28,
    fontFamily: FONTS.bold,
    color: '#FFFFFF',
    textAlign: 'center',
  },
  jobTitle: {
    fontSize: 16,
    fontFamily: FONTS.regular,
    color: '#999',
    marginTop: 4,
    marginBottom: 24,
    textAlign: 'center',
  },
  username: {
    fontSize: 16,
    fontFamily: FONTS.regular,
    color: '#777',
    marginTop: 4,
    marginBottom: 24,
    textAlign: 'center',
  },
  detailsContainer: {
    marginBottom: 30,
  },
  detailsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  detailBox: {
    width: '48%',
    backgroundColor: '#000000',
    borderRadius: 12,
    borderWidth:0.5,
    borderColor:'white',
    padding: 16,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  detailLabel: {
    fontSize: 12,
    fontFamily: FONTS.regular,
    color: '#777',
    marginBottom: 6,
  },
  detailValue: {
    fontSize: 14,
    fontFamily: FONTS.bold,
    color: '#FFFFFF',
  },
  teamsSectionTitle: {
    fontSize: 24,
    fontFamily: FONTS.bold,
    color: '#FFFFFF',
    marginBottom: 16,
  },
});

export default UserCard;
