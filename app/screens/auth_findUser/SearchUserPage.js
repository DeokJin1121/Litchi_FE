import React, { useState } from 'react';
import { View, Text, TextInput, Button, TouchableOpacity, StyleSheet, KeyboardAvoidingView, TouchableWithoutFeedback, Keyboard, Platform } from 'react-native';
import SearchID from './components/SearchID';
import SearchPassword from './components/SearchPassword';

const SearchUserPage = () => {
    const [selectedTab, setSelectedTab] = useState('findId'); // 선택된 탭
    const [userid, setUserId] = useState(null); // 서버에서 받아올 아이디를 저장하는 상태
    const [error, setError] = useState(null); // 서버에서 받아올 에러를 저장하는 상태
    // const [userPassword, setUserPassword] = useState(null); // 서버에서 받아올 비밀번호를 저장하는 상태

    const handleFindId = async (phone) => {
        try {
            const response = await fetch('http://10.200.72.130:8084/api/users/findByPhone', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ phone }),
            });
            if (response.ok) {
                const data = await response.json();
                console.log('Response data:', data);
                setUserId(data.userid);
                setError(null)
            }else{
                const errorMessage = await response.text();
                console.error("error response:", errorMessage);
                setError(errorMessage);
                setError(null);
            }
            
        } catch (error) {
            console.error("error : " , error);
            setError('서버와 통신 중 오류가 발생했습니다.');
            setUserId(null);
            
        }
        // if (exampleUserId === null) {
        //     setError('해당하는 아이디가 없습니다.');
        // } else {
        //     setUserId(exampleUserId);
        // }
    };

    const handleFindPassword = () => {


    };

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={{ flex: 1 }}
        >
            <TouchableWithoutFeedback onPress={Keyboard.dismiss} >
                <View style={styles.container}>
                    <View style={styles.tabContainer}>
                        <TouchableOpacity
                            style={[styles.tab, selectedTab === 'findId' && styles.activeTab]}
                            onPress={() => setSelectedTab('findId')}
                        >
                            <Text style={styles.tabText}>아이디 찾기</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={[styles.tab, selectedTab === 'findPassword' && styles.activeTab]}
                            onPress={() => setSelectedTab('findPassword')}
                        >
                            <Text style={styles.tabText}>비밀번호 찾기</Text>
                        </TouchableOpacity>
                    </View>
                    {/* ID찾기 탭일 때 */}
                    {selectedTab === 'findId' && (
                        <SearchID handleFindId={handleFindId} userid={userid} error={error} />
                    )}
                    {/* 비밀번호 찾기 탭일 때 */}
                    {selectedTab === 'findPassword' && (
                        <SearchPassword handleFindPassword={handleFindPassword} />
                    )}
                </View>
            </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: '#fff',
    },
    tabContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginBottom: 16,
    },
    tab: {
        paddingVertical: 8,
        paddingHorizontal: 16,
        borderBottomWidth: 2,
        borderBottomColor: 'transparent',
    },
    activeTab: {
        borderBottomColor: '#000',
    },
    tabText: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    contentContainer: {
        padding: 16,
    },
    header: {
        fontSize: 20,
        marginBottom: 10,
        fontWeight: 'bold',
    },
    input: {
        height: 40,
        borderColor: '#ccc',
        borderWidth: 1,
        marginBottom: 10,
        paddingLeft: 8,
    },
    timerText: {
        position: 'absolute',
        bottom: 17,
        right: 10,
        marginRight: 7,
    },
    inputContainer: {
        flexDirection: 'row',
        marginBottom: 15,
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
    buttonText: {
        color: '#fff',
        fontSize: 13,
    },

});

export default SearchUserPage;
