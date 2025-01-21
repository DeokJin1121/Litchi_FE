import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
  padding-left: 20px;
  padding-right: 20px;
  background-color: #ffffff;
`;

export const Card = styled.TouchableOpacity`
  flex: 1;
  width: 100%;
`;

export const UserInfo = styled.View`
  flex-direction: row;
  justify-content: flex-start;
`;

export const UserImgWrapper = styled.View`
  padding-top: 15px;
  padding-bottom: 15px;
`;

export const UserImg = styled.Image`
  width: 50px;
  height: 50px;
  border-radius: 25px;
  background-color: #000000;
`;

export const TextSection = styled.View`
  flex-direction: column;
  justify-content: center;
  flex: 1;
  padding: 15px;
  padding-left: 0;
  margin-left: 20px;
  border-bottom-width: 1px;
  border-bottom-color: #cccccc;
`;

export const UserInfoText = styled.View`
  flex-direction: row;
  justify-content: space-between;
  margin-bottom: 5px;
`;

export const UserName = styled.Text`
  font-size: 14px;
  font-weight: bold;
`;

export const PostTime = styled.Text`
  font-size: 12px;
  color: #666;
`;

export const MessageText = styled.Text`
  font-size: 14px;
  color: #333333;
`;