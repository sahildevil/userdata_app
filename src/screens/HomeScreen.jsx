import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native';
import useUserData from '../hooks/useUserData';
import LoadingIndicator from '../components/LoadingIndicator';
import UserCard from '../components/UserCard';
import NavigationButtons from '../components/NavigationButtons';
import {FONTS} from '../styles/typography';

const HomeScreen = () => {
  const {
    currentUser,
    currentUserIndex,
    totalUsers,
    goToNextUser,
    goToPreviousUser,
    loading,
    loadingMore,
    error,
    isFirstUser,
    isLastUser,
  } = useUserData();

  // Track direction of navigation for animation
  const [animationDirection, setAnimationDirection] = useState(0);
  // Track current user to detect changes
  const [previousUserIndex, setPreviousUserIndex] = useState(null);

  // Update animation direction when user changes
  useEffect(() => {
    if (previousUserIndex !== null) {
      if (currentUserIndex > previousUserIndex) {
        setAnimationDirection(1); // Coming from right
      } else if (currentUserIndex < previousUserIndex) {
        setAnimationDirection(-1); // Coming from left
      }
    }
    setPreviousUserIndex(currentUserIndex);
  }, [currentUserIndex, previousUserIndex]);

  // Custom navigation handlers
  const handleNextUser = () => {
    setAnimationDirection(1); // Slide from right
    goToNextUser();
  };

  const handlePreviousUser = () => {
    setAnimationDirection(-1); // Slide from left
    goToPreviousUser();
  };

  if (loading) {
    return <LoadingIndicator message="Loading users..." />;
  }

  if (error) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>{error}</Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>User Data</Text>
        <View style={styles.headerRight}>
          <View style={styles.userCountContainer}>
            <Text style={styles.userCount}>
              {currentUserIndex + 1}/{totalUsers}
            </Text>
          </View>
        </View>
      </View>

      {loadingMore && (
        <Text style={styles.loadingMoreText}>Loading more users...</Text>
      )}

      <View style={styles.cardContainer}>
        <UserCard user={currentUser} animationDirection={animationDirection} />
      </View>

      <View style={styles.navigationContainer}>
        <TouchableOpacity
          style={[styles.navButton, isFirstUser && styles.disabledButton]}
          onPress={handlePreviousUser}
          disabled={isFirstUser}>
          <Text style={styles.navButtonText}>Previous</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.navButton, isLastUser && styles.disabledButton]}
          onPress={handleNextUser}
          disabled={isLastUser}>
          <Text style={styles.navButtonText}>Next</Text>
        </TouchableOpacity>
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
    justifyContent: 'space-between',
    paddingVertical: 16,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#333',
  },
  headerTitle: {
    fontSize: 24,
    fontFamily: FONTS.bold,
    color: '#FFFFFF',
  },
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  userCountContainer: {
    backgroundColor: '#FC3D21',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  userCount: {
    color: 'white',
    fontFamily: FONTS.bold,
    fontSize: 14,
  },
  cardContainer: {
    flex: 1,
    overflow: 'hidden', // Important for containing animations
  },
  loadingMoreText: {
    textAlign: 'center',
    color: '#666',
    marginVertical: 10,
    fontFamily: FONTS.regular,
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  errorText: {
    fontSize: 18,
    color: 'red',
    textAlign: 'center',
    fontFamily: FONTS.bold,
  },
  navigationContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderTopWidth: 1,
    borderTopColor: '#333',
  },
  navButton: {
    backgroundColor: '#FC3D21',
    borderWidth:0,
    borderColor:'white',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 24,
    width: '45%',
    alignItems: 'center',
  },
  navButtonText: {
    color: 'white',
    fontFamily: FONTS.bold,
    fontSize: 16,
  },
  disabledButton: {
    backgroundColor: '#CCCCCC',
  },
});

export default HomeScreen;
