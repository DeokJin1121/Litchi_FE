import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { SimpleLineIcons } from '@expo/vector-icons';

/*
앱바 우측 메뉴 버튼 컴포넌트
*/

const MenuButton = ({ onPress }) => {
    return (
        <TouchableOpacity onPress={onPress}>
            <View style={{ width: 50, height: 50, justifyContent: 'center', alignItems: 'center' }}>
                {/* <Text style={{ fontSize: 30, fontWeight: 'bold' }}>≡</Text> */}
                <SimpleLineIcons name="bell" size={22} color="black" />
            </View>
        </TouchableOpacity>
    );
};

export default MenuButton;