import React, { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet, Dimensions, FlatList } from 'react-native';
import ProductItem from '../../../tab/main_product_list/components/ProductItem';
import { useIsFocused } from '@react-navigation/native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const bottomNavigationHeight = 85;
const halfScreenWidth = Dimensions.get('window').width / 2;

const Popular = ({ popular }) => {
    const isFocused = useIsFocused();
    const [popularProducts, setPopularProducts] = useState([]);

    useEffect(() => {
        const fetchProducts = async () => {
            console.log('============ 인기게시물 새로고침 ============');
            try {
                const token = await AsyncStorage.getItem('token');
                const response = await axios.get('http://10.200.72.130:8084/api/boards/posts', {
                    headers: { 'Authorization': `Bearer ${token}` },
                });
                console.log('인기 게시물 Response data:', JSON.stringify(response.data, null, 2));
                setPopularProducts(response.data);
                // setLoading(false);
            } catch (error) {
                console.error('인기 게시물 새로고침 오류', error);
                // setLoading(false);
            }
        };

        if (isFocused) fetchProducts();
    }, [isFocused]);

    const renderProductItem = ({ item }) => {
        return (
            <View style={{ marginHorizontal: 6, backgroundColor: '#fff' }}>
                <ProductItem item={item} isPopular={true} />
            </View>
        );
    }

    return (
        <FlatList
            data={popularProducts}
            renderItem={renderProductItem}
            keyExtractor={item => item.boardid.toString()}
            horizontal={true}
            showsHorizontalScrollIndicator={false}
        />
    );
}

const styles = StyleSheet.create({
});

export default Popular;