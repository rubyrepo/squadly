const BASE_URL = 'http://localhost:5000';

export const userService = {
  register: async (userData) => {
    try {
      const response = await fetch(`${BASE_URL}/users`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData)
      });

      const data = await response.json();
      return data;
      
    } catch (error) {
      console.error('UserService register error:', error);
      throw error;
    }
  }
};