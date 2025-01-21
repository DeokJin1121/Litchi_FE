import React, { useState, useEffect } from 'react';
import { StyleSheet, View, FlatList, SafeAreaView } from 'react-native';
import Register_button from './components/Register_button';
import { useNavigation, useRoute } from '@react-navigation/native';
import CategoryData from '../tab/main_product_list/components/category/CategoryData';
import * as ImagePicker from 'expo-image-picker';
import Header from './components/PostSubmissionHeader';
import ConfirmPopUp from '../modal/ConfirmPopUp';
import axios from 'axios';
import Api from '../../src/main/api/Api';

// axios 인스턴스 생성
const axiosInstance = axios.create();

const PostSubmissionPage = ({ route, token }) => {
  const navigation = useNavigation();
  const currentRoute = useRoute();
  const centerCoordinate = route.params?.centerCoordinate;

  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [items, setItems] = useState(CategoryData);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [price, setPrice] = useState("");
  const [photos, setPhoto] = useState([]);
  const [selectedIndex, setSelectedIndex] = useState(1);
  const [confirmationVisible, setConfirmationVisible] = useState(false);
  const [coordinate, setCoordinate] = useState(centerCoordinate || null);

  useEffect(() => {
    if (currentRoute.params?.centerCoordinate) {
      setCoordinate(currentRoute.params.centerCoordinate);
    }
  }, [currentRoute.params?.centerCoordinate]);

  useEffect(() => {
    console.log(photos);
    console.log('글 생성 페이지 좌표값:', coordinate);
  }, [photos, coordinate]);

  const prepareProductData = () => {
    const baseData = {
      title,
      content,
      boardStatus: 'TRADING',
      boardType: selectedIndex === 0 ? 'TRADE' : selectedIndex === 1 ? 'USED' : 'RENTAL',
      images: photos,
      category: value,
      coordinate,
    };

    if (selectedIndex === 0) {
      return {
        ...baseData,
        tradeRequestDto: {
          trade_product: title
        }
      };
    } else if (selectedIndex === 1) {
      return {
        ...baseData,
        usedRequestDto: {
          used_price: price
        }
      };
    } else if (selectedIndex === 2) {
      return {
        ...baseData,
        rentalRequestDto: {
          rental_price: price
        }
      };
    }
    return baseData;
  };

  const prepareFormData = (uploadedUrls) => {
    const productData = prepareProductData();
    const formData = new FormData();

    productData.images = uploadedUrls;  // 업로드된 URL로 이미지 배열 업데이트
    formData.append('boardRequestDto', JSON.stringify(productData));
    // 디버깅 코드
    console.log('prepared - 게시글 데이터:', JSON.stringify(productData, null, 2));
    console.log('prepared - 폼 데이터:', formData);

    return formData;
  };

  const pickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      alert('카메라 롤 권한이 필요합니다.');
      return;
    }
    if (photos.length === 3) {
      alert('사진은 최대 3장까지 업로드 가능합니다.');
      return;
    }
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled && result.assets) {
      const newUri = result.assets[0].uri;
      setPhoto(currentPhotos => [...currentPhotos, newUri]);
    }
  };

  const uploadImages = async (photoUris) => {
    const uploadedUrls = [];

    for (const uri of photoUris) {
      const formData = new FormData();
      formData.append('file', {
        uri,
        type: 'image/jpeg',
        name: uri.split('/').pop(),
      });

      try {
        const response = await axiosInstance.post('http://10.200.72.130:8084/api/s3/upload', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
        const url = response.data; // Assuming the response contains the uploaded URL
        uploadedUrls.push(url);
      } catch (error) {
        console.error('Image upload failed:', error);
      }
    }

    return uploadedUrls;
  };

  const handleConfirm = async () => {
    setConfirmationVisible(false);

    try {
      // 먼저 이미지 업로드
      const uploadedUrls = await uploadImages(photos);

      // 업로드된 URL을 포함한 폼 데이터 준비
      const formData = prepareFormData(uploadedUrls);
      // console.log('폼 데이터:', JSON.stringify(formatFormData(formData), null, 2));
      console.log('폼 데이터:', formData);
      console.log('폼 데이터:', formData.getAll('boardRequestDto'));

      // 폼 데이터를 서버에 POST
      // const response = await axiosInstance.post('http://10.200.72.130:8084/api/boards/posts', formData, {
      //   headers: {
      //     Authorization: `Bearer ${token}`,
      //   }
      // });
      // console.log('게시글 등록 완료:', response.data);
      const response = Api.createPost(formData);
      console.log('게시글 등록 완료:', response.data);
      navigation.navigate('ProductListPage');
    } catch (error) {
      console.error('게시글 등록 오류:', error);
    }
  };

  const deletePhoto = (photoUri) => {
    const newPhotos = photos.filter(uri => uri !== photoUri);
    setPhoto(newPhotos);
  };

  const checkRegister = () => {
    if (title.trim() === "" || content.trim() === "" || value === null || (selectedIndex !== 0 && price.trim() === "")) {
      alert('제목, 내용, 가격(필요시) 및 카테고리를 모두 입력해주세요.');
      return;
    }
    setConfirmationVisible(true);
  };

  const handleCancel = () => {
    setConfirmationVisible(false);
  };

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        ListHeaderComponent={<Header
          open={open}
          value={value}
          items={items}
          setOpen={setOpen}
          setValue={setValue}
          setItems={setItems}
          title={title}
          setTitle={setTitle}
          content={content}
          setContent={setContent}
          selectedIndex={selectedIndex}
          setSelectedIndex={setSelectedIndex}
          price={price}
          setPrice={setPrice}
          photos={photos}
          addPhoto={pickImage}
          deletePhoto={deletePhoto}
          navigation={navigation}
        />}
        style={styles.list}
      />
      <View style={styles.fixedButtonContainer}>
        <Register_button onPress={checkRegister} />
      </View>
      <ConfirmPopUp
        visible={confirmationVisible}
        onConfirm={handleConfirm}
        onCancel={handleCancel}
        isPost={true}
        text="정말 등록하시겠습니까?"
      />
    </SafeAreaView>
  );
};

// 스타일 정의
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  list: {
    flex: 1,
    paddingHorizontal: 20,
  },
  fixedButtonContainer: {
    height: 80,
    backgroundColor: '#fff',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  mapButton: {
    backgroundColor: '#1B263B',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
    bottom: 60,
    flexDirection: 'row',
    alignItems: 'center',
  },
});

// FormData를 포맷팅하여 로그에 출력하는 함수
const formatFormData = (formData) => {
  const object = {};
  formData.forEach((value, key) => {
    if (key === 'files' && Array.isArray(value)) {
      object[key] = value.map(file => ({
        uri: file.uri,
        type: file.type,
        name: file.name,
      }));
    } else {
      object[key] = value;
    }
  });
  return object;
};

export default PostSubmissionPage;
