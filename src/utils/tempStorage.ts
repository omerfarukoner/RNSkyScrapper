import { storage } from '../services/storageService';

const TEMP_LOGIN_KEY = 'temp_login_data';

interface TempLoginData {
  username?: string;
  password?: string;
  showSuccessMessage?: boolean;
}

export const setTempLoginData = (username: string, password: string) => {
  const data: TempLoginData = { username, password, showSuccessMessage: true };
  try {
    storage.set(TEMP_LOGIN_KEY, JSON.stringify(data));
  } catch (error) {
  }
};

export const getTempLoginData = (): TempLoginData => {
  try {
    const data = storage.getString(TEMP_LOGIN_KEY);
    return data ? JSON.parse(data) : {};
  } catch (error) {
    return {};
  }
};

export const clearTempLoginData = () => {
  try {
    storage.delete(TEMP_LOGIN_KEY);
  } catch (error) {
  }
};