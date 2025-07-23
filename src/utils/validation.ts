export const validateUsername = (username: string): string | null => {
  if (!username || username.trim().length === 0) {
    return 'Username is required';
  }
  if (username.length < 3) {
    return 'Username must be at least 3 characters';
  }
  if (username.length > 20) {
    return 'Username must be less than 20 characters';
  }
  if (!/^[a-zA-Z0-9_]+$/.test(username)) {
    return 'Username can only contain letters, numbers, and underscores';
  }
  return null;
};

export const validatePassword = (password: string): string | null => {
  if (!password || password.trim().length === 0) {
    return 'Password is required';
  }
  if (password.length < 6) {
    return 'Password must be at least 6 characters';
  }
  if (password.length > 50) {
    return 'Password must be less than 50 characters';
  }
  return null;
};

export const validateConfirmPassword = (confirmPassword: string, password: string): string | null => {
  if (!confirmPassword || confirmPassword.trim().length === 0) {
    return 'Confirm password is required';
  }
  if (confirmPassword !== password) {
    return 'Passwords do not match';
  }
  return null;
};