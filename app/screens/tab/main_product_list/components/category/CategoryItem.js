import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

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

const Category = ({ category }) => {
    return (
        <View style={styles.container}>
            <Image source={categoryImages[category.label]} style={styles.image} />
            <Text style={styles.categoryName}>{category.value}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        width: 75,
        height: 75,
        backgroundColor: '#fff',
        padding: 10,
        borderWidth: 1,
        borderColor: '#f2f2f2',
        justifyContent: 'flex-start',
    },
    image: {
        resizeMode: 'contain',
        width: '100%',
        height: '40%',
        marginBottom: 7,
    },
    categoryName: {
        textAlign: 'center',
        fontSize: 13,
        fontWeight: 'bold',
    },
});

export default Category;
