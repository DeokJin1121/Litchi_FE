// contexts/AuthContext.js

import React, { createContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

export const AuthContext = createContext({
  token: null,
  nickname: null,
  region: null,
  login: () => { },
  logout: () => { },
});

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(null);
  const [nickname, setNickname] = useState(null);
  const [region, setRegion] = useState(null);

  useEffect(() => {
    const loadAuthData = async () => {
      const storedToken = await AsyncStorage.getItem('jwtToken');
      const storedNickname = await AsyncStorage.getItem('userNickname');
      const storedRegion = await AsyncStorage.getItem('userRegion');
      if (storedToken) setToken(storedToken);
      if (storedNickname) setNickname(storedNickname);
      if (storedRegion) setRegion(storedRegion);
    };

    loadAuthData();
  }, []);

  const login = async (newToken, newNickname, newRegion) => {
    setToken(newToken);
    setNickname(newNickname);
    setRegion(newRegion);
    if (newToken) await AsyncStorage.setItem('jwtToken', newToken);
    if (newNickname) await AsyncStorage.setItem('userNickname', newNickname);
    if (newRegion) await AsyncStorage.setItem('userRegion', newRegion);
  };

  const logout = async () => {
    setToken(null);
    setNickname(null);
    setRegion(null);
    await AsyncStorage.removeItem('jwtToken');
    await AsyncStorage.removeItem('userNickname');
    await AsyncStorage.removeItem('userRegion');
  };

  return (
    <AuthContext.Provider value={{ token, nickname, region, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
