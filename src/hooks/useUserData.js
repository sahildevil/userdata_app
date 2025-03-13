import {useState, useEffect, useCallback} from 'react';
import {fetchUsers} from '../api/userApi';

const BATCH_SIZE = 10; // Number of users to fetch at once
const TOTAL_USERS = 80; // Total number of users we want to display

const useUserData = () => {
  const [users, setUsers] = useState([]);
  const [currentUserIndex, setCurrentUserIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [error, setError] = useState(null);

  // Load initial batch of users
  useEffect(() => {
    const loadInitialUsers = async () => {
      try {
        setLoading(true);
        const userData = await fetchUsers(BATCH_SIZE);
        setUsers(userData);
        setError(null);
      } catch (err) {
        setError('Failed to load user data. Please try again.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    loadInitialUsers();
  }, []);

  // Function to load more users when needed
  const loadMoreUsers = useCallback(async () => {
    // Don't fetch if we already have all the users we need
    if (users.length >= TOTAL_USERS) return;

    try {
      setLoadingMore(true);
      const nextBatch = await fetchUsers(BATCH_SIZE);
      setUsers(prevUsers => [...prevUsers, ...nextBatch]);
    } catch (err) {
      setError('Failed to load more users. Please try again.');
      console.error(err);
    } finally {
      setLoadingMore(false);
    }
  }, [users.length]);

  // Check if we need to load more users
  useEffect(() => {
    // If user is approaching the end of the current data (within 3 users of the end)
    if (
      users.length > 0 &&
      currentUserIndex >= users.length - 3 &&
      users.length < TOTAL_USERS
    ) {
      loadMoreUsers();
    }
  }, [currentUserIndex, users.length, loadMoreUsers]);

  const goToNextUser = () => {
    if (currentUserIndex < users.length - 1) {
      setCurrentUserIndex(currentUserIndex + 1);
    }
  };

  const goToPreviousUser = () => {
    if (currentUserIndex > 0) {
      setCurrentUserIndex(currentUserIndex - 1);
    }
  };

  return {
    currentUser: users[currentUserIndex],
    currentUserIndex,
    totalUsers: TOTAL_USERS,
    goToNextUser,
    goToPreviousUser,
    loading,
    loadingMore,
    error,
    isFirstUser: currentUserIndex === 0,
    isLastUser:
      currentUserIndex === TOTAL_USERS - 1 ||
      currentUserIndex === users.length - 1,
  };
};

export default useUserData;
