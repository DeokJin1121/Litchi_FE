import React, { useState, useCallback } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import GoogleMap from '../../map2/Map2Page';
import { useNavigation } from '@react-navigation/native';
import Popular from './components/PopularList';
import { useFocusEffect } from '@react-navigation/native';

const bottomNavigationHeight = 85;

const MainPage = () => {
    const [mapKey, setMapKey] = useState(0); // 리렌더링을 위한 상태 변수
    const navigation = useNavigation();

    useFocusEffect(
        useCallback(() => {
            // 화면이 포커스를 받을 때 실행되는 로직
            setMapKey(prevKey => prevKey + 1); // mapKey를 업데이트하여 GoogleMap을 리렌더링
        }, [])
    );


    return (
        <ScrollView style={{ flex: 1, backgroundColor: '#fff' }} contentContainerStyle={styles.container}>
            <View style={styles.mapPart}>
                <View style={{ flexDirection: 'row', alignItems: 'baseline', justifyContent: 'space-between' }}>
                    <Text style={styles.mapTitle}>지도</Text>
                    <TouchableOpacity onPress={() => navigation.navigate('Map2Page')}>
                        <Text style={styles.mapDetailBtn}>전체보기</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.map}>
                    <GoogleMap key={mapKey} flex={1} />
                </View>
            </View>
            {/* <View style={{ height: 5, backgroundColor: '#F2F2F2' }}></View> */}
            <View style={styles.popularPart}>
                <View style={{ flexDirection: 'row', alignItems: 'baseline', justifyContent: 'space-between', paddingHorizontal: 20 }}>
                    <Text style={styles.popularTitle}>인기 게시물</Text>
                    <TouchableOpacity onPress={() => navigation.navigate('ProductListPage')}>
                        <Text style={styles.popularDetailBtn}>전체보기</Text>
                    </TouchableOpacity>
                </View>
                <Popular />
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        // padding: 20,
    },
    mapPart: {
        flex: 0.45,
        backgroundColor: '#fff',
        paddingHorizontal: 20,
        paddingVertical: 10,
    },

    mapTitle: {
        color: '#000',
        fontSize: 19,
        fontWeight: 'bold',
        paddingBottom: 10,
        paddingLeft: 10,
    },
    mapDetailBtn: {
        color: '#616161',
        fontSize: 13,
        paddingBottom: 10,
        paddingRight: 5,
        textDecorationLine: 'underline',
    },
    map: {
        flex: 1,
        backgroundColor: '#fff',
        borderRadius: 12,
        overflow: 'hidden',
    },
    popularTitle: {
        color: '#000',
        fontSize: 19,
        fontWeight: 'bold',
        // paddingBottom: 10,
        // paddingLeft: 10,
    },
    popularDetailBtn: {
        color: '#616161',
        fontSize: 13,
        // paddingBottom: 10,
        paddingRight: 5,
        textDecorationLine: 'underline',
    },
    popularPart: {
        flex: 0.5,
        marginBottom: bottomNavigationHeight,
        paddingTop: 10,
        // backgroundColor: 'skyblue',
        // borderRadius: 12,
        // overflow: 'hidden'
    },
});

export default MainPage;
