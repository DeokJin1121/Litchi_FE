import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

const CenterCoordinateButton = ({ onPress, onCoordinateSelect, style }) => {
  const handlePress = () => {
    onPress(); // 이전의 onPress 이벤트 실행
    if (onCoordinateSelect) {
      onCoordinateSelect(); // 좌표 데이터를 전달하는 함수 호출
    }
  };

  return (
    <TouchableOpacity onPress={handlePress} style={[styles.button, style]}>
      <Text style={styles.buttonText}>등록하기</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#1B263B',
    padding: 16,
    width: '250%',
    height: 62,
    right: '110%',
    marginVertical: 10,
    borderRadius: 20,
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 24,
    color: '#fff',
  },
});

export default CenterCoordinateButton;
