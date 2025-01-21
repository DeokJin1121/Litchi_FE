import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { AntDesign } from '@expo/vector-icons';

import LoginPage from '../../../screens/auth_login/LoginPage';
import AgreeTermsPage from '../../../screens/auth_signup/agreeTerms/AgreeTermsPage';
import MapPage from '../../../screens/map/MapPage';
import BottomNavigator from './BottomNavigator';
import PostSubmissionPage from '../../../screens/postsubmission/PostSubmissionPage';
import PostSubmissionHeader from '../../../screens/postsubmission/components/PostSubmissionHeader';
import AlarmPage from '../../../screens/alarm/AlarmPage';
import ChatRoomPage from '../../../screens/tab/chat/ChatRoomPage';
import SignUpPage from '../../../screens/auth_signup/signup/SignUpPage';
import ProductDetailPage from '../../../screens/productDetail/ProductDetailPage';
import KaKaoLoginPage from '../../../screens/auth_login/components/snslogin/KakaoLoginPage';
import NaverLoginPage from '../../../screens/auth_login/components/snslogin/NaverLoginPage';
import GoogleLoginPage from '../../../screens/auth_login/components/snslogin/GoogleLoginPage';
import SearchUserPage from '../../../screens/auth_findUser/SearchUserPage';
import ChangePwPage from '../../../screens/auth_findUser/components/ChangePwPage';
import ChangePwOKPage from '../../../screens/auth_findUser/components/ChangePwOKPage';
import Map2Page from '../../../screens/map2/Map2Page';

import GoodTransPage from '../../../screens/main_mypage/components/mypage/profileInfo/good_trans/GoodTransPage';
import TransDetailsPage from '../../../screens/main_mypage/components/mypage/profileInfo/trans_tetails/TransDetailsPage';
import WritePage from '../../../screens/main_mypage/components/mypage/profileInfo/write_post/WritePage';
import ProfileUpdatePage from '../../../screens/main_mypage/components/mypage/profileInfo/profile_update/ProfileUpdatePage';
/**
 * 24.05.02 by.수현
 * # 스택 네비게이터 컴포넌트
 * 1. 화면을 스택으로 관리
 * 2. 초기화면은 LoginPage
 * 3. 각 페이지에 대한 스택 정의
 */
const Stack = createStackNavigator();

function StackNavigator() {

    return (
        <Stack.Navigator initialRouteName="LoginPage"
            screenOptions={{
                headerBackTitleVisible: false,
                headerBackImage: () => <AntDesign name="left" size={24} color="black" />,
                headerTitleStyle: {
                    fontWeight: 'bold',
                    fontSize: 22,
                },
                headerStyle: {
                    backgroundColor: '#fff',
                    shadowColor: '#fff',
                    elevation: 0,
                },
            }}
        >
            <Stack.Screen name="LoginPage" component={LoginPage} options={{ headerShown: false }} />
            <Stack.Screen name="AgreeTermsPage" component={AgreeTermsPage} options={{ title: '약관동의' }} />
            <Stack.Screen name="SignUpPage" component={SignUpPage} options={{ title: '회원가입' }} />
            <Stack.Screen name="SearchUserPage" component={SearchUserPage} options={{ title: '아이디 / 비밀번호 찾기' }} />
            <Stack.Screen name="ChangePwPage" component={ChangePwPage} options={{ title: '비밀번호 재설정', gestureEnabled: false, headerLeft: null }} />
            <Stack.Screen name="ChangePwOKPage" component={ChangePwOKPage} options={{ title: '비밀번호 재설정', gestureEnabled: false, headerLeft: null }} />
            <Stack.Screen name="Root" component={BottomNavigator} options={{ headerShown: false }} />
            <Stack.Screen name="MapPage" component={MapPage} />
            <Stack.Screen name='PostSubmissionPage' component={PostSubmissionPage} options={{ title: "게시물 등록" }} />
            <Stack.Screen name='AlarmPage' component={AlarmPage} options={{ title: "알림" }} />
            <Stack.Screen name="ChatRoomPage" component={ChatRoomPage}
                options={({ route }) => ({ title: route.params.userName })}
            />
            <Stack.Screen name="PostSubmissionHeader" component={PostSubmissionHeader} />
            <Stack.Screen name="Map2Page" component={Map2Page} />
            <Stack.Screen name="KakaoLoginPage" component={KaKaoLoginPage} />
            <Stack.Screen name="NaverLoginPage" component={NaverLoginPage} />
            <Stack.Screen name="GoogleLoginPage" component={GoogleLoginPage} />
            <Stack.Screen name="ProductDetailPage" component={ProductDetailPage} options={{ headerShown: false }} />

            <Stack.Screen name='GoodTransPage' component={GoodTransPage} options={{ title: "좋아요" }} />
            <Stack.Screen name='ProfileUpdatePage' component={ProfileUpdatePage} options={{ title: "프로필 수정" }} />
            <Stack.Screen name='TransDetailsPage' component={TransDetailsPage} options={{ title: "거래 내역" }} />
            <Stack.Screen name='WritePage' component={WritePage} options={{ title: "내가 쓴 글" }} />

        </Stack.Navigator>
    );
}

export default StackNavigator;
