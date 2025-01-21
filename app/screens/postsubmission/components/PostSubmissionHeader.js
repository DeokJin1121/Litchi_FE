import React from 'react';
import { View, Text, TextInput, FlatList, Image, TouchableOpacity, StyleSheet, Button } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import SegmentedControl from '@react-native-segmented-control/segmented-control';

const Header = ({ open, value, items, setOpen, setValue, setItems, navigation, coordinate,
    title, setTitle, content, setContent, addPhoto, selectedIndex, setSelectedIndex, price, setPrice, photos, deletePhoto }) =>
(

    <>
        <Text style={{ fontSize: 17, fontWeight: 'bold', marginTop: 10, marginLeft: 3 }}>카테고리</Text>
        <DropDownPicker
            listMode='MODAL'
            modalTitle='카테고리'
            modalTitleStyle={{ fontSize: 20, fontWeight: 'bold' }}
            open={open}
            value={value}
            items={items}
            setOpen={setOpen}
            setValue={setValue}
            setItems={setItems}
            navigation={navigation}
            coordinate={coordinate}
            style={styles.dropdown}
            placeholder="카테고리를 선택하여 주세요."
            dropDownContainerStyle={{ width: "100%", alignSelf: "center", marginTop: 10 }}
        />
        <View>
            {/* 거래 타입 선택 세그먼트 컨트롤 */}
            <Text style={{ fontSize: 17, fontWeight: 'bold', marginTop: 10, marginLeft: 3 }}>거래방식</Text>
            <SegmentedControl
                values={['물물교환', '중고거래', '대여']}
                selectedIndex={selectedIndex} // 초기값 설정 (중고거래로 설정)
                onChange={(event) => {
                    const newSelectedIndex = event.nativeEvent.selectedSegmentIndex;
                    setSelectedIndex(newSelectedIndex);
                    // selectedIndex가 0(물물교환)으로 설정될 때 가격을 빈 문자열로 설정
                    if (newSelectedIndex === 0) {
                        setPrice("");
                    }
                }}
                style={{ width: '100%', height: 48, marginVertical: 10 }}
            />
        </View>
        <View style={styles.inputContainer}>
            <TextInput
                style={[styles.input, styles.titleInput]}
                placeholder="제목"
                placeholderTextColor={"#000"}
                value={title}
                onChangeText={setTitle}
            />
            <TextInput
                style={[styles.input, styles.contentInput]}
                placeholder="내용"
                placeholderTextColor={"#000"}
                value={content}
                onChangeText={setContent}
                multiline={true}
            />
            <View>
                <Text style={{ fontSize: 17, fontWeight: 'bold', marginTop: 10, marginLeft: 3 }}>가격</Text>
                {selectedIndex === 2 ? (
                    <View style={{ flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'center', marginBottom: 10 }}>
                        <Text style={{ fontSize: 16 }}>일일대여료</Text>
                        <TextInput
                            style={[styles.priceInput, { width: "50%", alignSelf: "flex-end" }]}
                            placeholder="원"
                            placeholderTextColor={selectedIndex === 0 ? "#ccc" : "#000"}
                            textAlign='right'
                            value={price}
                            onChangeText={setPrice}
                            editable={selectedIndex !== 0}
                        />
                    </View>) :
                    <TextInput
                        style={[styles.priceInput, { width: "50%", alignSelf: "flex-end" }]}
                        placeholder="원"
                        placeholderTextColor={selectedIndex === 0 ? "#ccc" : "#000"}
                        textAlign='right'
                        value={price}
                        onChangeText={setPrice}
                        editable={selectedIndex !== 0}
                    />
                }
                <View style={{ backgroundColor: '#fff', height: 100, flexDirection: 'row', alignItems: 'center' }} >
                    <TouchableOpacity onPress={addPhoto} style={styles.imgPickerBtn}>
                        <MaterialIcon name="add-a-photo" size={30} />
                        <View style={{ flexDirection: 'row' }}>
                            <Text style={{ color: photos.length === 3 ? 'red' : 'black' }}>{photos.length}</Text>
                            <Text>/3</Text>
                        </View>
                    </TouchableOpacity>
                    <FlatList
                        horizontal // 가로로 스크롤되도록 설정
                        data={photos} // 사진 URI 배열
                        keyExtractor={(item, index) => index.toString()} // 각 항목의 key 설정
                        renderItem={({ item }) => (
                            <View style={{ padding: 7 }}>
                                <Image
                                    source={{ uri: item }}
                                    style={{ width: 70, height: 70, borderRadius: 10 }} // marginRight를 추가하여 사진 간 간격 설정
                                />
                                {/* 사진 삭제 버튼 */}
                                <TouchableOpacity
                                    style={{
                                        position: 'absolute', // 이미지 위에 오버레이 형식으로 버튼을 위치시킴
                                        right: 0, // 오른쪽 상단에 위치
                                        top: 0, // 상단에 위치
                                        backgroundColor: 'rgba(0, 0, 0, 0.3)', // 반투명 배경
                                        borderRadius: 15, // 원형 버튼 디자인
                                        padding: 2, // 패딩으로 버튼 크기 조절
                                    }}
                                    onPress={() => {
                                        deletePhoto(item);
                                    }}
                                >
                                    <MaterialIcon name="close" size={20} color="#000" />
                                </TouchableOpacity>

                            </View>
                        )}
                    />
                </View>
            </View>
            <Button
                title="지도로 보기"
                onPress={() => navigation.navigate('MapPage')}
            />
            {coordinate && (
                <Text style={styles.coordinateText}>
                    위도: {coordinate.latitude}, 경도: {coordinate.longitude}
                </Text>
            )}
        </View>
    </>
);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
    },
    list: {
        flex: 1,
        paddingHorizontal: 20,
    },
    inputContainer: {
        width: "100%",
        alignSelf: "center",
    },
    input: {
        borderWidth: 1,
        borderColor: "#ccc",
        fontSize: 17,
        borderRadius: 5,
        padding: 10,
        marginVertical: 10,
    },
    priceInput: {
        borderBottomWidth: 1,
        borderColor: "#ccc",
        fontSize: 17,
        borderRadius: 5,
        padding: 10,
        marginVertical: 10,
    },
    titleInput: {
        height: 43,
    },
    contentInput: {
        height: 200,
    },
    dropdown: {
        alignSelf: "center",
        width: "100%",
        marginVertical: 10,
    },
    fixedButtonContainer: {
        width: "100%",
        alignItems: 'center',
    },
    imgPickerBtn: {
        width: 70,
        height: 70,
        backgroundColor: '#f2f2f2',
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
        margin: 5,
    },
    coordinateText: {
        color: '#000',
        fontSize: 14,
    },
});

export default Header;