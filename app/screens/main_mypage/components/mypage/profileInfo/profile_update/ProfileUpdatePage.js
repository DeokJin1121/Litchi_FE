import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, StyleSheet } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const ProfileUpdatePage = () => {

  const navigation = useNavigation();

  const [profileImage, setProfileImage] = useState(require('../../../../../../assets/icon/mypage_profile.png'));
  const [nickname, setNickname] = useState('');



  const handleSelectImage = () => {
    ImagePicker.requestMediaLibraryPermissionsAsync().then(({ status }) => {
      if (status !== 'granted') {
        alert('죄송합니다, 이 기능을 사용하려면 카메라 롤 권한이 필요합니다!');
        return;
      }

      ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 1,
      }).then(({ cancelled, uri }) => {
        if (!cancelled) {
          setProfileImage({ uri });
        }
      }).catch(error => {
        console.error("앨범에서 이미지를 가져오는 중 오류가 발생했습니다.", error);
      });
    }).catch(error => {
      console.error("앨범 접근 권한을 요청하는 중 오류가 발생했습니다.", error);
    });
  };

  return (
    <View style={styles.container}>
      <View style={styles.profileImageContainer}>
        <Image source={profileImage} style={styles.profileImage} />
        <TouchableOpacity style={styles.cameraButton} onPress={handleSelectImage}>
          <MaterialIcons name="camera-alt" size={20} color="#000" style={styles.cameraIcon} />
        </TouchableOpacity>
      </View>
      <Text style={styles.label}>닉네임</Text>
      <TextInput
        style={styles.input}
        placeholder="닉네임을 입력하세요"
        value={nickname}
        onChangeText={setNickname}
      />
      <TouchableOpacity style={styles.completeButton} onPress={() => {/* 완료 버튼 클릭 시 수행할 작업 */ }}>
        <Text style={styles.completeButtonText}>완료</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 20,
  },
  profileImageContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  cameraButton: {
    position: 'absolute',
    bottom: 0,
    right: 10,
    backgroundColor: '#fff',
    borderRadius: 15,
    padding: 5,
  },
  cameraIcon: {
    width: 20,
    height: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginVertical: 10,
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 20,
  },
  completeButton: {
    backgroundColor: '#007BFF',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  completeButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
})

export default ProfileUpdatePage;