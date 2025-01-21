import React from "react";
import { TouchableOpacity, Text} from "react-native";
import { useNavigation } from "@react-navigation/native";


const Signup = ({text}) => {

    const navigation = useNavigation();


    const clickSignUpBtn = () => {
        console.log('회원가입 화면 넘어가기');
        navigation.navigate('AgreeTermsPage');
        
    };

    return(
        <TouchableOpacity onPress={clickSignUpBtn}>
            <Text 
            style={{
                color: "#6D7582",
                fontSize:18,
                fontWeight: 400,
                textAlign:"center",
            }}>
                {text}
            </Text>
        </TouchableOpacity>
    );
};

export default Signup;