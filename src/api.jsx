// api.js (Example API Service)
const BASE_URL = 'http://localhost:3000';

const api = {
  login: async (email, password) => {
    try {
      const response = await fetch(`${BASE_URL}/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        throw new Error('Login failed');
      }

      const data = await response.json();
      return data // Assuming session token is returned from the API
    } catch (error) {
      throw new Error('Login failed');
    }
  },
};

export default api;
