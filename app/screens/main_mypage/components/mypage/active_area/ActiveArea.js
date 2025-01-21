// ActiveArea.js
import React, { useContext } from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { AuthContext } from '../../../../../contexts/AuthContext';

const ActiveArea = () => {
  const { region } = useContext(AuthContext);
  const activeArea = region || "로그인후 이용바랍니다.";

  return (
    <>
      <View style={styles.activeAreaBlock}>
        <View style={styles.activeArea}>
          <Text style={styles.areaTitle}>활동 지역</Text>
          <TouchableOpacity onPress={() => console.log("이동하기")} style={styles.changeAreaButton}>
            <Text style={styles.changeArea}>활동지역 변경</Text>
          </TouchableOpacity>
        </View>
        <Text style={styles.areaText}>{activeArea}</Text>
      </View>
      <View style={styles.infoContainer}>
        <Image source={require('../../../../../assets/icon/mypage_info.png')} style={styles.infoIcon} />
        <Text style={styles.infoText}>실제 위치와 다를 수 있습니다</Text>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  activeAreaBlock: {
    width: '90%',
    height: '15%',
    alignItems: 'baseline',
    marginTop: '8%',
    backgroundColor: '#F4F4F4',
    borderRadius: 10,
  },
  activeArea: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 10,
    marginLeft: 10,
    marginRight: 10,
  },
  areaTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  changeAreaButton: {
    marginLeft: '59%', // 활동지역 변경 버튼을 오른쪽으로 이동
  },
  changeArea: {
    color: '#616161',
    fontSize: 13,
    textDecorationLine: 'underline',
  },
  areaText: {
    marginLeft: '5%',
    fontSize: 25,
    marginTop: '2%',
  },
  infoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start', // 왼쪽으로 이동
    marginLeft: '5%', // 추가적으로 왼쪽으로 이동
  },
  infoIcon: {
    width: 20,
    height: 20,
    marginRight: 5,
    opacity: 0.3,
  },
  infoText: {
    fontSize: 13,
    color: '#616161',
  },
});

export default ActiveArea;
