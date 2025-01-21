import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import ProductListPage from '../../../screens/tab/main_product_list/ProductListPage';
import AgreeTermsPage from '../../../screens/auth_signup/agreeTerms/AgreeTermsPage';
import MyPage from '../../../screens/main_mypage/MyPage';
import { MaterialIcons } from '@expo/vector-icons';
import AlarmBtn from './AlarmBtn';
import ProductTypePidcker from './ProductTypePidcker';
import MainPage from '../../../screens/tab/main/MainPage';
import ChatListPage from '../../../screens/tab/chat/ChatListPage';
import { createStackNavigator } from '@react-navigation/stack';

/*
# 하단 탭 네비게이터 컴포넌트
하단 네비게이션 바 및 탭에 대한 설정을 담당
1. initialRouteName: 처음에 보여줄 페이지(현재는 상품리스트, 추후에 메인으로 변경 예정)
2. screenOptions: 탭에 대한 공통적인 설정 및 하단 네비게이터 스타일 설정
3. headerLeft: 상품 리스트 화면일 때에만 거래타입을 지정하기 위해 headerLeft에 ProductTypePidcker를 추가
4. headerRight: 알림 아이콘을 추가
*/

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const MessageStack = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen name="ChatListPage" component={ChatListPage} options={{ headerShown: false }} />
            {/* <Stack.Screen name="ChatRoomPage" component={ChatRoomPage} options={{ headerShown: false }} /> */}
        </Stack.Navigator>
    );
}


function BottomNavigator({ navigation }) {

    return (
        <Tab.Navigator
            initialRouteName="MainPage"
            screenOptions={({ route }) => ({
                headerRight: () => <AlarmBtn onPress={() => navigation.navigate('AlarmPage')} />,
                headerTitleStyle: {
                    fontWeight: 'bold',
                    fontSize: 22,
                },
                headerStyle: {
                    backgroundColor: '#fff',
                    shadowColor: '#fff',
                    elevation: 0,
                },
                tabBarIcon: ({ focused }) => {
                    let iconName;
                    switch (route.name) {
                        case 'ProductListPage':
                            iconName = 'home'; // 홈 아이콘
                            break;
                        case 'MainPage':
                            iconName = 'location-city'; // 메인 아이콘
                            break;
                        case 'ChatPage':
                            iconName = 'chat'; // 채팅 아이콘
                            break;
                        case 'MyPage':
                            iconName = 'person'; // 마이페이지 아이콘
                            break;
                        default:
                            iconName = 'help'; // 기본 아이콘
                    }
                    color = focused ? 'white' : 'gray';
                    return <MaterialIcons name={iconName} size={34} color={color} />;
                },
                tabBarStyle: {
                    backgroundColor: "#1B263B",
                    position: "absolute",
                    bottom: 25,
                    left: 20,
                    right: 20,
                    height: 80,
                    padding: 20,
                    borderRadius: 15,
                    // height: 90,
                    // opacity: 0.85,
                    elevation: 0,
                    // shadowColor: "#fff",
                },
                tabBarShowLabel: false,
            })}
        >
            <Tab.Screen
                name="ProductListPage"
                component={ProductListPage}
                options={{
                    tabBarLabel: "홈",
                    headerLeft: (props) => <ProductTypePidcker {...props} />,
                    headerTitle: '', // 상품 페이지에서는 headerTitle을 비웁니다.
                }}
            />
            <Tab.Screen
                name="MainPage"
                component={MainPage}
                options={{
                    tabBarLabel: "메인",
                    headerTitle: "LITCH",
                }}
            />
            <Tab.Screen
                name="ChatPage"
                component={MessageStack}
                options={{
                    tabBarLabel: "채팅",
                    headerTitle: "채팅",
                    tabBarBadge: 3,
                }}
            />
            <Tab.Screen
                name="MyPage"
                component={MyPage}
                options={{
                    tabBarLabel: "마이페이지",
                    headerTitle: "마이페이지",
                }}
            />
        </Tab.Navigator>
    );
}

export default BottomNavigator;
