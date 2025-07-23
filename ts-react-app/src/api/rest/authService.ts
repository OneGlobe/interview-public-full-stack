import { api } from '.';
import { LoginRequest, AuthResponse } from '../../types';

export const authService = {
  login: async (credentials: LoginRequest): Promise<AuthResponse> => {
    const response = await api.post('/api/auth/login', credentials);
    return response.data;
  },

  getCurrentUser: async (): Promise<AuthResponse> => {
    const response = await api.get('/api/auth/me');
    return response.data;
  },

  setAuthToken: (token: string) => {
    api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    localStorage.setItem('authToken', token);
  },

  getAuthToken: (): string | null => {
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
