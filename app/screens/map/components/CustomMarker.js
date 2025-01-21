import React from 'react';
import { Marker as MapMarker } from 'react-native-maps';

const CustomMarker = ({ coordinate, pinColor, title, description }) => {
  return (
    <MapMarker
      coordinate={coordinate}
      pinColor={pinColor}
      title={title}
      description={description}
    />
  );
};

export default CustomMarker;
