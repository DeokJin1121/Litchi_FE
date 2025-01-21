import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import MapView from './components/MapViewer';

const MapPage = ({ flex = 1 }) => {
  const initialRegion = {
    latitude: 37.4480158,
    longitude: 126.6575041,
    latitudeDelta: 0.1,
    longitudeDelta: 0.1,
  };

  const [centerCoordinate, setCenterCoordinate] = useState(null);
  

  // 중심 좌표가 변경될 때 호출되는 함수
  const handleCenterCoordinateChange = (coordinate) => {
    setCenterCoordinate(coordinate);
  };

  return (
    <View style={{ flex }}>
      <MapView
        provider={MapView.PROVIDER_GOOGLE}
        initialRegion={initialRegion}
        flex={flex}
        onCenterCoordinateChange={handleCenterCoordinateChange}
        centerCoordinate={centerCoordinate}
      />
    </View>
  );
};

export default MapPage;
