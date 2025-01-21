import React from 'react';
import { View, StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import StackNavigator from './components/StackNavigator';
import { AuthProvider } from '../../contexts/AuthContext';

const Main = () => {
    return (
        <StackNavigator />
    );
};

export default Main;
