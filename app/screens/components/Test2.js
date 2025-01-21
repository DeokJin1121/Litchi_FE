import React from "react";
import { View, Text, StyleSheet, Image, Dimensions, TouchableOpacity } from "react-native";
import Home from "../../assets/icon/Home.png";
import heart from "../../assets/icon/heart.png";
import mypage from "../../assets/icon/mypage.png";
import chat from "../../assets/icon/chat.png";
import plus from "../../assets/icon/plus.png";


const Test2 = () => {

    const windowWidth = Dimensions.get('window').width;

    const press = (icon) => {
        console.log(`${icon}` + " 아이콘을 클릭하였습니다.");
    }

    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={() => press("홈화면")}>
                {/*각각 아이콘 마다 다른 터치 모션을 줌*/}
                <Image source={Home} style={[styles.image, { marginHorizontal: windowWidth * 0.01 }]} />
            </TouchableOpacity >
            <TouchableOpacity onPress={() => press("관심목록")}>
                <Image source={heart} style={[styles.image, { marginHorizontal: windowWidth * 0.03 }]} />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => press("게시물 등록")}>
                <Image source={plus} style={[styles.image, { marginHorizontal: windowWidth * 0.03 }]} />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => press("채팅")}>
                <Image source={chat} style={[styles.image, { marginHorizontal: windowWidth * 0.03 }]} />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => press("마이페이지")}>
                <Image source={mypage} style={[styles.image, { marginHorizontal: windowWidth * 0.02 }]} />
            </TouchableOpacity>

        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        position: "absolute",
        bottom: "4%",
        width: "90%",
        height: 70,
        backgroundColor: "#1B263B",
        borderRadius: 28,
        justifyContent: "center",
        alignItems: "center",
        left: "5%",
        flexDirection: "row", // 이미지들을 가로로 배치.
    },
    image: {
        width: 43,
        height: 43,
        //marginHorizontal: "1%", // 이미지 간격을 조정.
        //marginVertical: 15,
    }
});


export default Test2;
