import React from 'react';
import { TouchableOpacity,Text } from "react-native";
import { useNavigation } from '@react-navigation/native';

const AgreeTermsButton = ({ isChecked1, isChecked2 }) => {
    const isActivated = isChecked1 && isChecked2;
    
    const navigation = useNavigation();
    
    const clickAgreeTermsBtn = () => {
        console.log('회원가입 화면 넘어가기');
        navigation.navigate('SignUpPage'); // PhoneAuthPage로 네비게이션

    };

    return (
        <TouchableOpacity
            style={{
                backgroundColor: isActivated ? '#1B263B' : 'gray', // 체크 여부에 따라 배경색 변경
                padding: 16,
                //margin: 10,
                width: '100%',
                height: 62,
                marginVertical: 10,
                borderRadius: 20,
            }}
            onPress={isActivated ? clickAgreeTermsBtn : null}
            disabled={!isActivated}
        >
            <Text style={{
                fontSize: 24,
                color: '#fff',
                textAlign: "center",
            }}>다음</Text>
        </TouchableOpacity>
    );
};

export default AgreeTermsButton;