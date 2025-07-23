import React, { useReducer, useRef } from 'react';
import { Alert, ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { Screen } from '../../components';
import { strings } from '../../constants';
import { useAuth } from '../../context/AuthContext';
import { colors } from '../../theme';
import { setTempLoginData } from '../../utils/tempStorage';
import { validateConfirmPassword, validatePassword, validateUsername } from '../../utils/validation';
import styles from './RegisterScreen.styles';

interface RegisterScreenProps {
  navigation: any;
}

interface FormState {
  username: string;
  password: string;
  confirmPassword: string;
  usernameFocused: boolean;
  passwordFocused: boolean;
  confirmPasswordFocused: boolean;
  usernameError: string;
  passwordError: string;
  confirmPasswordError: string;
}

type FormAction = 
  | { type: 'SET_USERNAME'; payload: string }
  | { type: 'SET_PASSWORD'; payload: string }
  | { type: 'SET_CONFIRM_PASSWORD'; payload: string }
  | { type: 'SET_USERNAME_FOCUS'; payload: boolean }
  | { type: 'SET_PASSWORD_FOCUS'; payload: boolean }
  | { type: 'SET_CONFIRM_PASSWORD_FOCUS'; payload: boolean }
  | { type: 'SET_USERNAME_ERROR'; payload: string }
  | { type: 'SET_PASSWORD_ERROR'; payload: string }
  | { type: 'SET_CONFIRM_PASSWORD_ERROR'; payload: string }
  | { type: 'SET_ALL_ERRORS'; payload: { usernameError: string; passwordError: string; confirmPasswordError: string } };

const initialState: FormState = {
  username: '',
  password: '',
  confirmPassword: '',
  usernameFocused: false,
  passwordFocused: false,
  confirmPasswordFocused: false,
  usernameError: '',
  passwordError: '',
  confirmPasswordError: '',
};

const formReducer = (state: FormState, action: FormAction): FormState => {
  switch (action.type) {
    case 'SET_USERNAME':
      return { ...state, username: action.payload };
    case 'SET_PASSWORD':
      return { ...state, password: action.payload };
    case 'SET_CONFIRM_PASSWORD':
      return { ...state, confirmPassword: action.payload };
    case 'SET_USERNAME_FOCUS':
      return { ...state, usernameFocused: action.payload };
    case 'SET_PASSWORD_FOCUS':
      return { ...state, passwordFocused: action.payload };
    case 'SET_CONFIRM_PASSWORD_FOCUS':
      return { ...state, confirmPasswordFocused: action.payload };
    case 'SET_USERNAME_ERROR':
      return { ...state, usernameError: action.payload };
    case 'SET_PASSWORD_ERROR':
      return { ...state, passwordError: action.payload };
    case 'SET_CONFIRM_PASSWORD_ERROR':
      return { ...state, confirmPasswordError: action.payload };
    case 'SET_ALL_ERRORS':
      return { 
        ...state, 
        usernameError: action.payload.usernameError,
        passwordError: action.payload.passwordError,
        confirmPasswordError: action.payload.confirmPasswordError
      };
    default:
      return state;
  }
};

const RegisterScreen: React.FC<RegisterScreenProps> = ({ navigation }) => {
  const [state, dispatch] = useReducer(formReducer, initialState);
  const { register, isLoading } = useAuth();
  const scrollViewRef = useRef<ScrollView>(null);
  const usernameInputRef = useRef<TextInput>(null);
  const passwordInputRef = useRef<TextInput>(null);
  const confirmPasswordInputRef = useRef<TextInput>(null);

  const {
    username,
    password,
    confirmPassword,
    usernameFocused,
    passwordFocused,
    confirmPasswordFocused,
    usernameError,
    passwordError,
    confirmPasswordError,
  } = state;


  const handleUsernameChange = (value: string) => {
    dispatch({ type: 'SET_USERNAME', payload: value });
    const error = validateUsername(value) || '';
    dispatch({ type: 'SET_USERNAME_ERROR', payload: error });
  };

  const handlePasswordChange = (value: string) => {
    dispatch({ type: 'SET_PASSWORD', payload: value });
    const error = validatePassword(value) || '';
    dispatch({ type: 'SET_PASSWORD_ERROR', payload: error });
    if (confirmPassword) {
      const confirmError = validateConfirmPassword(confirmPassword, value) || '';
      dispatch({ type: 'SET_CONFIRM_PASSWORD_ERROR', payload: confirmError });
    }
  };

  const handleConfirmPasswordChange = (value: string) => {
    dispatch({ type: 'SET_CONFIRM_PASSWORD', payload: value });
    const error = validateConfirmPassword(value, password) || '';
    dispatch({ type: 'SET_CONFIRM_PASSWORD_ERROR', payload: error });
  };

  const handleRegister = async () => {
    
    const usernameValidationError = validateUsername(username) || '';
    const passwordValidationError = validatePassword(password) || '';
    const confirmPasswordValidationError = validateConfirmPassword(confirmPassword, password) || '';
    
    dispatch({ 
      type: 'SET_ALL_ERRORS', 
      payload: {
        usernameError: usernameValidationError,
        passwordError: passwordValidationError,
        confirmPasswordError: confirmPasswordValidationError
      }
    });
    
    if (usernameValidationError || passwordValidationError || confirmPasswordValidationError) {
      return;
    }

    try {
      await register({ username, password, confirmPassword });
      
      setTempLoginData(username, password);
      navigation.replace('Login');
    } catch (error) {
      Alert.alert(strings.errors.registerFailed, error instanceof Error ? error.message : strings.errors.unknownError);
    }
  };

  const navigateToLogin = () => {
    navigation.navigate('Login');
  };


  return (
    <Screen style={styles.container}>
      <ScrollView
        ref={scrollViewRef}
        style={{ flex: 1 }}
        contentContainerStyle={{ paddingBottom: 100 }}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
        automaticallyAdjustKeyboardInsets={true}
      >
        <View style={styles.content}>
          <View style={styles.headerContainer}>
            <View style={styles.logoContainer}>
              <Text style={styles.logoText}>✈️</Text>
            </View>
            <Text style={styles.title}>{strings.auth.createAccount}</Text>
            <Text style={styles.subtitle}>{strings.auth.registerSubtitle}</Text>
          </View>

          <View style={styles.form}>
            <View style={styles.inputContainer}>
              <Text style={styles.inputLabel}>{strings.auth.username}</Text>
              <TextInput
                ref={usernameInputRef}
                style={[styles.input, usernameFocused && styles.inputFocused, usernameError && styles.inputError]}
                placeholder={strings.auth.usernamePlaceholder}
                placeholderTextColor={colors.text.tertiary}
                value={username}
                onChangeText={handleUsernameChange}
                onFocus={() => {
                  dispatch({ type: 'SET_USERNAME_FOCUS', payload: true });
                }}
                onBlur={() => dispatch({ type: 'SET_USERNAME_FOCUS', payload: false })}
                autoCapitalize="none"
                autoCorrect={false}
                returnKeyType="next"
                onSubmitEditing={() => passwordInputRef.current?.focus()}
              />
              <Text style={styles.errorText}>{usernameError || ' '}</Text>
            </View>

            <View style={styles.inputContainer}>
              <Text style={styles.inputLabel}>{strings.auth.password}</Text>
              <TextInput
                ref={passwordInputRef}
                style={[styles.input, passwordFocused && styles.inputFocused, passwordError && styles.inputError]}
                placeholder={strings.auth.passwordPlaceholder}
                placeholderTextColor={colors.text.tertiary}
                value={password}
                onChangeText={handlePasswordChange}
                onFocus={() => {
                  dispatch({ type: 'SET_PASSWORD_FOCUS', payload: true });
                }}
                onBlur={() => dispatch({ type: 'SET_PASSWORD_FOCUS', payload: false })}
                secureTextEntry
                autoCapitalize="none"
                returnKeyType="next"
                onSubmitEditing={() => confirmPasswordInputRef.current?.focus()}
              />
              <Text style={styles.errorText}>{passwordError || ' '}</Text>
            </View>

            <View style={styles.inputContainer}>
              <Text style={styles.inputLabel}>{strings.auth.confirmPassword}</Text>
              <TextInput
                ref={confirmPasswordInputRef}
                style={[styles.input, confirmPasswordFocused && styles.inputFocused, confirmPasswordError && styles.inputError]}
                placeholder={strings.auth.passwordPlaceholder}
                placeholderTextColor={colors.text.tertiary}
                value={confirmPassword}
                onChangeText={handleConfirmPasswordChange}
                onFocus={() => {
                  dispatch({ type: 'SET_CONFIRM_PASSWORD_FOCUS', payload: true });
                  setTimeout(() => {
                    scrollViewRef.current?.scrollTo({
                      y: 200,
                      animated: true,
                    });
                  }, 100);
                }}
                onBlur={() => dispatch({ type: 'SET_CONFIRM_PASSWORD_FOCUS', payload: false })}
                secureTextEntry
                autoCapitalize="none"
                returnKeyType="done"
                onSubmitEditing={handleRegister}
              />
              <Text style={styles.errorText}>{confirmPasswordError || ' '}</Text>
            </View>

            <TouchableOpacity
              style={[styles.registerButton, isLoading && styles.registerButtonDisabled]}
              onPress={handleRegister}
              disabled={isLoading}
              activeOpacity={0.8}
            >
              <Text style={styles.registerButtonText}>
                {isLoading ? strings.auth.creatingAccount : strings.auth.register}
              </Text>
            </TouchableOpacity>

            <View style={styles.dividerContainer}>
              <View style={styles.divider} />
              <Text style={styles.dividerText}>{strings.auth.or}</Text>
              <View style={styles.divider} />
            </View>

            <View style={styles.loginContainer}>
              <View style={styles.loginRow}>
                <Text style={styles.loginLinkText}>{strings.auth.haveAccount} </Text>
                <TouchableOpacity style={styles.loginLink} onPress={navigateToLogin} activeOpacity={0.7}>
                  <Text style={styles.loginLinkTextBold}>{strings.auth.signIn}</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </Screen>
  );
};

export default RegisterScreen;