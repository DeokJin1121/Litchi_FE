import React, { useEffect, useState, useContext } from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import ProductItem from '../../../../../tab/main_product_list/components/ProductItem';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import { AuthContext } from '../../../../../../contexts/AuthContext';

const GoodTransPage = () => {
  const navigation = useNavigation();
  const { token, nickname } = useContext(AuthContext);
  const [likedProducts, setLikedProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchLikedProducts = async () => {
      try {
        if (!token || !nickname) throw new Error('No token or nickname found');

        const response = await axios.get('http://10.200.72.130:8084/api/boards/liked', {
          params: { nickname: nickname },
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setLikedProducts(response.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchLikedProducts();
  }, [token, nickname]);

  if (loading) {
    return (
      <View style={styles.container}>
        <Text>Loading...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.container}>
        <Text>Error: {error}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <View style={styles.productListContainer}>
          {likedProducts.map((item, index) => (
            <View key={index} style={styles.column}>
              <ProductItem
                item={{ ...item, isLiked: true }} // isLiked 속성을 추가하여 좋아요 상태를 전달
                isPopular={false}
                onPress={() => navigation.navigate('ProductDetailPage', { product: item })}
              />
            </View>
          ))}
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  scrollViewContent: {
    alignItems: 'center',
    paddingBottom: 20,
  },
  productListContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    width: '96%',
  },
  column: {
    width: '48%', // 두 열로 나누기 위해 48%로 설정
    marginBottom: 10,
  },
});

export default GoodTransPage;
