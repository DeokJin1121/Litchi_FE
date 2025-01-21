import React from 'react';
import { View, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import ActionButton from 'react-native-action-button';
import { useNavigation } from '@react-navigation/native';

const ActionBtn = () => {

    const navigation = useNavigation();

    return (
        <View style={{ backgroundColor: '#fff' }}>
            <ActionButton buttonColor="#1B263B" style={{ backgroundColor: '#fff' }} hideShadow={true}>
                <ActionButton.Item buttonColor='#7EADF9' title="글쓰기" onPress={() => navigation.navigate('PostSubmissionPage')}>
                    <Icon name="create" style={styles.actionButtonIcon} />
                </ActionButton.Item>
                <ActionButton.Item buttonColor='#7EADF9' title="알림" onPress={() => console.log("알림 버튼 클릭됨")}>
                    <Icon name="notifications-off" style={styles.actionButtonIcon} />
                </ActionButton.Item>
            </ActionButton>
        </View>
    );
}

const styles = StyleSheet.create({
    actionButtonIcon: {
        fontSize: 20,
        height: 22,
        color: 'white',
        textAlign: 'center',
    },
});

export default ActionBtn;

