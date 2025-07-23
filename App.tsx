import React from 'react';
import { StatusBar, StyleSheet, View } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { ConnectivityBanner } from './src/components';
import { AuthProvider, ConnectivityProvider } from './src/context';
import AppNavigator from './src/navigation/AppNavigator';
import { colors } from './src/theme';
import './src/utils/wdyr';

function App(): React.JSX.Element {
  return (
    <SafeAreaProvider>
      <ConnectivityProvider>
        <AuthProvider>
          <View style={styles.container}>
            <StatusBar
              barStyle="light-content"
              backgroundColor={colors.primary}
              translucent={false}
            />
            <AppNavigator />
            <ConnectivityBanner />
          </View>
        </AuthProvider>
      </ConnectivityProvider>
    </SafeAreaProvider>
  );
}

App.whyDidYouRender = {
  logOnDifferentValues: true,
  customName: 'App',
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default App;
