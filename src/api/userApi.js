export const fetchUsers = async (size = 10) => {
  try {
    const response = await fetch(
      `https://random-data-api.com/api/users/random_user?size=${size}`,
    );

    if (!response.ok) {
      throw new Error('Failed to fetch users');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching users:', error);
    throw error;
  }
};
