import axios from 'axios';

const API_URL = 'http://10.200.72.130:8084/api/user/nickname'; // 백엔드 URL을 적절히 설정합니다.

export const getUserInfo = async () => {
  try {
    const response = await axios.get(`${API_URL}/user`);
    return response.data;
  } catch (error) {
    console.error('Failed to fetch user info:', error);
    throw error;
  }
};
