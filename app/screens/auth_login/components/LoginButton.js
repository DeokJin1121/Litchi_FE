import React, { useContext } from "react";
import { TouchableOpacity, Text, Alert } from "react-native";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import { AuthContext } from "../../../contexts/AuthContext";

const LoginButton = ({ userid, password }) => {
    const navigation = useNavigation();
    const { login } = useContext(AuthContext);

    const handleLogin = async () => {
        try {
            const response = await axios.post('http://10.200.72.130:8084/api/login', {
                userid,
                password
            });

            const { token, nickname, region } = response.data;
            if (!token) {
                throw new Error("No token received from server");
            }

            console.log("Login successful, token:", token, "nickname:", nickname, "region:", region); // 로그 추가

            await login(token, nickname, region); // 로그인 함수에 닉네임 전달
            navigation.navigate('Root');
        } catch (error) {
            console.error("Login failed:", error);
            Alert.alert("Login failed", error.response?.data || "An error occurred");
        }
    };

    return (
        <TouchableOpacity
            style={{
                backgroundColor: '#1B263B',
                padding: 16,
                width: '100%',
                height: 62,
                marginVertical: 10,
                borderRadius: 20,
                justifyContent: "center",
            }}
            onPress={handleLogin}
        >
            <Text style={{
                fontSize: 24,
                color: '#fff',
                textAlign: "center",
            }}>로그인</Text>
        </TouchableOpacity>
    );
};

export default LoginButton;
