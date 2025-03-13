import {useState, useEffect} from 'react';
import {fetchUsers} from '../api/userApi';

const useUserData = () => {
  const [users, setUsers] = useState([]);
  const [currentUserIndex, setCurrentUserIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadUsers = async () => {
      try {
        setLoading(true);
        const userData = await fetchUsers(80);
        setUsers(userData);
        setError(null);
      } catch (err) {
        setError('Failed to load user data. Please try again.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    loadUsers();
  }, []);

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
    totalUsers: users.length,
    goToNextUser,
    goToPreviousUser,
    loading,
    error,
    isFirstUser: currentUserIndex === 0,
    isLastUser: currentUserIndex === users.length - 1,
  };
};

export default useUserData;
