import React, { useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { AuthProvider } from './app/contexts/AuthContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Main from './app/src/main/Main';
import Loading from './app/src/main/Loading';

const App = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  }, []);

  if (isLoading) {
    return <Loading />;
  } else {
    return (
      <AuthProvider>
        <NavigationContainer>
          <Main />
          <StatusBar style="auto" />
        </NavigationContainer>
      </AuthProvider>
    );
  }
};

export default App;
