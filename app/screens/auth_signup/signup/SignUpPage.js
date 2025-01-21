import React, { useState } from 'react';
import { View, TextInput, Text, StyleSheet, TouchableOpacity, ScrollView, TouchableWithoutFeedback, Keyboard, KeyboardAvoidingView, Platform, Modal, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import RegisterBtn from './components/RegisterBtn';
import { useNavigation } from '@react-navigation/native';
import ConfirmPopUp from '../../modal/ConfirmPopUp';
import useSignUpForm from './components/UseSignUpForm';
import InputField from './components/InputFireld';
import Postcode from '@actbase/react-daum-postcode';
// import jwtDecode from 'jwt-decode';  // jwt 디코딩 라이브러리

const SignUpPage = ({ navigation }) => {
    const {
        id, password, confirmPassword, nickname, region, phone, authNumber,
        setId, setPassword, setConfirmPassword, setNickname, setRegion, setPhone, setAuthNumber,
        checkDuplicateId, checkDuplicateNickname, requestAuth, verifyAuth,
        isAuthVerified, timer, confirmationVisible, setConfirmationVisible
    } = useSignUpForm(navigation);

    const [modalVisible, setModalVisible] = useState(false);
    const [showPassword, setShowPassword] = useState(false); // 비밀번호 표시 상태
    const [showConfirmPassword, setShowConfirmPassword] = useState(false); // 비밀번호 확인 표시 상태

    const handleSignUp = async () => {
        try {
            const response = await axios.post('http://10.200.72.130:8084/api/users/register', {
                userid: id,
                password: password,
                nickname: nickname,
                region: region,
                phone: phone
            });

            // 서버로부터 받은 응답 데이터 출력 (token값)
            console.log('Response data:', response.data);

            if (response.status === 200) {
                const token = response.data; // 토큰 추출, response.data가 객체가 아니므로 token에 바로 대입

                // token이 null이나 undefined 값이 아니면 AsyncStorage에 저장, 회원가입 완료 팝업창 표시
                if (token) {
                    await AsyncStorage.setItem('jwtToken', token);
                    await AsyncStorage.setItem('userNickname', nickname);
                    await AsyncStorage.setItem('userRegion', region);
                    setConfirmationVisible(true);
                } else { // token이 null이나 undefined 값이면 에러 메시지 출력
                    console.error("Invalid response data:", response.data);
                    Alert.alert("Sign up failed", "Invalid response data from server");
                }
            } else {
                // 서버 응답이 200이 아닌 경우 에러 메시지 출력
                Alert.alert('회원가입 실패', '서버와의 통신에 실패했습니다.');
            }
        } catch (error) {
            console.error("회원가입 실패:", error.response?.data || error);
            // 서버에서 받을 에러 메시지에 따라 다른 Alert 메시지 출력
            if (error.response?.data === 'UserID already exists') { // ID 중복
                Alert.alert("이미 존재하는 아이디입니다.");
            } else if (error.response?.data === 'Nickname already exists') { // 닉네임 중복
                Alert.alert("이미 존재하는 닉네임입니다.");
            } else { // 기타 오류
                Alert.alert("회원가입 실패", "서버와의 통신에 실패했습니다.");
            }
        }
    };

    const getAddressData = (data) => {
        let defaultAddress = ''; // 기본주소
        if (data.buildingName === 'N') {
            defaultAddress = data.apartment;
        } else {
            defaultAddress = data.buildingName;
        }

        setRegion(data.address + ' ' + defaultAddress);
        setModalVisible(false);
    };

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'} // Platform을 사용
            style={styles.KeyboardContainer}
        >
            <View style={{ flex: 1, backgroundColor: '#fff' }}>
                <ScrollView contentContainerStyle={styles.scrollViewContent}>
                    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                        <View style={styles.container}>
                            <Text style={styles.title}>Sign Up</Text>
                            <InputField label="아이디" value={id} onChangeText={setId} placeholder="아이디" buttonLabel="중복확인" onButtonPress={checkDuplicateId} />
                            <View style={styles.inputContainer}>
                                <TextInput
                                    style={styles.inputField}
                                    value={password}
                                    onChangeText={setPassword}
                                    placeholder="비밀번호 (특수기호, 대 소문자, 숫자 포함 8자 이상 입력)"
                                    secureTextEntry={!showPassword}
                                />
                                <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                                    <Text style={styles.toggleButton}>{showPassword ? '숨기기' : '표시'}</Text>
                                </TouchableOpacity>
                            </View>
                            <View style={styles.inputContainer}>
                                <TextInput
                                    style={styles.inputField}
                                    value={confirmPassword}
                                    onChangeText={setConfirmPassword}
                                    placeholder="비밀번호 확인"
                                    secureTextEntry={!showConfirmPassword}
                                />
                                <TouchableOpacity onPress={() => setShowConfirmPassword(!showConfirmPassword)}>
                                    <Text style={styles.toggleButton}>{showConfirmPassword ? '숨기기' : '표시'}</Text>
                                </TouchableOpacity>
                            </View>
                            <InputField label="닉네임" value={nickname} onChangeText={setNickname} placeholder="닉네임" buttonLabel="중복확인" onButtonPress={checkDuplicateNickname} />
                            <InputField label="지역" value={region} onChangeText={setRegion} placeholder="지역" buttonLabel="검색" onButtonPress={() => setModalVisible(true)} />
                            <InputField label="휴대전화 인증" value={phone} onChangeText={setPhone} placeholder="전화번호" buttonLabel="인증요청" onButtonPress={requestAuth} />
                            <View style={styles.inputContainer}>
                                <View flex={1}>
                                    <TextInput
                                        style={styles.inputAuthNumber}
                                        placeholder="인증번호"
                                        value={authNumber}
                                        onChangeText={setAuthNumber}
                                    />
                                    {isAuthVerified ? (
                                        <Text style={[styles.timerText, { color: 'green' }]}>인증 완료!</Text>
                                    ) : (
                                        timer > 0 && <Text style={styles.timerText}>{`0${Math.floor(timer / 60)} : ${timer % 60}`}</Text>
                                    )}
                                </View>
                                <TouchableOpacity style={styles.button} onPress={verifyAuth}>
                                    <Text style={styles.buttonText}>확인</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </TouchableWithoutFeedback>
                </ScrollView>
                <View style={styles.registerBtnContainer}>
                    <RegisterBtn onPress={handleSignUp} />
                </View>
            </View>
            <Modal
                visible={modalVisible}
                onRequestClose={() => setModalVisible(false)}
                transparent={true}
                animationType="slide"
            >
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        <Postcode
                            style={{ flex: 1, width: '100%' }}
                            jsOptions={{ animation: true }}
                            onSelected={getAddressData}
                            onError={(error) => {
                                console.error(error);
                                setModalVisible(false);
                            }}
                        />
                        <TouchableOpacity onPress={() => setModalVisible(false)}>
                            <Text style={styles.closeButton}>Close</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
            <ConfirmPopUp
                visible={confirmationVisible}
                text={<Text style={styles.popupText}>
                    회원가입이 완료되었습니다.{'\n'}
                    <Text style={styles.boldNickname}>{nickname}</Text>님 환영해요!
                </Text>}
                isPost={false}
                onConfirm={() => navigation.navigate('LoginPage')}
            />
        </KeyboardAvoidingView>
    );
};

