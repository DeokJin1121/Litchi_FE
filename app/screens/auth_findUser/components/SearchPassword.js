import React, { useState } from 'react';
import { View, Text, TextInput, Button, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const SearchPassword = ({ handleFindPassword }) => {

    const navigator = useNavigation();

    const [id, setId] = useState(''); // 아이디 입력
    const [phone, setPhone] = useState(''); // 전화번호 입력
    const [verifyNumber, setVerifyNumber] = useState(''); // 인증번호 입력
    const [timer, setTimer] = useState(0); // 타이머
    const [intervalId, setIntervalId] = useState(null); // 타이머 ID
    const [authCodeValid, setAuthCodeValid] = useState(false); // 인증 코드 유효 상태
    const [isAuthVerified, setIsAuthVerified] = useState(false); // 인증 완료 여부

    const startTimer = () => {
        setTimer(300);
        const id = setInterval(() => {
            setTimer((prevTimer) => {
                if (prevTimer <= 1) {
                    clearInterval(id);
                    setAuthCodeValid(false);
                    Alert.alert('인증 코드 만료', '인증 코드가 만료되었습니다. 다시 요청하세요.');
                    return 0;
                }
                return prevTimer - 1;
            });
        }, 1000);
        setIntervalId(id);
    };

    const requestAuth = async () => {
        console.log('인증요청');
        setAuthCodeValid(true);
        setIsAuthVerified(false);
        Alert.alert('인증 코드 요청 성공', '휴대폰으로 인증 코드를 보냈습니다.');
        startTimer();
    };

    const verifyAuth = async () => {
        if (!authCodeValid) {
            Alert.alert('인증 실패', '인증 코드가 만료되었습니다. 다시 요청하세요.');
            return;
        }
        if (verifyNumber === '1234') {
            setIsAuthVerified(true);
            clearInterval(intervalId);
            Alert.alert('인증 성공', '휴대폰 인증이 완료되었습니다.');
            navigator.navigate('ChangePwPage', { id: id });
        } else {
            Alert.alert('인증 실패', '인증번호가 일치하지 않습니다.');
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.inputContainer}>
                <Text style={styles.label}>아이디</Text>
                <View style={styles.row}>
                    <TextInput
                        style={styles.inputAuthNumber}
                        value={id}
                        onChangeText={setId}
                        placeholder="등록된 아이디"
                    />
                </View>
            </View>
            <View style={styles.inputContainer}>
                <Text style={styles.label}>전화번호</Text>
                <View style={styles.row}>
                    <TextInput
                        style={styles.input}
                        value={phone}
                        onChangeText={setPhone}
                        placeholder="전화번호 입력(-제외)"
                        keyboardType="number-pad"
                        maxLength={11}
                    />
                    <TouchableOpacity style={styles.button} onPress={requestAuth}>
                        <Text style={styles.buttonText}>요청하기</Text>
                    </TouchableOpacity>
                </View>
            </View>
            <View style={styles.inputAuthNumberContainer}>
                <View flex={1}>
                    <TextInput
                        style={styles.inputAuthNumber}
                        placeholder="인증번호"
                        value={verifyNumber}
                        onChangeText={setVerifyNumber}
                    />
                    {isAuthVerified ? (
                        <Text style={[styles.timerText, { color: 'green' }]}>인증 완료!</Text>
                    ) : (
                        timer > 0 && <Text style={styles.timerText}>{`0${Math.floor(timer / 60)} : ${timer % 60}`}</Text>
                    )}
                </View>
                <TouchableOpacity style={[styles.button, !authCodeValid && styles.disabledButton]} onPress={verifyAuth} disabled={!authCodeValid}>
                    <Text style={styles.buttonText}>확인</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        paddingHorizontal: 20,
        paddingTop: 50,
    },
    inputContainer: {
        marginBottom: 15,
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    label: {
        fontSize: 15,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    input: {
        flex: 1,
        height: 49,
        padding: 10,
        borderRadius: 16,
        marginRight: 7,
        backgroundColor: '#f2f2f2',
    },
    button: {
        width: 80,
        height: 49,
        backgroundColor: '#1B263B',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 16,
    },
    buttonText: {
        color: '#fff',
        fontSize: 13,
    },
    inputAuthNumber: {
        flex: 1,
        height: 52,
        padding: 10,
        marginRight: 7,
        borderBottomWidth: 1,
        borderBottomColor: '#f2f2f2',
    },
    inputAuthNumberContainer: {
        flexDirection: 'row',
        marginBottom: 15,
    },
    timerText: {
        position: 'absolute',
        bottom: 17,
        right: 10,
        marginRight: 7,
        fontSize: 12,
        color: '#999B9A',
        marginTop: 5,
    },
    seachIdBtn: {
        backgroundColor: '#1B263B',
        padding: 16,
        width: '100%',
        height: 62,
        marginVertical: 10,
        borderRadius: 20,
        justifyContent: "center",
    },
    disabledButton: {
        backgroundColor: '#ccc',
    },
});

export default SearchPassword;
