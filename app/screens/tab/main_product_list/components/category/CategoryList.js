import React from 'react';
import { View, FlatList, StyleSheet, TouchableOpacity, Text, Image } from 'react-native';
import CategoryData from './CategoryData'; // 카테고리 데이터를 임포트합니다.

const categoryImages = {
    '디지털기기': require('../../../../../assets/images/button/it.png'),
    '가구/인테리어': require('../../../../../assets/images/button/sofa.png'),
    '남성패션/잡화': require('../../../../../assets/images/button/shirt.png'),
    '여성의류': require('../../../../../assets/images/button/dr.png'),
    '여성잡화': require('../../../../../assets/images/button/bag.png'),
    '생활': require('../../../../../assets/images/button/tb.png'),
    '식품': require('../../../../../assets/images/button/rice.png'),
    '스포츠/레저': require('../../../../../assets/images/button/he.png'),
    '뷰티': require('../../../../../assets/images/button/co.png'),
    '도서': require('../../../../../assets/images/button/book.png'),
    '기타': require('../../../../../assets/images/button/dot.png'),
};

const CategoryItem = ({ category, onPress }) => (
  <TouchableOpacity onPress={() => onPress(category.value)} style={styles.categoryItem}>
    <Image source={categoryImages[category.label]} style={styles.image} />
    <Text style={styles.categoryName}>{category.value}</Text>
  </TouchableOpacity>
);

const CategoryList = ({ onSelectCategory }) => {
  return (
    <View style={styles.container}>
      <FlatList
        data={CategoryData}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        renderItem={({ item }) => <CategoryItem category={item} onPress={onSelectCategory} />}
        keyExtractor={(item) => item.label}
        style={styles.list}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    paddingVertical: 10,
  },
  list: {
    paddingLeft: 10,
  },
  categoryItem: {
    alignItems: 'center',
    marginRight: 10,
    padding: 5,
  },
  image: {
    width: 50,
    height: 50,
    resizeMode: 'contain',
    marginBottom: 5,
  },
  categoryName: {
    fontSize: 12,
    textAlign: 'center',
  },
});

export default CategoryList;
