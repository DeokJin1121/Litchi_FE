import React, { useEffect, useState, useLayoutEffect } from 'react';
import { View, Text, StyleSheet, Image, ScrollView, Dimensions, TouchableOpacity, Alert } from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import { MaterialIcons } from '@expo/vector-icons';
import Swiper from 'react-native-swiper';
import { Menu, MenuOptions, MenuOption, MenuTrigger, MenuProvider } from 'react-native-popup-menu';
import Api from '../../src/main/api/Api';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

const ProductDetailPage = () => {
    const route = useRoute();
    const { item } = route.params;
    const [user, setUser] = useState(null);
    const navigation = useNavigation();
    const [isLiked, setIsLiked] = useState(false);

    const joinChat = () => {
        navigation.navigate('ChatRoomPage', { product: item });
    };

    useEffect(() => {
        const fetchUserInfo = async () => {
            try {
                const userInfo = await Api.getUserInfo(item.boardid);
                setUser(userInfo);
                console.log('User Info:', userInfo);
            } catch (error) {
                console.error('Error fetching user info:', error);
            }
        };

        fetchUserInfo();
    }, [item.boardid]);

    const handleDeletePost = async (boardId) => {
        Alert.alert(
            "게시물 삭제",
            "정말로 이 게시물을 삭제하시겠습니까?",
            [
                {
                    text: "취소",
                    style: "cancel"
                },
                {
                    text: "삭제",
                    onPress: async () => {
                        try {
                            await Api.deletePost(boardId);
                            navigation.goBack();
                        } catch (error) {
                            console.error('Error deleting post:', error);
                            Alert.alert("삭제 실패", "게시물을 삭제하는 데 실패했습니다.");
                        }
                    },
                    style: "destructive"
                }
            ],
            { cancelable: true }
        );
    };

    return (
        <MenuProvider>
            <View style={{ flex: 1, backgroundColor: '#fff' }}>
                <ScrollView contentContainerStyle={styles.container}>
                    <View style={styles.imageContainer}>
                        <Swiper style={styles.wrapper} showsButtons={false}>
                            {item.fileUrls && item.fileUrls.map((image, index) => (
                                <View key={index} style={styles.slide}>
                                    <Image source={{ uri: image }} style={styles.image} />
                                </View>
                            ))}
                        </Swiper>
                    </View>
                    <View style={styles.profileContainer}>
                        {user && (
                            <View>
                                <Text style={{ fontWeight: 'bold', fontSize: 14 }}>{user.nickname}</Text>
                            </View>
                        )}
                    </View>
                    <View style={styles.titleContainer}>
                        <Text style={styles.title}>{item.title}</Text>
                        <Menu>
                            <MenuTrigger>
                                <MaterialIcons name="more-vert" size={24} color="black" />
                            </MenuTrigger>
                            <MenuOptions>
                                <MenuOption onSelect={() => handleDeletePost(item.boardid)}>
                                    <Text style={{ padding: 10 }}>삭제</Text>
                                </MenuOption>
                            </MenuOptions>
                        </Menu>
                    </View>
                    <View style={{ paddingHorizontal: 20 }}>
                        <Text style={styles.location}>{item.content}</Text>
                    </View>
                </ScrollView>
                <View style={styles.bottomContainer}>
                    <View style={{ flex: 1, backgroundColor: '#fff', flexDirection: 'row', alignItems: 'center' }}>
                        <TouchableOpacity onPress={() => setIsLiked(!isLiked)}>
                            <MaterialIcons name={isLiked === true ? 'favorite' : 'favorite-border'} size={24} color='red' />
                        </TouchableOpacity>
                        <View style={{ width: 1, height: 45, backgroundColor: '#ccc', marginLeft: 5, marginRight: 15 }} />
                        {item.boardType === 'RENTAL' && <Text style={styles.price}>1일: {item.rentals[0].rental_price} 원</Text>}
                        {item.boardType === 'USED' && <Text style={styles.price}>{item.useds[0].used_price} 원</Text>}
                        {item.boardType === 'TRADE' && <Text style={styles.price}>물물교환</Text>}
                    </View>
                    <TouchableOpacity
                        style={{ backgroundColor: 'orange', width: 90, height: 45, borderRadius: 10, alignItems: 'center', justifyContent: 'center' }}
                        onPress={joinChat}>
                        <Text>채팅하기</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </MenuProvider>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
        paddingBottom: 120,
    },
    titleContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 20,
    },
    title: {
        fontSize: 23,
        fontWeight: 'bold',
        marginVertical: 10,
        marginBottom: 20,
    },
    location: {
        fontSize: 15,
        marginBottom: 10,
    },
    price: {
        fontSize: 19,
        fontWeight: 'bold',
    },
    imageContainer: {
        height: height * 0.38,
    },
    wrapper: {},
    slide: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
    },
    image: {
        width: '100%',
        height: '100%',
        resizeMode: 'cover',
        backgroundColor: '#D8D8D8',
    },
    bottomContainer: {
        flexDirection: 'row',
        position: 'absolute',
        height: 100,
        bottom: 0,
        left: 0,
        right: 0,
        paddingHorizontal: 35,
        paddingBottom: 17,
        alignItems: 'center',
        borderTopColor: '#ccc',
        borderTopWidth: 1,
    },
    profileContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginHorizontal: 10,
        paddingVertical: 10,
        backgroundColor: '#fff',
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
    },
    profileImage: {
        width: 50,
        height: 50,
        borderRadius: 25,
        marginRight: 10,
        marginLeft: 5,
    },
});

export default ProductDetailPage;
