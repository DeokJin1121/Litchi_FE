import React from 'react';
import { StyleSheet, ImageBackground, Text } from 'react-native';

export default class Loading extends React.Component {
    render() {
        return (
            <ImageBackground
                source={require("../../assets/images/logo/Litchi_logo.png")}
                style={styles.imageBackground}
                resizeMode="contain">
                <Text style={styles.text}> Litch</Text>
            </ImageBackground>
        );
    }
}

const styles = StyleSheet.create({
    imageBackground: {
        flex: 1,
        alignItems: 'center',  // 이미지를 수평 중앙에 배치
        justifyContent: 'center',  // 이미지를 수직 중앙에 배치
        marginVertical: '25%',
        marginHorizontal: '25%',
    },
    text: {
        textAlign: 'center',  // 텍스트를 수평 중앙에 배치
        fontSize: 25,
        fontWeight: 'bold',
        color: '#000000', // 텍스트 색상을 흰색으로 지정
        marginTop: '65%', // 텍스트와 아이콘 사이의 간격 조절

    },
});
