import { useNavigation } from "@react-navigation/native";
import React from "react";
import {Text, View, TouchableOpacity} from "react-native";


const Postsubmission = ({text}) => {

    const navigation = useNavigation();

    const ClickPostPage = () =>{
        console.log("게시물 등록 페이지 넘어가기");
        navigation.navigate('PostSubmissionPage');

    };

    return(
        <TouchableOpacity onPress={ClickPostPage}>
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

export default Postsubmission;