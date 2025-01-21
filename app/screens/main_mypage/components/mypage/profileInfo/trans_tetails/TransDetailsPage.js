import React, { useState } from 'react';
import { View, ScrollView, StyleSheet, Text } from 'react-native';
import ProductItem from '../../../../../tab/main_product_list/components/ProductItem';
import TransType from './TransType';
import BreakdownType from './BreakdownType';
import { useNavigation } from '@react-navigation/native';

const TransDetailsPage = () => {

  const navigation = useNavigation();
  const [selectedType, setSelectedType] = useState('all'); // 선택된 거래 유형 상태 추가

  const products = []; // 거래 내역에 대한 상품 데이터 배열

  // 임의의 데이터 추가 (필요한 경우)
  for (let i = 0; i < 5; i++) {
    products.push({
      key: `product-${i}`,
      id: i,
      title: `나이키 조던(사이즈 270) 팝니다.`,
      content: '나이키 조던 팝니다. 사이즈는 270이고 네고 가능해요. 관심 있으신 분은 연락주세요.',
      location: '학익 2동',
      type: 'used',
      price: 200000 + i * 10000,
      images: [
        require('../../../../../../assets/images/image.png'),
        require('../../../../../../assets/images/logo/NaverLogo.png'),
        require('../../../../../../assets/images/logo/GoogleLogo.png'),
      ],
      seller: {
        profileImage: require('../../../../../../assets/images/profile.png'),
        nickname: '변덕진',
      },
    });
  } 

  for (let i = 5; i < 10; i++) {
    products.push({
      key: `product-${i}`,
      id: i,
      title: `나이키 조던이랑 물물교환 해요.`,
      content: '나이키 조던 다른 색상으로 물물교환 하고싶습니다. 관심 있으신 분은 연락주세요.',
      location: '용현 4동',
      type: 'trade',
      price: 200000 + i * 10000,
      images: [
        require('../../../../../../assets/images/image.png'),
        require('../../../../../../assets/images/logo/NaverLogo.png'),
        require('../../../../../../assets/images/logo/GoogleLogo.png'),
      ],
      seller: {
        profileImage: require('../../../../../../assets/images/profile.png'),
        nickname: '변덕진',
      },
    });
  } 

  for (let i = 10; i < 15; i++) {
    products.push({
      key: `product-${i}`,
      id: i,
      title: `나이키 조던(사이즈 270) 대여 해드려요.`,
      content: '나이키 조던 대여 해드립니다. 사이즈는 270이며, 1일 1만원에 대여 가능합니다. 관심 있으신 분은 연락주세요.',
      location: '용현 4동',
      type: 'rental',
      price: 10000,
      images: [
        require('../../../../../../assets/images/image.png'),
        require('../../../../../../assets/images/logo/NaverLogo.png'),
        require('../../../../../../assets/images/logo/GoogleLogo.png'),
      ],
      seller: {
        profileImage: require('../../../../../../assets/images/profile.png'),
        nickname: '변덕진',
      },
    });
  } 

  const filteredProducts = products.filter(item => selectedType === 'all' || selectedType === item.type);

  products.sort((a, b) => a.id - b.id); // id 순으로 정렬

  return (
    <View style={styles.container}>
      <View style={styles.productTypeContainer}>
        <Text style={styles.transTypeTitle}>거래 유형 </Text>
        <TransType setSelectedType={setSelectedType} />
        <Text style={styles.transTypeTitle}>거래 내역 </Text>
        <BreakdownType />
      </View>
      <ScrollView contentContainerStyle={styles.scrollViewContent} flexGrow={1} alignItems="center">
        <View style={styles.productListContainer}>
          {filteredProducts.length > 0 ? (
            filteredProducts.map((item , index) => (
              <View key={index} style={styles.column}>
                <ProductItem product={item } isPopular={false} onPress={() => navigation.navigate('ProductDetailPage', { product: item })} />
              </View>
            ))
          ) : (
            <Text style={styles.noProductText}>거래한 내역이 없습니다.</Text>
          )}
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFFFFF',
    flex: 1,
  },
  productTypeContainer: {
    flexDirection: 'row',
    marginBottom: '2%',
    width: '100%',
    height: '5%',
    marginLeft: '1%',
    zIndex: 1000,
  },
  transTypeTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'black',
    marginBottom: '1%',
    marginTop: '2.5%',
    marginLeft: '5%',
  },
  scrollViewContent: {
    paddingBottom: 20,
  },
  productListContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    width: '96%',
  },
  column: {
    width: '50%',
    marginBottom: 10,
  },
  noProductText: {
    textAlign: 'center',
    marginTop: '70%',
    fontSize: 20,
    color: 'gray',
  },
});

export default TransDetailsPage;
