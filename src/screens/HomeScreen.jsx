import React, {useState, useEffect} from 'react';
import {StyleSheet, View, Text} from 'react-native';
import useUserData from '../hooks/useUserData';
import LoadingIndicator from '../components/LoadingIndicator';
import UserCard from '../components/UserCard';
import NavigationButtons from '../components/NavigationButtons';

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
    <View style={styles.container}>
      <Text style={styles.title}>User Information</Text>

      {loadingMore && currentUserIndex === 0 && (
        <Text style={styles.loadingMoreText}>Loading more users...</Text>
      )}

      <View style={styles.cardContainer}>
        <UserCard user={currentUser} animationDirection={animationDirection} />
      </View>

      <NavigationButtons
        onPrevious={handlePreviousUser}
        onNext={handleNextUser}
        isFirstUser={isFirstUser}
        isLastUser={isLastUser}
        currentIndex={currentUserIndex}
        totalUsers={totalUsers}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  cardContainer: {
    flex: 1,
    overflow: 'hidden', // Important for containing animations
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 20,
    color: '#333',
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
  },
  loadingMoreText: {
    textAlign: 'center',
    color: '#666',
    marginBottom: 10,
  },
});

export default HomeScreen;
