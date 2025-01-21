import React from "react";
import { TouchableOpacity, View, Image, StyleSheet, Dimensions } from "react-native";
import { useNavigation } from "@react-navigation/native";
import KakaoLogo from "../../../assets/images/logo/kakaoLogo.png";
import NaverLogo from "../../../assets/images/logo/NaverLogo.png";
import GoogleLogo from "../../../assets/images/logo/GoogleLogo.png"


const SNSLoginLogo = () => {
    
    const windowWidth = Dimensions.get('window').width;
    const navigation = useNavigation();

    const Click =(sns) => {
        console.log(`${sns}` + " 로고가 클릭되었습니다 !");
        switch(sns){
            case 'Kakao':
                navigation.navigate('KakaoLoginPage');
                break;
            case'Google':
                navigation.navigate('GoogleLoginPage');
                break;
            default:
                console.log('Unknown SNS');
        }
    }

    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={() => Click("Kakao")}>
                <Image source={KakaoLogo} style={[styles.image, {marginHorizontal : windowWidth * 0.05}]} />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => Click("Naver")}>
                <Image source={NaverLogo} style={[styles.image, {marginHorizontal : windowWidth * 0.05}]}/>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => Click("Google")}>
                <Image source={GoogleLogo} style={[styles.image, {marginHorizontal : windowWidth * 0.05}]}/>
            </TouchableOpacity>
        </View>
        
    );
};

const Click = (sns) =>{
    console.log(`${sns}` + " 로고가 클릭되었습니다 !");
};

const styles = StyleSheet.create({
    container: {
        display:"flex",
        alignItems: "center",
        justifyContent:"center", 
        flexDirection: "row",
    },
    image: {
        width: 55,
        height: 55,
        marginVertical: 15,
    },
});

export default SNSLoginLogo;
