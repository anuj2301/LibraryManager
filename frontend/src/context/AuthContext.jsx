import { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const AuthContext = createContext();


// Removed useAuth function. It is now in a separate file.

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);


  // Setup axios interceptor
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      const userData = localStorage.getItem('user');
      if (userData) {
        setUser(JSON.parse(userData));
      }
    }
    setLoading(false);

    // Response interceptor for handling auth errors
    const responseInterceptor = axios.interceptors.response.use(
      (response) => response,
      (error) => {
        if (error.response?.status === 401) {
          logout();
        }
        return Promise.reject(error);
      }
    );

    return () => {
      axios.interceptors.response.eject(responseInterceptor);
    };
  }, []);

  // DEBUG: Log context state
  useEffect(() => {
    console.log('[AuthContext] loading:', loading, 'user:', user);
  }, [loading, user]);


  // mode: 'librarian' or 'student'
  const login = async (credentials, mode = 'librarian') => {
    try {
      const endpoint = mode === 'student' ? '/api/student-auth/login' : '/api/auth/login';
      const response = await axios.post(endpoint, credentials);
      const { token, librarianId, username, fullName } = response.data;
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify({ librarianId, username, fullName, mode }));
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      setUser({ librarianId, username, fullName, mode });
      return { success: true };
    } catch (error) {
      return { success: false, error: error.response?.data?.message || 'Login failed' };
    }
  };

  const register = async (userData, mode = 'librarian') => {
    try {
      const endpoint = mode === 'student' ? '/api/student-auth/register' : '/api/auth/register';
      await axios.post(endpoint, userData);
      return { success: true };
    } catch (error) {
      return { success: false, error: error.response?.data?.message || 'Registration failed' };
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    delete axios.defaults.headers.common['Authorization'];
    setUser(null);
  };

  const value = {
    user,
    loading,
    login,
    register,
    logout,
    isAuthenticated: !!user
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};