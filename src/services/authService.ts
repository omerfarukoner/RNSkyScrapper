import { LoginCredentials, RegisterData, AuthResponse, User } from '../types';
import Logger from '../utils/logger';
import * as storage from './storageService';
import { validateUsername, validatePassword } from '../utils/validation';

const USERS_KEY = 'auth_users';
const TOKENS_KEY = 'auth_tokens';

let users: Map<string, User & { password: string }> = new Map();
let tokens: Map<string, string> = new Map();

const loadPersistedData = (): void => {
  try {
    const usersData = storage.getItem(USERS_KEY);
    if (usersData) {
      const usersArray = JSON.parse(usersData);
      users = new Map(usersArray);
    }

    const tokensData = storage.getItem(TOKENS_KEY);
    if (tokensData) {
      const tokensArray = JSON.parse(tokensData);
      tokens = new Map(tokensArray);
    }
  } catch (error) {
  }
};

const savePersistedData = (): void => {
  try {
    const usersArray = Array.from(users.entries());
    storage.setItem(USERS_KEY, JSON.stringify(usersArray));

    const tokensArray = Array.from(tokens.entries());
    storage.setItem(TOKENS_KEY, JSON.stringify(tokensArray));
  } catch (error) {
  }
};


const generateUserId = (): string => {
  return `user_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;
};

const generateToken = (): string => {
  return `token_${Date.now()}_${Math.random().toString(36).substring(2, 15)}`;
};

const simulateApiDelay = async (): Promise<void> => {
  return new Promise(resolve => setTimeout(resolve, 1000));
};

export const login = async (credentials: LoginCredentials): Promise<AuthResponse> => {
  Logger.debug('AuthService: Login attempt', { username: credentials.username });
  
  const usernameError = validateUsername(credentials.username);
  if (usernameError) {
    throw new Error(usernameError);
  }

  const passwordError = validatePassword(credentials.password);
  if (passwordError) {
    throw new Error(passwordError);
  }

  await simulateApiDelay();

  const user = Array.from(users.values()).find(
    u => u.username === credentials.username.trim()
  );

  if (!user || user.password !== credentials.password) {
    throw new Error('Invalid username or password');
  }

  const token = generateToken();
  tokens.set(token, user.username);
  savePersistedData();

  const { password, ...userWithoutPassword } = user;
  
  Logger.debug('AuthService: Login successful', { userId: user.id });
  
  return {
    user: userWithoutPassword,
    token,
  };
};

export const register = async (data: RegisterData): Promise<AuthResponse> => {
  Logger.debug('AuthService: Register attempt', { username: data.username });
  
  const usernameError = validateUsername(data.username);
  if (usernameError) {
    throw new Error(usernameError);
  }

  const passwordError = validatePassword(data.password);
  if (passwordError) {
    throw new Error(passwordError);
  }

  if (data.password !== data.confirmPassword) {
    throw new Error('Passwords do not match');
  }

  await simulateApiDelay();

  if (Array.from(users.values()).some(u => u.username === data.username.trim())) {
    throw new Error('Username already exists');
  }

  const user: User & { password: string } = {
    id: generateUserId(),
    username: data.username.trim(),
    password: data.password,
    createdAt: new Date(),
  };

  users.set(user.id, user);
  
  const token = generateToken();
  tokens.set(token, user.username);
  savePersistedData();

  const { password, ...userWithoutPassword } = user;
  
  Logger.debug('AuthService: Register successful', { userId: user.id });
  
  return {
    user: userWithoutPassword,
    token,
  };
};

export const getProfile = async (token: string): Promise<User> => {
  Logger.debug('AuthService: Get profile attempt');
  
  await simulateApiDelay();

  const username = tokens.get(token);
  if (!username) {
    throw new Error('Invalid token');
  }

  const user = Array.from(users.values()).find(u => u.username === username);
  if (!user) {
    throw new Error('User not found');
  }

  const { password, ...userWithoutPassword } = user;
  
  Logger.debug('AuthService: Get profile successful', { userId: user.id });
  
  return userWithoutPassword;
};

export const logout = async (token: string): Promise<void> => {
  Logger.debug('AuthService: Logout attempt');
  
  await simulateApiDelay();

  tokens.delete(token);
  savePersistedData();
  
  Logger.debug('AuthService: Logout successful');
};

export const debugAuthState = (): void => {
  const usersData = storage.getItem(USERS_KEY);
  const tokensData = storage.getItem(TOKENS_KEY);
  const currentToken = storage.getToken();
};

loadPersistedData();