const styles = StyleSheet.create({
    KeyboardContainer: {
        flex: 1,
    },
    scrollViewContent: {
        flexGrow: 1,
        backgroundColor: '#fff',
        paddingBottom: 10,
    },
    container: {
        backgroundColor: '#fff',
        paddingHorizontal: 30,
        paddingTop: 20,
    },
    title: {
        fontSize: 48,
        fontWeight: "bold",
        marginBottom: 20,
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#f2f2f2',
        height: 52, // 높이를 통일
    },
    inputField: {
        flex: 1,
        height: '100%', // 부모 높이에 맞추기
        padding: 10,
    },
    inputAuthNumber: {
        flex: 1,
        height: 52,
        padding: 10,
        marginRight: 7,
        borderBottomWidth: 1,
        borderBottomColor: '#f2f2f2',
    },
    button: {
        width: 80,
        height: 52,
        backgroundColor: '#1B263B',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 16,
    },
    timerText: {
        position: 'absolute',
        bottom: 17,
        right: 10,
        marginRight: 7,
    },
    buttonText: {
        color: '#fff',
        fontSize: 13,
    },
    toggleButton: {
        color: '#1B263B',
        fontWeight: 'bold',
        padding: 10,
    },
    registerBtnContainer: {
        backgroundColor: '#fff',
        height: 110,
    },
    popupText: {
        fontSize: 17,
        textAlign: 'center',
    },
    boldNickname: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.5)',
    },
    modalContent: {
        width: '80%',
        height: '60%',
        backgroundColor: 'white',
        borderRadius: 10,
        padding: 20,
        justifyContent: 'center',
        alignItems: 'center',
    },
    closeButton: {
        color: 'red',
        marginTop: 10,
    },
});

export default SignUpPage;
