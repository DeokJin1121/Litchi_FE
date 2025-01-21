import React from "react";
import { TouchableOpacity, Text } from "react-native";

const RegisterBtn = ({ onPress, disabled }) => {
    return (
        <TouchableOpacity
            style={{
                position: 'absolute',
                bottom: 0,
                left: 30,
                right: 30,
                backgroundColor: disabled ? '#ccc' : '#1B263B', // disabled 상태에 따라 배경색 변경
                padding: 16,
                //margin: 10,
                // width: '100%',
                height: 62,
                borderRadius: 20,
                justifyContent: "center",
                marginBottom: 38,
            }}
            onPress={onPress}
            disabled={disabled}
        >
            <Text style={{
                fontSize: 24,
                color: '#fff',
                textAlign: "center",
            }}>가입완료</Text>
        </TouchableOpacity>

    );
};

export default RegisterBtn;