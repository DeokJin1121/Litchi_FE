import React, { useState, useEffect, useCallback } from 'react'
import { View, Text, TextInput, TouchableOpacity, KeyboardAvoidingView, Platform } from 'react-native'
import { GiftedChat, Bubble, Send } from 'react-native-gifted-chat'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import { SafeAreaView } from 'react-native-safe-area-context';
import * as ImagePicker from 'expo-image-picker';
import { Alert } from 'react-native';

// 앨범에서 이미지 선택 or 카메라로 사진 찍기 alert 창
const showImagePickerOptions = () => {
    Alert.alert(
        "이미지 선택",
        "이미지를 어떻게 추가하시겠습니까?",
        [
            {
                text: "취소",
                onPress: () => console.log("취소됨"),
                style: "cancel"
            },
            {
                text: "앨범에서 선택",
                onPress: () => pickImageFromAlbum()
            },
            {
                text: "사진 찍기",
                onPress: () => takePhotoWithCamera()
            }
        ],
        { cancelable: true }
    );
}
// 앨범에서 이미지 선택
const pickImageFromAlbum = async () => {
    try {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== 'granted') {
            alert('죄송합니다, 이 기능을 사용하려면 카메라 롤 권한이 필요합니다!');
            return;
        }

        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        if (!result.canceled) {
            // 이곳에서 결과 처리 (예: 이미지 상태 업데이트)
            console.log(result.uri);
        }
    } catch (error) {
        // 에러 처리
        console.error("앨범에서 이미지를 가져오는 중 오류가 발생했습니다.", error);
    }
};
// 카메라 촬영
const takePhotoWithCamera = async () => {
    try {
        const { status } = await ImagePicker.requestCameraPermissionsAsync();
        if (status !== 'granted') {
            alert('죄송합니다, 이 기능을 사용하려면 카메라 권한이 필요합니다!');
            return;
        } else
            console.log("카메라 권한이 허용되었습니다.");

        let result = await ImagePicker.launchCameraAsync({
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        if (!result.canceled) {
            // 이곳에서 결과 처리 (예: 이미지 상태 업데이트)
            console.log(result.uri);
        }
    } catch (error) {
        // 에러 처리
        console.error("카메라로 사진을 찍는 중 오류가 발생했습니다.", error);
    }
};


// 채팅방 페이지
const ChatRoomPage = () => {
    const [messages, setMessages] = useState([]) // 메시지 상태 추가
    const [inputText, setInputText] = useState(''); // 사용자 입력을 위한 상태 추가

    // 초기 메시지 설정
    useEffect(() => {
        setMessages([
            {
                _id: 1,
                text: '안녕하세요.',
                createdAt: new Date(),
                user: {
                    _id: 2,
                    name: 'React Native',
                    avatar: require('../../../assets/images/profile.png'),
                },
            },
            {
                _id: 2,
                text: '안녕하세요~~',
                createdAt: new Date(),
                user: {
                    _id: 1,
                    name: 'React Native',
                    avatar: require('../../../assets/images/profile.png'),
                },
            },
            {
                _id: 3,
                text: '하이하이',
                createdAt: new Date(),
                user: {
                    _id: 2,
                    name: 'React Native',
                    avatar: require('../../../assets/images/profile.png'),
                },
            },
        ])
    }, [])

    // 메시지 전송 함수
    const onSend = useCallback((newMessages = []) => {
        setMessages(previousMessages =>
            GiftedChat.append(previousMessages, newMessages),
        )
    }, [])

    // 메시지 전송 버튼 클릭 시 호출
    const handleSend = () => {
        if (inputText.trim().length > 0) {
            const newMessages = [{
                _id: Math.round(Math.random() * 1000000), // 임의의 ID 생성
                text: inputText,
                createdAt: new Date(),
                user: {
                    _id: 1, // 현재 사용자 ID
                },
            }];

            onSend(newMessages);
            setInputText(''); // 메시지 전송 후 입력 필드 초기화
        }
    }

    // 전송 버튼 컴포넌트
    const renderSend = (props) => {
        return (
            <Send {...props}>
                <View style={{ marginRight: 10, marginBottom: 5 }}>
                    <MaterialCommunityIcons name="send-circle" size={32} color="#2e64e5" />
                </View>
            </Send>
        );
    }

    // 채팅 버블 컴포넌트
    const renderBubble = (props) => {
        return (
            <Bubble
                {...props}
                wrapperStyle={{
                    // 오른쪽(나) 채팅 버블 스타일
                    right: {
                        backgroundColor: '#2e64e5',
                    },
                    // 왼쪽(상대방) 채팅 버블 스타일
                    left: {
                        backgroundColor: '#fff',
                    },
                }}
            />
        );
    }

    // 채팅방 하단으로 내리는 컴포넌트
    const scrollToBottomComponent = () => {
        return (
            <MaterialCommunityIcons name="chevron-double-down" size={22} color="#333" />
        );
    }

    // 입력 툴바 컴포넌트 (이미지 선택, 메시지 입력, 전송 버튼)
    const renderInputToolbar = (props) => (
        <View style={{
            flexDirection: 'row',
            alignItems: 'center',
            width: '100%',
            paddingHorizontal: 10,
            paddingVertical: 5,
            justifyContent: 'space-between',
            backgroundColor: '#fff',
        }}>
            {/* 이미지 선택 아이콘 */}
            <TouchableOpacity onPress={showImagePickerOptions}>
                <MaterialCommunityIcons name="camera" size={28} color="#333" />
            </TouchableOpacity>
            {/* 메시지 입력 필드 */}
            <TextInput
                placeholder="메시지를 입력하세요..."
                value={inputText} // TextInput에 입력 상태 연결
                onChangeText={setInputText} // 입력 상태 업데이트
                style={{
                    borderRadius: 20,
                    borderColor: '#d0d0d0', // #f2f2f2
                    borderWidth: 2,
                    marginHorizontal: 5,
                    paddingVertical: 10,
                    flex: 1, // Text Input이 남은 공간을 모두 차지하도록 설정
                    backgroundColor: '#f2f2f2',
                }}
                paddingHorizontal={10}
            />
            {/* 전송 버튼 */}
            <TouchableOpacity onPress={handleSend} style={{ position: 'absolute', right: 20 }}>
                <MaterialCommunityIcons name="send-circle" size={32} color="#2e64e5" />
            </TouchableOpacity>
        </View>
    );

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }} edges={['bottom']} >
            <View style={{ flex: 1, backgroundColor: '#f2f2f2' }}>
                <GiftedChat
                    messages={messages}
                    onSend={messages => onSend(messages)}
                    user={{
                        _id: 1,
                    }}
                    alwaysShowSend
                    renderSend={renderSend}
                    renderBubble={renderBubble}
                    scrollToBottom
                    scrollToBottomComponent={scrollToBottomComponent}
                    renderInputToolbar={renderInputToolbar}
                    render
                />
            </View>
        </SafeAreaView>
    )
}


export default ChatRoomPage
