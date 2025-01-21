import React, { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; // 혹시라도 사용할 수 있도록 추가

const TermsAndConditionsBox = ({ content, content_box, onToggle }) => {
  const [isChecked, setIsChecked] = useState(false);

  const toggleCheckbox = () => {
    setIsChecked(!isChecked);
    onToggle(!isChecked); // 부모 컴포넌트에 동의 여부 전달
  };

  return (
    <View style={{ marginBottom: 30 }}>
        <View style={{ 
            borderRadius: 20, // 모서리를 둥글게 만듦
            overflow: 'hidden', // 텍스트 내용이 모서리를 넘어갈 경우 잘라냄
        }}>
            <Text 
                style={{ 
                    fontSize: 16, 
                    fontWeight: 'normal',
                    backgroundColor: 'lightgray', // 회색 배경색 추가
                    padding: 10, // 내부 여백 설정
                    lineHeight: 24, // 줄 간격을 넓게 설정
                }}>
                {content}
            </Text> 
        </View>
        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-end', marginTop: 10 }}>
            <Text style={{ marginRight: 10, fontWeight: 'bold' }}>{content_box}</Text>
            <TouchableOpacity onPress={toggleCheckbox}>
                {isChecked ? (
                    <Ionicons name="checkbox" size={24} color="green" />
                ) : (
                    <Ionicons name="checkbox-outline" size={24} color="black" />
                )}
            </TouchableOpacity>
        </View>
    </View>
  );
};

export default TermsAndConditionsBox;
