import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';

const TransType = ({ setSelectedType }) => {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [items, setItems] = useState([
    { label: '전체', value: 'all' },
    { label: '중고거래', value: 'used' },
    { label: '물물교환', value: 'trade' },
    { label: '대여', value: 'rental' },
  ]);

  return (
    <View style={styles.container}>
      <DropDownPicker
        open={open}
        value={value}
        items={items}
        setOpen={setOpen}
        setValue={(value) => {
          setValue(value);
          setSelectedType(value); // setSelectedType 함수 호출
        }}
        setItems={setItems}
        placeholder={items[0].label}
        style={{ borderWidth: 0 }}
        dropDownContainerStyle={{ borderWidth: 0 }}
        textStyle={{ fontSize: 16, fontWeight: 'bold' }}
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
    marginLeft: '1%',
    marginBottom: '1%',

  },
});

export default TransType;
