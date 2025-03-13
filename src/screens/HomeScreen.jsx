import React from 'react';
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
    error,
    isFirstUser,
    isLastUser,
  } = useUserData();

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

      <UserCard user={currentUser} />

      <NavigationButtons
        onPrevious={goToPreviousUser}
        onNext={goToNextUser}
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
});

export default HomeScreen;
