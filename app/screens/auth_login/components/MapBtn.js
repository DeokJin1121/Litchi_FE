import React from "react";
import { TouchableOpacity, Text } from "react-native";
import { useNavigation } from "@react-navigation/native";


const MapBtn = ({ text }) => {

    const navigation = useNavigation();


    const clickListBtn = () => {
        console.log('지도 화면 넘어가기');
        navigation.navigate('MapPage');

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
export default MapBtn;