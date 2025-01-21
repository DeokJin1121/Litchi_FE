import React from "react";
import { TouchableOpacity, Text } from "react-native";

const SearchID_Pw = ({ onPress }) => {
    return (
        <TouchableOpacity onPress={onPress}>
            <Text
                style={{
                    color: "#6D7582",
                    textAlign: "center",
                    fontStyle: "normal",
                    fontWeight: 400,
                    fontSize: 18,

                }}
            >아이디 / 비밀번호 찾기</Text>

        </TouchableOpacity>
    );

};

export default SearchID_Pw