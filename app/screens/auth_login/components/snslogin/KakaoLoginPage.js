import React, { useState } from 'react';
import { View, Alert, StyleSheet } from 'react-native';
import { WebView } from 'react-native-webview';
import axios from 'axios';
import qs from 'qs';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';

const REDIRECT_URI = 'http://10.200.72.130:8084/oauth/kakao';
const REST_API_KEY = '5076e0b49e93b3a962968f81f7308ef1'; 
const INJECTED_JAVASCRIPT = `window.ReactNativeWebView.postMessage('message from webView')`;
const KaKaoLoginPage = () => {
  const navigation = useNavigation();
  const [webViewUrl, setWebViewUrl] = useState(`https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}`);

  function KakaoLoginWebView(data) {
    const exp = "code=";
    var condition = data.indexOf(exp);    
    if (condition != -1) {
      var authorize_code = data.substring(condition + exp.length);
      console.log('Authorization Code:', authorize_code);
      requestToken(authorize_code);
    };
  }

  const requestToken = async (authorize_code) => {
    try {
      const response = await axios.post('https://kauth.kakao.com/oauth/token', qs.stringify({
        grant_type: 'authorization_code',
        client_id: REST_API_KEY,
        redirect_uri: REDIRECT_URI,
        code: authorize_code,
      }), {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
        },
      });

      const AccessToken = response.data.access_token;
      console.log('Access Token:', AccessToken);

      sendAuthorizationCodeToBackend(AccessToken);
      getUserInfo(AccessToken);
      storeData(AccessToken);
    } catch (error) {
      console.log('error', error);
      Alert.alert('Login Failed', 'Failed to retrieve access token');
      navigation.navigate('Failure', { error: error.message });
    }
  };

  const getUserInfo = async (ACCESS_TOKEN) => {
    try {
      const response = await axios.get('https://kapi.kakao.com/v2/user/me', {
        headers: {
          Authorization: `Bearer ${ACCESS_TOKEN}`,
          'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
        }
      });
      const userInfo = response.data;
      console.log('User Info:', userInfo); // Log user info here
      navigation.navigate('Success', { userInfo: userInfo });
    } catch (error) {
      console.error('Error getting user info:', error);
      Alert.alert('Login Failed', 'Failed to retrieve user info');
      navigation.navigate('Failure', { error: error.message });
    }
  };

  const sendAuthorizationCodeToBackend = async (authorizeCode) => {
    try {
        const backendEndpoint = 'http://10.200.72.130:8084/oauth/kakao'; // 백엔드의 엔드포인트 주소
        const formData = new URLSearchParams();
        formData.append('code', authorizeCode);

        const response = await axios.post(backendEndpoint, formData, {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        });
        console.log('Successfully sent authorization code to backend:', response.data);
    } catch (error) {
        console.error('Error sending authorization code to backend:', error);
        Alert.alert('Login Failed', 'Failed to send authorization code to backend');
        navigation.navigate('Failure', { error: error.message });
    }
  };

  const storeData = async (returnValue) => {
    try {
      await AsyncStorage.setItem('AccessToken', returnValue);
    } catch (error) {
      console.error('Error storing data:', error);
    }
  };

  return (
    <View style={Styles.container}>      
      <WebView
        style={{ flex: 1 }}
        originWhitelist={['*']}
        scalesPageToFit={false}
        source={{ uri: webViewUrl }}
        injectedJavaScript={INJECTED_JAVASCRIPT}
        javaScriptEnabled
        onMessage={event => { KakaoLoginWebView(event.nativeEvent.data); }}
      />
    </View>
  );
};

export default KaKaoLoginPage;

const Styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 24,
    backgroundColor: '#fff',
  },    
});