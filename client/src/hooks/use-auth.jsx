import { createContext, useContext, useState, useEffect } from 'react';
import { useLocation } from 'wouter';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [, setLocation] = useLocation();

  // Check authentication status on mount
  useEffect(() => {
    checkAuthStatus();
  }, []);

  const checkAuthStatus = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/user', {
        credentials: 'include',
      });
      if (!response.ok) throw new Error('Not authenticated');
      const userData = await response.json();
      setUser(userData);
    } catch (error) {
      setUser(null);
    } finally {
      setIsLoading(false);
    }
  };

  // Reusable function for login and register
  const handleAuthRequest = async (endpoint, data) => {
    try {
      const response = await fetch(`http://localhost:5000/api/${endpoint}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify(data),
      });
      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Authentication failed');
      }
      return await response.json();
    } catch (error) {
      console.error(`${endpoint} error:`, error);
      throw error;
    }
  };

  const login = async (username, password) => {
    const userData = await handleAuthRequest('login', { username, password });
    setUser(userData);
    setLocation('/');
  };

  const register = async (username, password) => {
    const userData = await handleAuthRequest('register', { username, password });
    setUser(userData);
    setLocation('/');
  };

  const logout = async () => {
    try {
      await fetch('http://localhost:5000/api/logout', {
        method: 'POST',
        credentials: 'include',
      });
      setUser(null);
      setLocation('/auth');
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  const value = { user, isLoading, login, register, logout };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
