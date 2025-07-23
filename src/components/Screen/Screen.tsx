import React, { ReactNode } from 'react';
import { View, SafeAreaView, ViewStyle, StatusBar } from 'react-native';
import styles from './Screen.styles';

interface ScreenProps {
  children: ReactNode;
  style?: ViewStyle;
  backgroundColor?: string;
  statusBarStyle?: 'light-content' | 'dark-content';
  statusBarBackgroundColor?: string;
}

const Screen: React.FC<ScreenProps> = ({ 
  children, 
  style, 
  backgroundColor, 
  statusBarStyle = 'dark-content', 
  statusBarBackgroundColor 
}) => {
  const containerStyle = [styles.container, backgroundColor && { backgroundColor }, style];

  return (
    <View style={containerStyle}>
      <StatusBar
        barStyle={statusBarStyle}
        backgroundColor={statusBarBackgroundColor}
        translucent={false}
      />
      <SafeAreaView style={styles.safeArea}>{children}</SafeAreaView>
    </View>
  );
};

export default Screen;
