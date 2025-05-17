import React, { createContext, useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginUser, registerUser } from '../services/api';
import { useToast } from '../App'; 

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const { addToast } = useToast();

  useEffect(() => {
    const token = localStorage.getItem('authToken');
    const storedUser = localStorage.getItem('user');
    if (token && storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const login = async (credentials) => {
    try {
      const response = await loginUser(credentials);
      const token = response.access_token;
      const userData = { username: credentials.username, is_admin: credentials.username === 'admin' };
      localStorage.setItem('authToken', token);
      localStorage.setItem('user', JSON.stringify(userData));
      setUser(userData);
      addToast({
        type: 'success',
        message: 'Login successful!',
        description: 'You have been successfully logged in.'
      });
      navigate(userData.is_admin ? '/admin' : '/dashboard');
    } catch (error) {
      addToast({
        type: 'error',
        message: 'Login failed',
        description: 'Invalid username or password'
      });
      throw error;
    }
  };

  const register = async (userData) => {
    try {
      await registerUser(userData);
      await login({ username: userData.username, password: userData.password });
      addToast({
        type: 'success',
        message: 'Registration successful!',
        description: 'Your account has been created.'
      });
    } catch (error) {
      addToast({
        type: 'error',
        message: 'Registration failed',
        description: error.response?.data?.detail || 'Please check your information'
      });
      throw error;
    }
  };

  const logout = () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('user');
    setUser(null);
    addToast({
      type: 'success',
      message: 'Logged out successfully!'
    });
    navigate('/');
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);