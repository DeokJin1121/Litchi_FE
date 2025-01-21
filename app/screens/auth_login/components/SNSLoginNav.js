import React from "react";
import {Text, View} from "react-native";

const SNSLoginNav = ({ text }) => {
    return (
        <View
            style={{
                flexDirection: "row",
                alignItems: "center",
                marginVertical: 10,
            }}
        >
            <View
                style={{
                    flex: 1,
                    borderBottomWidth: 1,
                    borderBottomColor: "#aaa",
                    marginRight: 10,
                }}
            />
            <Text 
                style={{ 
                    fontSize: 16,
                    color: "#333",
                    fontWeight: "400", 
                  }}>{text}</Text>
            <View
                style={{
                    flex: 1,
                    borderBottomWidth: 1,
                    borderBottomColor: "#aaa",
                    marginLeft: 10,
                }}
            />
        </View>
    );
};



export default SNSLoginNav;
