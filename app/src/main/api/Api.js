import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

// API 엔드포인트 URL
const API_URL = {
    createPost: 'http://10.200.72.130:8084/api/boards/posts',
    getPosts: 'http://10.200.72.130:8084/api/boards/posts',
    getUserInfo: 'http://10.200.72.130:8084/api/users',  // 수정: `${boardId}`를 제거하고 엔드포인트만 남깁니다.
    deletePost: 'http://10.200.72.130:8084/api/boards/posts', // 삭제 API 엔드포인트 추가
};

// 글 생성 API
const createPost = async (productData) => {
    try {
        const token = await AsyncStorage.getItem('jwtToken'); // 토큰 가져오기
        console.log('토큰:', token);
        if (!token) throw new Error('No token found');
        
        // API 요청
        const response = await axios.post(API_URL.createPost, productData, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        
        console.log('글 생성 응답:', response.data);
        return response.data;
    } catch (error) {
        // 에러 응답이 없는 경우 처리 추가
        if (error.response) {
            console.error('글 생성 오류:', error.response.data);
        } else {
            console.error('글 생성 오류:', error.message);
        }
        throw error;
    }
};

// 글 조회 API
const getPosts = async () => {
    try {
        // API 요청
        const response = await axios.get(API_URL.getPosts);
        console.log('글 조회 응답:', response.data);
        return response.data;
    } catch (error) {
        // 에러 응답이 없는 경우 처리 추가
        if (error.response) {
            console.error('글 조회 오류:', error.response.data);
        } else {
            console.error('글 조회 오류:', error.message);
        }
        throw error;
    }
};

// 판매자 정보 조회 API
const getUserInfo = async (boardId) => {
    try {
        const response = await axios.get(`${API_URL.getUserInfo}/${boardId}`);
        console.log('판매자 정보 조회 응답:', response.data);
        return response.data;
    } catch (error) {
        console.error('판매자 정보 조회 오류:', error.response.data);
        throw error;
    }
};

// 글 삭제 API
const deletePost = async (boardId) => {
    try {
        const token = await AsyncStorage.getItem('jwtToken'); // 토큰 가져오기
        console.log('토큰:', token);
        if (!token) throw new Error('No token found');

        // API 요청
        await axios.delete(`${API_URL.deletePost}/${boardId}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        console.log('글 삭제 성공');
    } catch (error) {
        // 에러 응답이 없는 경우 처리 추가
        if (error.response) {
            console.error('글 삭제 오류:', error.response.data);
        } else {
            console.error('글 삭제 오류:', error.message);
        }
        throw error;
    }
};

// 다른 API 함수들도 추가할 수 있습니다.

const Api = {
    createPost,
    getPosts,
    getUserInfo,
    deletePost, // 삭제 API 함수 추가
    // 다른 API 함수들도 추가할 수 있습니다.
};

export default Api;

