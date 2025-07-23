import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { AuthState, User, LoginCredentials, RegisterData } from '../types';
import * as authService from '../services/authService';
import * as storage from '../services/storageService';

interface AuthContextType extends AuthState {
  login: (credentials: LoginCredentials) => Promise<void>;
  register: (data: RegisterData) => Promise<void>;
  logout: () => Promise<void>;
  checkAuthStatus: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [state, setState] = useState<AuthState>({
    user: null,
    isAuthenticated: false,
    isLoading: true,
    token: null,
  });

  const login = async (credentials: LoginCredentials) => {
    setState(prev => ({ ...prev, isLoading: true }));
    try {
      const response = await authService.login(credentials);
      storage.setToken(response.token);
      setState({
        user: response.user,
        isAuthenticated: true,
        isLoading: false,
        token: response.token,
      });
    } catch (error) {
      setState(prev => ({ ...prev, isLoading: false }));
      throw error;
    }
  };

  const register = async (data: RegisterData) => {
    setState(prev => ({ ...prev, isLoading: true }));
    try {
      await authService.register(data);
      setState(prev => ({ ...prev, isLoading: false }));
    } catch (error) {
      setState(prev => ({ ...prev, isLoading: false }));
      throw error;
    }
  };

  const logout = async () => {
    setState(prev => ({ ...prev, isLoading: true }));
    try {
      const currentToken = state.token;
      if (currentToken) {
        await authService.logout(currentToken);
      }
      storage.removeToken();
      setState({
        user: null,
        isAuthenticated: false,
        isLoading: false,
        token: null,
      });
    } catch (error) {
      setState(prev => ({ ...prev, isLoading: false }));
      throw error;
    }
  };

  const checkAuthStatus = async () => {
    setState(prev => ({ ...prev, isLoading: true }));
    try {
      const token = storage.getToken();
      
      if (token) {
        authService.debugAuthState();
        
        const user = await authService.getProfile(token);
        setState({
          user,
          isAuthenticated: true,
          isLoading: false,
          token,
        });
      } else {
        setState({
          user: null,
          isAuthenticated: false,
          isLoading: false,
          token: null,
        });
      }
    } catch (error) {
      storage.removeToken();
      setState({
        user: null,
        isAuthenticated: false,
        isLoading: false,
        token: null,
      });
    }
  };

  useEffect(() => {
    checkAuthStatus();
  }, []);

  const value: AuthContextType = {
    ...state,
    login,
    register,
    logout,
    checkAuthStatus,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};