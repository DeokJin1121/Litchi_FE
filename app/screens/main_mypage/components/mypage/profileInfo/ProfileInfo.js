import { useNavigation } from '@react-navigation/native';
import React, { useContext, useState } from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { AuthContext } from '../../../../../contexts/AuthContext';
import ConfirmPopUp from '../../../../modal/ConfirmPopUp';

const ProfileInfo = () => {
  const navigation = useNavigation();
  const { nickname, logout } = useContext(AuthContext);
  const [popUpVisible, setPopUpVisible] = useState(false);

  return (
    <View style={styles.profileBlock}>
      <View style={styles.profileSection}>
        <Image source={require('../../../../../assets/icon/mypage_profile.png')} style={styles.profilePic} />
        <View style={styles.userInfo}>
          <View style={styles.usernameContainer}>
            <TouchableOpacity onPress={() => navigation.navigate(nickname ? 'ProfileUpdatePage' : 'LoginPage')}>
              <Text style={styles.username}>
                {nickname ? nickname : '로그인후 이용바랍니다.'}
              </Text>
            </TouchableOpacity>
            {nickname && (
              <TouchableOpacity onPress={() => navigation.navigate('ProfileUpdatePage')}>
                <Image source={require('../../../../../assets/icon/mypage_pencil.png')} style={styles.editButton} />
              </TouchableOpacity>
            )}
          </View>
          <Text style={styles.trustScore}></Text>
        </View>
      </View>
      <View style={styles.separator} />
      <View style={styles.buttonsSection}>
        <TouchableOpacity style={styles.TransactionDetailsButton} onPress={() => navigation.navigate('TransDetailsPage')}>
          <Text style={styles.buttonText}>거래내역</Text>
        </TouchableOpacity>
        <View style={styles.separator1} />
        <TouchableOpacity style={styles.googButton} onPress={() => navigation.navigate('GoodTransPage')}>
          <Text style={styles.buttonText}>좋아요</Text>
        </TouchableOpacity>
        <View style={styles.separator2} />
        <TouchableOpacity
          style={styles.MyPostButton}
          onPress={() => navigation.navigate(nickname ? 'WritePage' : 'LoginPage')}
        >
          <Text style={styles.buttonText}>내가 쓴 글</Text>
        </TouchableOpacity>
      </View>
      {nickname && (
        <TouchableOpacity style={styles.logoutButton} onPress={() => {
          setPopUpVisible(true);
        }}>
          <Text style={styles.logoutButtonText}>로그아웃</Text>
        </TouchableOpacity>
      )
      }
      <ConfirmPopUp
        text='정말 로그아웃 하시겠습니까?'
        visible={popUpVisible}
        onConfirm={() => {
          logout();
          navigation.reset({
            index: 0,
            routes: [{ name: 'LoginPage' }],
          });
        }}
        onCancel={() => setPopUpVisible(false)}
        isPost={true}
      />
    </View >
  );
};

const styles = StyleSheet.create({
  profileBlock: {
    width: '90%',
    height: '20%', // height increased to accommodate logout button
    alignItems: 'baseline',
    backgroundColor: '#F4F4F4',
    borderRadius: 10,
  },
  profileSection: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: '5%',
    marginLeft: '1%',
  },
  profilePic: {
    width: '20%',
    height: '160%',
    borderRadius: 30,
    marginLeft: '2%',
    marginTop: 10,
  },
  userInfo: {
    flexDirection: 'column',
  },
  usernameContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  username: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  editButton: {
    width: 15,
    height: 15,
    marginLeft: 10,
  },
  trustScore: {
    marginTop: 5,
  },
  separator: {
    width: '100%',
    height: 1,
    backgroundColor: 'black',
    marginTop: '1.7%',
  },
  separator1: {
    width: 1,
    height: '136%',
    backgroundColor: 'black',
    marginVertical: 0,
  },
  separator2: {
    width: 1,
    height: '136%',
    backgroundColor: 'black',
    marginVertical: 0,
  },
  buttonsSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  TransactionDetailsButton: {
    paddingTop: '4%',
    paddingLeft: '8%',
    paddingRight: '3%',
    borderRadius: 5,
  },
  googButton: {
    paddingTop: '4%',
    paddingHorizontal: '5%',
    borderRadius: 5,
  },
  MyPostButton: {
    paddingTop: '4%',
    paddingRight: '7%',
    borderRadius: 5,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  logoutButton: {
    marginTop: 10,
    padding: 10,
    backgroundColor: '#FF6347',
    borderRadius: 5,
    alignSelf: 'center',
  },
  logoutButtonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
});

export default ProfileInfo;
