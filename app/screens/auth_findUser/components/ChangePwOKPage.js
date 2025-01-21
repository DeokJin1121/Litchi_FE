import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { MaterialIcons } from '@expo/vector-icons';
import { TouchableOpacity } from 'react-native-gesture-handler';



const ChangePwOKPage = ({ navigation }) => {
    return (
        <View style={styles.container}>
            <View style={{ alignItems: 'center' }}>
                <MaterialIcons name="check-circle" size={100} color="green" />
                <Text style={{ fontSize: 20, fontWeight: 'bold', marginTop: 20 }}>비밀번호 변경 완료!{'\n'}</Text>
                <Text style={{ fontSize: 15, color: 'gray' }}>변경된 비밀번호로 로그인해주세요.</Text>
            </View>
            <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('LoginPage')}>
                <Text style={styles.buttonText}>로그인</Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        paddingTop: 50,
    },
    button: {
        backgroundColor: '#1B263B',
        width: '70%',
        height: 54,
        marginTop: 20,
        borderRadius: 15,
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
    },
    buttonText: {
        color: '#fff',
        fontSize: 17,
        fontWeight: 'bold',
        alignSelf: 'center',
    },
})

export default ChangePwOKPage
