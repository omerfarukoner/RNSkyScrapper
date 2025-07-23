import { MMKV } from 'react-native-mmkv';

const AUTH_TOKEN_KEY = 'auth_token';

let storage: MMKV;
let isInitialized = false;

const initializeStorage = () => {
  try {
    storage = new MMKV({
      id: 'app-storage',
      encryptionKey: undefined,
    });
    isInitialized = true;
  } catch (error) {
    storage = {
      set: () => {},
      getString: () => null,
      getNumber: () => undefined,
      getBoolean: () => undefined,
      delete: () => {},
      getAllKeys: () => [],
      clearAll: () => {},
      contains: () => false,
    } as any;
    isInitialized = false;
  }
};

initializeStorage();

export const setToken = (token: string): void => {
  if (!isInitialized) return;
  storage.set(AUTH_TOKEN_KEY, token);
};

export const getToken = (): string | null => {
  if (!isInitialized) return null;
  return storage.getString(AUTH_TOKEN_KEY) || null;
};

export const removeToken = (): void => {
  if (!isInitialized) return;
  storage.delete(AUTH_TOKEN_KEY);
};

export const setItem = (key: string, value: string): void => {
  if (!isInitialized) return;
  storage.set(key, value);
};

export const getItem = (key: string): string | null => {
  if (!isInitialized) return null;
  return storage.getString(key) || null;
};

export const removeItem = (key: string): void => {
  if (!isInitialized) return;
  storage.delete(key);
};

export const clear = (): void => {
  if (!isInitialized) return;
  storage.clearAll();
};

export { storage };