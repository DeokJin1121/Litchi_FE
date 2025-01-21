import React, { useEffect, useState, useCallback } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, BackHandler } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';

const ChangePwPage = ({ route, navigation }) => {
    const { id } = route.params; // 넘어온 아이디, 재설정 시 같이 던져주기
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const handleResetPassword = async () => {
        if (newPassword !== confirmPassword) {
            Alert.alert('오류', '비밀번호가 일치하지 않습니다.');
        } else {
            try {
                const response = await fetch('http://10.200.72.130:8084/api/users/changePassword', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ userid: id, newPassword }),
                });

                if (response.ok) {
                    Alert.alert('성공', '비밀번호가 성공적으로 변경되었습니다.');
                    navigation.navigate('LoginPage');
                } else {
                    const errorMessage = await response.text();
                    Alert.alert('오류', errorMessage);
                }
            } catch (error) {
                Alert.alert('오류', '서버와 통신 중 오류가 발생했습니다.');
            }
        }
    };

    useEffect(() => {
        console.log('아이디 : ', id);
    }, [id]);

    useFocusEffect(
        useCallback(() => {
            const onBackPress = () => {
                Alert.alert('경고', '이 페이지에서 나가실 수 없습니다.');
                return true; // 뒤로가기를 막습니다.
            };

            BackHandler.addEventListener('hardwareBackPress', onBackPress);

            return () => {
                BackHandler.removeEventListener('hardwareBackPress', onBackPress);
            };
        }, [])
    );

    return (
        <View style={styles.container}>
            <View style={styles.inputContainer}>
                <Text style={styles.label}>새 비밀번호</Text>
                <TextInput
                    style={styles.input}
                    value={newPassword}
                    onChangeText={setNewPassword}
                    placeholder="새 비밀번호 입력"
                    secureTextEntry
                />
            </View>
            <View style={styles.inputContainer}>
                <Text style={styles.label}>비밀번호 확인</Text>
                <TextInput
                    style={styles.input}
                    value={confirmPassword}
                    onChangeText={setConfirmPassword}
                    placeholder="비밀번호 확인 입력"
                    secureTextEntry
                />
            </View>
            <TouchableOpacity style={styles.resetButton} onPress={handleResetPassword}>
                <Text style={styles.resetButtonText}>비밀번호 재설정</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        paddingHorizontal: 30,
        paddingTop: 50,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center',
    },
    inputContainer: {
        marginBottom: 15,
    },
    label: {
        fontSize: 15,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    input: {
        height: 49,
        padding: 10,
        borderRadius: 16,
        backgroundColor: '#f2f2f2',
    },
    resetButton: {
        backgroundColor: '#1B263B',
        padding: 16,
        borderRadius: 15,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 20,
    },
    resetButtonText: {
        fontSize: 18,
        color: '#fff',
    },
});

export default ChangePwPage;
