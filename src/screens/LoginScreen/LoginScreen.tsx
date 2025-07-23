import React, { useState, useEffect, useRef } from 'react';
import { Alert, ScrollView, Platform, Text, TextInput, TouchableOpacity, View, Keyboard, Dimensions } from 'react-native';
import { Screen } from '../../components';
import { strings } from '../../constants';
import { useAuth } from '../../context/AuthContext';
import { colors } from '../../theme';
import { getTempLoginData, clearTempLoginData } from '../../utils/tempStorage';
import styles from './LoginScreen.styles';

interface LoginScreenProps {
  navigation: any;
  route?: any;
}

const LoginScreen: React.FC<LoginScreenProps> = ({ navigation, route }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [usernameFocused, setUsernameFocused] = useState(false);
  const [passwordFocused, setPasswordFocused] = useState(false);
  const { login, isLoading } = useAuth();
  const scrollViewRef = useRef<ScrollView>(null);
  const usernameInputRef = useRef<TextInput>(null);
  const passwordInputRef = useRef<TextInput>(null);
  const [keyboardHeight, setKeyboardHeight] = useState(0);

  useEffect(() => {
    const tempData = getTempLoginData();
    
    if (tempData.username) {
      setUsername(tempData.username);
      setPassword(tempData.password || '');
      
      if (tempData.showSuccessMessage) {
        Alert.alert(
          strings.auth.registerSuccess,
          strings.auth.registerSuccessMessage,
          [{ text: 'OK' }]
        );
      }
      
      clearTempLoginData();
    }
  }, []);

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', (e) => {
      setKeyboardHeight(e.endCoordinates.height);
    });

    const keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', () => {
      setKeyboardHeight(0);
    });

    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, []);

  const handleLogin = async () => {
    if (!username || !password) {
      Alert.alert(strings.common.error, strings.errors.missingFields);
      return;
    }

    try {
      await login({ username, password });
    } catch (error) {
      Alert.alert(strings.errors.loginFailed, error instanceof Error ? error.message : strings.errors.unknownError);
    }
  };

  const navigateToRegister = () => {
    navigation.navigate('Register');
  };

  const scrollToInput = (inputRef: React.RefObject<TextInput | null>) => {
    if (inputRef.current && scrollViewRef.current) {
      setTimeout(() => {
        inputRef.current?.measureInWindow((x, y, width, height) => {
          const screenHeight = Dimensions.get('window').height;
          const visibleHeight = screenHeight - keyboardHeight;
          const desiredPosition = visibleHeight / 3; // Input should be at 1/3 of visible area
          const scrollAmount = y - desiredPosition;
          
          scrollViewRef.current?.scrollTo({
            y: Math.max(0, scrollAmount),
            animated: true,
          });
        });
      }, 300); // Wait for keyboard animation
    }
  };

  return (
    <Screen style={styles.container}>
      <ScrollView
        ref={scrollViewRef}
        style={{ flex: 1 }}
        contentContainerStyle={{ flexGrow: 1 }}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.content}>
          <View style={styles.headerContainer}>
            <View style={styles.logoContainer}>
              <Text style={styles.logoText}>✈️</Text>
            </View>
            <Text style={styles.title}>{strings.auth.welcomeBack}</Text>
            <Text style={styles.subtitle}>{strings.auth.loginSubtitle}</Text>
          </View>

          <View style={styles.form}>
            <View style={styles.inputContainer}>
              <Text style={styles.inputLabel}>{strings.auth.username}</Text>
              <TextInput
                ref={usernameInputRef}
                style={[styles.input, usernameFocused && styles.inputFocused]}
                placeholder={strings.auth.usernamePlaceholder}
                placeholderTextColor={colors.text.tertiary}
                value={username}
                onChangeText={setUsername}
                onFocus={() => {
                  setUsernameFocused(true);
                  scrollToInput(usernameInputRef);
                }}
                onBlur={() => setUsernameFocused(false)}
                autoCapitalize="none"
                autoCorrect={false}
                returnKeyType="next"
                onSubmitEditing={() => passwordInputRef.current?.focus()}
              />
            </View>

            <View style={styles.inputContainer}>
              <Text style={styles.inputLabel}>{strings.auth.password}</Text>
              <TextInput
                ref={passwordInputRef}
                style={[styles.input, passwordFocused && styles.inputFocused]}
                placeholder={strings.auth.passwordPlaceholder}
                placeholderTextColor={colors.text.tertiary}
                value={password}
                onChangeText={setPassword}
                onFocus={() => {
                  setPasswordFocused(true);
                  scrollToInput(passwordInputRef);
                }}
                onBlur={() => setPasswordFocused(false)}
                secureTextEntry
                autoCapitalize="none"
                returnKeyType="done"
                onSubmitEditing={handleLogin}
              />
            </View>

            <TouchableOpacity style={styles.forgotPasswordLink}>
              <Text style={styles.forgotPasswordText}>{strings.auth.forgotPassword}</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.loginButton, isLoading && styles.loginButtonDisabled]}
              onPress={handleLogin}
              disabled={isLoading}
              activeOpacity={0.8}
            >
              <Text style={styles.loginButtonText}>
                {isLoading ? strings.auth.signingIn : strings.auth.login}
              </Text>
            </TouchableOpacity>

            <View style={styles.dividerContainer}>
              <View style={styles.divider} />
              <Text style={styles.dividerText}>{strings.auth.or}</Text>
              <View style={styles.divider} />
            </View>

            <View style={styles.registerContainer}>
              <View style={styles.registerRow}>
                <Text style={styles.registerLinkText}>{strings.auth.noAccount} </Text>
                <TouchableOpacity style={styles.registerLink} onPress={navigateToRegister} activeOpacity={0.7}>
                  <Text style={styles.registerLinkTextBold}>{strings.auth.signUp}</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </Screen>
  );
};

export default LoginScreen;