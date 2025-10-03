import { api } from '.';

export const authService = {
  login: async (credentials) => {
    const response = await api.post('/api/auth/login', credentials);
    return response.data;
  },

  getCurrentUser: async () => {
    const response = await api.get('/api/auth/me');
    return response.data;
  },

  setAuthToken: (token) => {
    api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    localStorage.setItem('authToken', token);
  },

  getAuthToken: () => {
    return localStorage.getItem('authToken');
  },

  clearAuthToken: () => {
    delete api.defaults.headers.common['Authorization'];
    localStorage.removeItem('authToken');
  },

  initializeAuth: () => {
    const token = authService.getAuthToken();
    if (token) {
      api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    }
  },
};
