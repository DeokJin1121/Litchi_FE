import React, { useContext } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import ProfileInfo from '../main_mypage/components/mypage/profileInfo/ProfileInfo';
import ActiveArea from './components/mypage/active_area/ActiveArea';
import ProductItem from '../tab/main_product_list/components/ProductItem';
import { AuthContext } from '../../contexts/AuthContext';

const MyPage = ({ navigation }) => {
  const { nickname } = useContext(AuthContext);

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
        require('../../assets/images/image.png'),
        require('../../assets/images/logo/NaverLogo.png'),
        require('../../assets/images/logo/GoogleLogo.png'),
      ],
      seller: {
        profileImage: require('../../assets/images/profile.png'),
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
        require('../../assets/images/image.png'),
        require('../../assets/images/logo/NaverLogo.png'),
        require('../../assets/images/logo/GoogleLogo.png'),
      ],
      seller: {
        profileImage: require('../../assets/images/profile.png'),
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
        require('../../assets/images/image.png'),
        require('../../assets/images/logo/NaverLogo.png'),
        require('../../assets/images/logo/GoogleLogo.png'),
      ],
      seller: {
        profileImage: require('../../assets/images/profile.png'),
        nickname: '변덕진',
      },
    });
  }

  products.sort((a, b) => a.id - b.id); // id 순으로 정렬

  return (
    <View style={styles.container}>
      <ProfileInfo navigation={navigation} />
      <ActiveArea />
      <View style={styles.TradeAreaBlock}>
        <View style={styles.headerContainer}>
          <Text style={styles.tradeHistoryText}>거래중인 상품</Text>
        </View>
        <ScrollView horizontal={true} style={styles.scrollView}>
          <View style={[styles.productListContainer]}>
            {products.map((item, index) => (
              <View key={index} style={styles.column}>
                <ProductItem product={item} isPopular={false} onPress={() => navigation.navigate('ProductDetailPage', { product: item })} />
              </View>
            ))}
          </View>
        </ScrollView>
        <ScrollView horizontal={true} style={styles.scrollView}>
          <View style={styles.productListContainer}>
            {products.map((item, index) => (
              <View key={index} style={styles.column}>
                <ProductItem product={item} isPopular={false} onPress={() => navigation.navigate('ProductDetailPage', { product: item })} />
              </View>
            ))}
          </View>
        </ScrollView>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    paddingTop: '5%',
    backgroundColor: "#FFFFFF",
  },

  TradeAreaBlock: {
    width: '100%',
    height: '40%',
    marginTop: '5%', // 간격 조정
    backgroundColor: '#FFF',
    borderRadius: 10,
    paddingHorizontal: '1%', // 내부 간격 추가
    paddingVertical: '1%', // 내부 간격 추가
    // borderWidth: 1, // 테두리 두께
    // borderColor: '#f4f4f4', // 테두리 색상
  },

  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 15,
  },

  tradeHistoryText: {
    fontSize: 18,
    fontWeight: 'bold',
  },

  scrollView: {
    marginTop: 0,
  },

  productListContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },

  column: {
    width: '6%',
  },
});

export default MyPage;
