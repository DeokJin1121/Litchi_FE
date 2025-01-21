import React from 'react';
import { Marker } from 'react-native-maps';
import { View, Text, StyleSheet, Image } from 'react-native';

const CustomMarker = ({ coordinate, title, description, image }) => {
  return (
    <Marker coordinate={coordinate}>
      <View style={styles.markerWrap}>
        <Image
          source={image ? { uri: image } : require('../../../assets/images/icon.png')} // 기본 이미지를 사용할 수 있습니다.
          style={styles.marker}
        />
        <View style={styles.callout}>
          <Text style={styles.calloutTitle}>{title}</Text>
          <Text style={styles.calloutDescription}>{description}</Text>
        </View>
      </View>
    </Marker>
  );
};

const styles = StyleSheet.create({
  markerWrap: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 50,
    height: 50,
  },
  marker: {
    width: 30,
    height: 30,
    borderRadius: 15,
  },
  callout: {
    flexDirection: 'column',
    alignItems: 'center',
    padding: 5,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderRadius: 6,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 2,
  },
  calloutTitle: {
    fontWeight: 'bold',
    marginBottom: 2,
  },
  calloutDescription: {
    fontSize: 12,
    color: '#666',
  },
});

export default CustomMarker;
