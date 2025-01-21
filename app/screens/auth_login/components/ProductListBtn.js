import React from "react";
import { TouchableOpacity, Text } from "react-native";
import { useNavigation } from "@react-navigation/native";


const ProductListBtn = ({ text }) => {

    const navigation = useNavigation();


    const clickListBtn = () => {
        console.log('상품리스트 화면 넘어가기');
        navigation.navigate('Root');

    };

    return (
        <TouchableOpacity onPress={clickListBtn}>
            <Text
                style={{
                    color: "#6D7582",
                    fontSize: 18,
                    fontWeight: 400,
                    textAlign: "center",
                }}>
                {text}
            </Text>
        </TouchableOpacity>
    );
};
export default ProductListBtn;