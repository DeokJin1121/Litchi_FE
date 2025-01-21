import React from "react";
import { View, Text, FlatList, StyleSheet } from "react-native";
import {
    Container,
    Card,
    UserInfo,
    UserImgWrapper,
    UserImg,
    UserInfoText,
    UserName,
    PostTime,
    MessageText,
    TextSection,
} from "./styles/MessageStyle";

const Chats = [
    {
        id: '1',
        userName: "User1",
        userImg: require("../../../assets/images/profile.png"),
        messageTime: "13분 전",
        messageText: "어디세요??"
    },

    {
        id: '2',
        userName: "User2",
        userImg: require("../../../assets/images/profile.png"),
        messageTime: "3분 전",
        messageText: "안녕하세요."
    },

    {
        id: '3',
        userName: "User3",
        userImg: require("../../../assets/images/profile.png"),
        messageTime: "2시간 전",
        messageText: "아직 판매 하시나요?"
    },
]

const MessagesScreen = ({ navigation }) => {
    return (
        <Container>
            {/* <View style={{ flex: 1 }}> */}
                <FlatList
                    data={Chats}
                    keyExtractor={item => item.id}
                    renderItem={({ item }) => (
                        <Card onPress={() => navigation.navigate('ChatRoomPage', { userName: item.userName })}>
                            <UserInfo>
                                <UserImgWrapper>
                                    <UserImg source={item.userImg} />
                                </UserImgWrapper>
                                <TextSection>
                                    <UserInfoText>
                                        <UserName>{item.userName}</UserName>
                                        <PostTime>{item.messageTime}</PostTime>
                                    </UserInfoText>
                                    <MessageText>{item.messageText}</MessageText>
                                </TextSection>
                            </UserInfo>
                        </Card>
                    )}
                />
            {/* </View> */}
        </Container>
    );
};

export default MessagesScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
});