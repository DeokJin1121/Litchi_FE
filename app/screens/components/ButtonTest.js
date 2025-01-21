import React from "react";
import { TouchableOpacity, Text} from "react-native";
import { useNavigation } from "@react-navigation/native";

const ButtonTest = ({text}) => {
    const navigation = useNavigation();

    const clicTestUpBtn = () => {
        console.log('테스트 화면 넘어가기');
        navigation.navigate('Test2'); // Test2 스크린으로 네비게이션.
    };

    return(
        <TouchableOpacity onPress={clicTestUpBtn}>
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

export default ButtonTest;
