import React, { useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Modal } from 'react-native';

/**
 * 24.05.13 김수현
 * @returns 확인 팝업 컴포넌트
 * @param {boolean} visible 팝업 노출 여부
 * @param {function} onCancel 취소 버튼 클릭 시 실행할 함수
 * @param {function} onConfirm 확인 버튼 클릭 시 실행할 함수
 * @param {string} text 팝업 내용
 * @param {boolean} isPost 등록에 사용되는 팝업인지 확인 여부
 * 사용사례 : 등록 버튼 클릭 시 등록 여부 확인
 **/

const ConfirmPopUp = ({ visible, onCancel, onConfirm, text, isPost }) => {
    return (
        <Modal
            animationType="fade"
            transparent={true}
            visible={visible}
            onRequestClose={onCancel}>
            <View style={styles.centeredView}>
                <View style={styles.modalView}>
                    <Text style={styles.modalText}>{text}</Text>
                    <View style={styles.buttonContainer}>
                        <TouchableOpacity
                            style={{ ...styles.button, backgroundColor: '#2196F3' }}
                            onPress={onConfirm}>
                            <Text style={styles.buttonText}>확인</Text>
                        </TouchableOpacity>
                        {isPost === true && <TouchableOpacity
                            style={{ ...styles.button, backgroundColor: '#F44336' }}
                            onPress={onCancel}>
                            <Text style={styles.buttonText}>취소</Text>
                        </TouchableOpacity>}
                    </View>
                </View>
            </View>
        </Modal>
    );
}

const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        // marginTop: 22,
        backgroundColor: 'rgba(0,0,0,0.5)',
    },
    modalView: {
        margin: 20,
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 35,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    buttonContainer: {
        flexDirection: 'row',
        marginTop: 20,
    },
    button: {
        borderRadius: 8,
        paddingVertical: 10,
        paddingHorizontal: 15,
        elevation: 2,
        marginHorizontal: 10,
    },
    buttonText: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
    },
    modalText: {
        marginBottom: 10,
        textAlign: 'center',
    },
});

export default ConfirmPopUp;
