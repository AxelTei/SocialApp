// src/context/AuthContext.tsx
import React, { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { User } from '../types/social.types';

interface AuthContextType {
  currentUser: User | null;
  login: (user: User) => Promise<void>;
  logout: () => Promise<void>;
  updateUser: (user: User) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const STORAGE_KEY = '@current_user';

// Mock user par défaut
const DEFAULT_USER: User = {
  id: '1',
  username: 'axel_dev',
  displayName: 'Axel',
  avatar: 'https://i.pravatar.cc/150?img=12',
  bio: 'Full Stack Developer 💻',
  followersCount: 1250,
  followingCount: 340,
  postsCount: 42,
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  useEffect(() => {
    loadUser();
  }, []);

  const loadUser = async () => {
    try {
      const savedUser = await AsyncStorage.getItem(STORAGE_KEY);
      if (savedUser) {
        setCurrentUser(JSON.parse(savedUser));
      } else {
        // Auto-login avec l'utilisateur par défaut
        await login(DEFAULT_USER);
      }
    } catch (error) {
      console.error('Error loading user:', error);
    }
  };

  const login = async (user: User) => {
    try {
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(user));
      setCurrentUser(user);
    } catch (error) {
      console.error('Error saving user:', error);
    }
  };

  const logout = async () => {
    try {
      await AsyncStorage.removeItem(STORAGE_KEY);
      setCurrentUser(null);
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  const updateUser = async (user: User) => {
    try {
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(user));
      setCurrentUser(user);
    } catch (error) {
      console.error('Error updating user:', error);
    }
  };

  return (
    <AuthContext.Provider value={{ currentUser, login, logout, updateUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};