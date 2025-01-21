import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';

const BreakdownType = () => {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [items, setItems] = useState([
    { label: '전체', value: 'all' },
    { label: '구매내역', value: 'purchaseDetails' },
    { label: '판매내역', value: 'salesDetails' },
    // 여기에 다른 지역 추가
  ]);

  return (
    <View style={styles.container}>
      <DropDownPicker
        open={open}
        value={value}
        items={items}
        setOpen={setOpen}
        setValue={setValue}
        setItems={setItems}
        placeholder={items[0].label}
        style={{ borderWidth: 0 }} // 기본 테두리 제거
        dropDownContainerStyle={{ borderWidth: 0 }} // 드롭다운 리스트의 테두리 제거
        textStyle={{ fontSize: 16, fontWeight: 'bold' }} // 텍스트 크기 조절
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '70%',
    height: '100%',
    alignItems: 'flex-start',
    justifyContent: 'center',
    marginLeft: 10,
    marginBottom: 7,
  },
});

export default BreakdownType;
