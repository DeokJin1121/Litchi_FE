import React, { useState } from 'react';
import { Text, View, TextInput, StyleSheet, Keyboard, TouchableWithoutFeedback } from 'react-native';
import LoginButton from './components/LoginButton';
import SNSLoginNav from './components/SNSLoginNav';
import SNSLoginLogo from './components/SNSLoginLogo';
import SearchID_Pw from './components/SearchID_Pw';
import Signup from './components/Signup';
import { useNavigation } from '@react-navigation/native';

const LoginPage = () => {
    const [userid, setUserid] = useState('');
    const [password, setPassword] = useState('');
    const navigator = useNavigation();


    console.log("Current UserID:", userid);
    console.log("Current Password:", password);

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={styles.container}>
                <Text style={styles.loginTitle}>Login</Text>
                <Text style={styles.loginDescription}>
                    Please sign in continue.
                </Text>
                <TextInput
                    style={styles.input}
                    placeholder="ID"
                    value={userid}
                    onChangeText={setUserid}
                />
                <TextInput
                    style={styles.input}
                    value={password}
                    onChangeText={setPassword}
                    secureTextEntry={true}
                    placeholder="PW"
                />
                <LoginButton userid={userid} password={password} />
                <SNSLoginNav text="소셜 로그인" />
                <SNSLoginLogo />
                <SearchID_Pw onPress={() => navigator.navigate("SearchUserPage")} />
                <Signup text="회원가입" />
            </View>
        </TouchableWithoutFeedback>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        paddingLeft: 30,
        paddingRight: 30,
        justifyContent: 'center',
    },
    loginTitle: {
        fontSize: 48,
        fontWeight: "bold",
        marginBottom: 10,
        textAlign: "left",
    },
    loginDescription: {
        fontSize: 20,
        fontWeight: "500",
        marginBottom: 10,
        color: "#999B9A",
    },
    input: {
        width: '100%',
        height: 59,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 10,
        padding: 10,
        borderRadius: 20,
    },
});

export default LoginPage;
