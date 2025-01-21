import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import MapView from './components/MapViewer';

const Map2Page = ({ flex = 1 }) => {
  const initialRegion = {
    latitude: 37.4480158,
    longitude: 126.6575041,
    latitudeDelta: 0.1,
    longitudeDelta: 0.1,
  };
  return (
    <View style={{ flex }}>
      <MapView
        provider={MapView.PROVIDER_GOOGLE}
        initialRegion={initialRegion}
        flex={flex}
      />
    </View>
  );
};

export default Map2Page;
