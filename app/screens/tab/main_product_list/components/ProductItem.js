import React, { useState, useContext } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AuthContext } from '../../../../contexts/AuthContext';
import { useNavigation } from '@react-navigation/native';

const windowWidth = Dimensions.get('window').width;

const ProductItem = ({ item, isPopular }) => {
  const navigation = useNavigation();

  if (!item || !item.fileUrls) return null;

  const [isLiked, setIsLiked] = useState(item.isLiked || false); // item에 isLiked 속성이 있다고 가정
  const { nickname } = useContext(AuthContext);

  const handleLikeToggle = async () => {
    setIsLiked(!isLiked);
    const token = await AsyncStorage.getItem('jwtToken');
    if (!token) return;

    try {
      const response = await axios.post(`http://10.200.72.130:8084/api/boards/${item.boardid}/like`, null, {
        params: {
          nickname: nickname
        },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      // 서버 응답에 따라 좋아요 상태를 설정
      if (response.data.success) {
        setIsLiked(response.data.isLiked);
      }
    } catch (error) {
      console.error('Like error:', error.response ? error.response.data : error.message);
    }
  };

  const renderPrice = () => {
    switch (item.boardType) {
      case 'USED':
        return item.useds && item.useds.length > 0 ? `${item.useds[0].used_price} 원` : 'Price not available';
      case 'RENTAL':
        return item.rentals && item.rentals.length > 0 ? `${item.rentals[0].rental_price} 원` : '대여';
      case 'TRADE':
        return item.trades && item.trades.length > 0 ? item.trades[0].trade_product : '물물교환';
      default:
        return '';
    }
  };

  return (
    <TouchableOpacity onPress={() => navigation.navigate('ProductDetailPage', { item: item })}>
      <View style={styles.productItem} height={isPopular ? '100%' : windowWidth * 0.5 - 23 + 103}>
        <View style={styles.slide}>
          {item.fileUrls.length > 0 ? (
            <Image source={{ uri: item.fileUrls[0] }} style={styles.productImage} resizeMode='cover' />
          ) : (
            <Image source={require('../../../../assets/images/icon.png')} style={styles.productImage} resizeMode='cover' />
          )}
          <TouchableOpacity style={styles.likeButton} onPress={handleLikeToggle}>
            <MaterialIcons name={isLiked ? 'favorite' : 'favorite-border'} size={24} color="red" />
          </TouchableOpacity>
        </View>
        <Text style={styles.productName}>{item.title}</Text>
        <Text style={styles.productLocation}>{item.location || 'Unknown Location'}</Text>
        <Text style={styles.productPrice}>{renderPrice()}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  productItem: {
    width: '100%',
    backgroundColor: '#fff',
    paddingVertical: 10,
    alignItems: 'center',
  },
  slide: {
    width: windowWidth * 0.5 - 22,
    height: windowWidth * 0.5 - 22,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#D8D8D8',
    borderRadius: 13,
  },
  productImage: {
    width: windowWidth * 0.5 - 22,
    height: windowWidth * 0.5 - 22,
    borderRadius: 13,
  },
  productName: {
    fontSize: 15,
    fontWeight: 'bold',
    marginTop: 10,
    alignSelf: 'flex-start',
    paddingHorizontal: 8,
  },
  productLocation: {
    fontSize: 13,
    color: '#888',
    alignSelf: 'flex-start',
    paddingHorizontal: 8,
  },
  productPrice: {
    fontSize: 16,
    fontWeight: 'bold',
    alignSelf: 'flex-start',
    paddingHorizontal: 8,
  },
  likeButton: {
    position: 'absolute',
    top: '8%',
    right: '8%',
  },
});

export default ProductItem;
