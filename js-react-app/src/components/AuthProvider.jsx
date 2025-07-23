import { useEffect, useState, ReactNode } from 'react';
import { authService } from '../api/rest/authService';
import { AuthContext } from '../contexts/AuthContext';

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const login = async (username, password) => {
    setIsLoading(true);
    try {
      const response = await authService.login({ username, password });
      authService.setAuthToken(response.token);
      setUser(response);
    } catch (error) {
      console.error('Login failed:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    authService.clearAuthToken();
    setUser(null);
  };

  const initializeAuth = async () => {
    try {
      const existingToken = authService.getAuthToken();
      if (existingToken) {
        authService.initializeAuth();
        // Verify token is still valid by fetching user info
        const userInfo = await authService.getCurrentUser();
        setUser({ ...userInfo, token: existingToken });
      }
      // No auto-login - user must login manually
    } catch (error) {
      console.error('Failed to initialize authentication:', error);
      authService.clearAuthToken();
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    initializeAuth();
  }, []);

  const value = {
    user,
    isLoading,
    isAuthenticated: !!user,
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
