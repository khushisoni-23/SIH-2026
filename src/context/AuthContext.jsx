import React, { createContext, useContext, useState, useEffect } from 'react';
import api from '../services/api';

const AuthContext = createContext(null);

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within an AuthProvider');
  return ctx;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    try {
      const stored = localStorage.getItem('freightsense_user');
      return stored ? JSON.parse(stored) : null;
    } catch { return null; }
  });
  const [token, setToken] = useState(() => localStorage.getItem('freightsense_token') || null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const isAuthenticated = !!token && !!user;

  // Persist to localStorage whenever user/token change
  useEffect(() => {
    if (token) localStorage.setItem('freightsense_token', token);
    else localStorage.removeItem('freightsense_token');

    if (user) localStorage.setItem('freightsense_user', JSON.stringify(user));
    else localStorage.removeItem('freightsense_user');
  }, [token, user]);

  const signup = async (formData) => {
    setLoading(true);
    setError(null);
    try {
      const res = await api.post('/auth/signup', {
        fullName: formData.fullName,
        organization: formData.organization,
        designation: formData.designation,
        email: formData.email,
        phone: formData.phone,
        password: formData.password,
      });
      setToken(res.data.token);
      setUser(res.data.user);
      return res.data;
    } catch (err) {
      const msg = 
        err.response?.data?.message || 
        err.response?.data?.errors?.[0]?.msg || 
        (err.code === 'ERR_NETWORK' || !err.response 
          ? 'Backend server is not running on port 5001. Please restart with: npm run dev' 
          : err.message || 'Signup failed');
      setError(msg);
      throw new Error(msg);
    } finally {
      setLoading(false);
    }
  };

  const login = async (email, password) => {
    setLoading(true);
    setError(null);
    try {
      const res = await api.post('/auth/login', { email, password });
      setToken(res.data.token);
      setUser(res.data.user);
      return res.data;
    } catch (err) {
      const msg = 
        err.response?.data?.message || 
        err.response?.data?.errors?.[0]?.msg || 
        (err.code === 'ERR_NETWORK' || !err.response 
          ? 'Backend server is not running on port 5001. Please restart with: npm run dev' 
          : err.message || 'Login failed');
      setError(msg);
      throw new Error(msg);
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    setToken(null);
    setUser(null);
    localStorage.removeItem('freightsense_token');
    localStorage.removeItem('freightsense_user');
  };

  return (
    <AuthContext.Provider value={{ user, token, isAuthenticated, loading, error, signup, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
