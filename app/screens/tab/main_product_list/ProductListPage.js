import React, { useState, useEffect } from 'react';
import { View, FlatList, StyleSheet, ActivityIndicator } from 'react-native';
import ProductItem from './components/ProductItem';
import CategoryList from './components/category/CategoryList';
import ActionBtn from './components/ActionBtn';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation, useIsFocused } from '@react-navigation/native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const bottomNavigationHeight = 85;

const ProductListPage = () => {
  const navigation = useNavigation();
  const isFocused = useIsFocused();

  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [lastSelectedCategory, setLastSelectedCategory] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      console.log('============ 게시물리스트 새로고침 ============');
      try {
        const token = await AsyncStorage.getItem('token');
        const response = await axios.get('http://10.200.72.130:8084/api/boards/posts', {
          headers: { 'Authorization': `Bearer ${token}` },
        });
        console.log('게시물 리스트 Response data:', JSON.stringify(response.data, null, 2));
        
        setProducts(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setLoading(false);
      }
    };
  
    if (isFocused) fetchProducts();
  }, [isFocused]);

  useEffect(() => {
    if (selectedCategory) {
      setFilteredProducts(products.filter(product => product.category === selectedCategory));
    } else {
      setFilteredProducts(products);
    }
  }, [selectedCategory, products]);

  const handleSelectCategory = (category) => {
    if (category === lastSelectedCategory) {
      setSelectedCategory(null);
      setLastSelectedCategory(null);
    } else {
      setSelectedCategory(category);
      setLastSelectedCategory(category);
    }
  };

  const renderProductItem = ({ item }) => (
    <View style={styles.productItemContainer}>
      <ProductItem
        item={item}
        onPress={() => navigation.navigate('ProductDetailPage', { productId: item.boardid.toString() })}
        isPopular={false}
      />
    </View>
  );

  if (loading) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.safeArea} edges={['bottom']}>
      <View style={{ flex: 1, backgroundColor: '#fff' }}>
        <FlatList
          data={filteredProducts}
          renderItem={renderProductItem}
          keyExtractor={(item) => item.boardid.toString()}
          ListHeaderComponent={<CategoryList onSelectCategory={handleSelectCategory} />}
          numColumns={2}
          columnWrapperStyle={styles.columnWrapper}
          contentContainerStyle={styles.listContentContainer}
        />
      </View>
      <View style={styles.actionButtonContainer}>
        <ActionBtn />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#fff' },
  listContentContainer: { paddingBottom: bottomNavigationHeight, paddingHorizontal: 10 },
  loaderContainer: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  actionButtonContainer: {
    position: 'absolute', bottom: bottomNavigationHeight + 37, left: 0, right: 0, zIndex: 1, paddingBottom: bottomNavigationHeight,
  },
  columnWrapper: {
    justifyContent: 'space-between', // Ensure equal spacing between columns
  },
  productItemContainer: {
    flex: 1,
    margin: 5,
  },
});

export default ProductListPage;
