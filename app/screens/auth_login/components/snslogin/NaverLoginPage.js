import React, { useState } from 'react';
import { WebView } from 'react-native-webview';
import { View, ActivityIndicator } from 'react-native';

const CLIENT_ID = 'XXgB9dCb2sd9LObZVM7U';
const CLIENT_SECRET = 'HpCxo8ks4F';
const REDIRECT_URI = 'http://10.200.72.130:8084/API/MEMBER/OAUTH2';
const STATE = 'RANDOM_STATE';

const NaverLoginPage = () => {
  const [loading, setLoading] = useState(true);

  const handleNavigationStateChange = (navState) => {
    if (navState.url.startsWith(REDIRECT_URI)) {
      const url = new URL(navState.url);
      const code = url.searchParams.get('code');
      const state = url.searchParams.get('state');

      if (code && state === STATE) {
        // 인증 코드가 성공적으로 전달되었으므로, 액세스 토큰을 요청합니다.
        getAccessToken(code);
      }
    }
  };

  const getAccessToken = async (code) => {
    const tokenUrl = 'https://nid.naver.com/oauth2.0/token';
    const params = new URLSearchParams({
      grant_type: 'authorization_code',
      client_id: CLIENT_ID,
      client_secret: 'YOUR_CLIENT_SECRET',
      redirect_uri: REDIRECT_URI,
      code: code,
      state: STATE,
    });

    try {
      const response = await fetch(`${tokenUrl}?${params.toString()}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      });

      const data = await response.json();
      if (data.access_token) {
        console.log('Access Token:', data.access_token);
        // 액세스 토큰을 사용하여 사용자 정보를 요청합니다.
        getUserInfo(data.access_token);
      } else {
        console.error('Failed to retrieve access token', data);
      }
    } catch (error) {
      console.error('Error fetching access token:', error);
    }
  };

  const getUserInfo = async (token) => {
    try {
      const response = await fetch('https://openapi.naver.com/v1/nid/me', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();
      if (data.response) {
        console.log('User Info:', data.response);
      } else {
        console.error('Failed to retrieve user info', data);
      }
    } catch (error) {
      console.error('Error fetching user info:', error);
    }
  };

  return (
    <View style={{ flex: 1 }}>
      {loading && (
        <ActivityIndicator
          size="large"
          color="#00ff00"
          style={{ position: 'absolute', top: '50%', left: '50%', zIndex: 1 }}
        />
      )}
      <WebView
        source={{ uri: `https://nid.naver.com/oauth2.0/authorize?response_type=code&client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&state=${STATE}` }}
        onLoadEnd={() => setLoading(false)}
        onNavigationStateChange={handleNavigationStateChange}
        startInLoadingState
      />
    </View>
  );
};

export default NaverLoginPage;
