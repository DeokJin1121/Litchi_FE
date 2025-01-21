import React from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';

const InputField = ({ label, value, onChangeText, placeholder, secureTextEntry, buttonLabel, onButtonPress }) => {
    return (
        <View style={[styles.inputContainer, label === '비밀번호' && { marginBottom: 7 }]}>
            {label && <Text style={styles.label}>{label}</Text>}
            <View style={styles.row}>
                <TextInput
                    style={styles.input}
                    value={value}
                    onChangeText={onChangeText}
                    placeholder={placeholder}
                    secureTextEntry={secureTextEntry}
                />
                {buttonLabel && (
                    <TouchableOpacity style={styles.button} onPress={onButtonPress}>
                        <Text style={styles.buttonText}>{buttonLabel}</Text>
                    </TouchableOpacity>
                )}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    inputContainer: {
        marginBottom: 15,
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    label: {
        fontSize: 15,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    input: {
        flex: 1,
        height: 49,
        padding: 10,
        borderRadius: 16,
        marginRight: 7,
        backgroundColor: '#f2f2f2',
    },
    button: {
        width: 80,
        height: 49,
        backgroundColor: '#1B263B',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 16,
    },
    buttonText: {
        color: '#fff',
        fontSize: 13,
    },
});

export default InputField;
