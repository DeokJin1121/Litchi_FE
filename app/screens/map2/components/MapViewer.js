import React, { useRef, useState, useEffect } from 'react';
import { View, StyleSheet, ActivityIndicator } from 'react-native';
import MapView from 'react-native-maps';
import * as Location from 'expo-location';
import CustomMarker from './CustomMarker'; // CustomMarker 컴포넌트를 임포트
import axios from 'axios'; // axios를 임포트

const MapViewer = ({ key }) => {
  const mapRef = useRef(null);
  const [centerCoordinate, setCenterCoordinate] = useState(null);
  const [loading, setLoading] = useState(true);
  const [markers, setMarkers] = useState([]);

  useEffect(() => {
    const getLocationAsync = async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        console.error('Permission to access location was denied');
        setLoading(false);
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setCenterCoordinate({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        latitudeDelta: 0.005,
        longitudeDelta: 0.005,
      });
      setLoading(false);
    };

    getLocationAsync();
  }, [key]);

  useEffect(() => {
    const fetchMarkers = async () => {
      try {
        const response = await axios.get('http://10.200.72.130:8084/api/coordinates');
        setMarkers(response.data);
        console.log('Markers:', response.data);
      } catch (error) {
        console.error('Failed to fetch markers:', error);
      }
    };

    fetchMarkers();
  }, [key]);

  if (loading) {
    return (
      <View style={styles.loading}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <MapView
        ref={mapRef}
        style={styles.map}
        initialRegion={centerCoordinate}
        provider={MapView.PROVIDER_DEFAULT}
        zoomEnabled={true}
        scrollEnabled={true}
        rotateEnabled={true}
        pitchEnabled={true}
        showsUserLocation={true}
        followsUserLocation={true}
        showsMyLocationButton={false}
        showCompass={true}
        onRegionChangeComplete={(region) => setCenterCoordinate(region)}
      >
        {markers.map((marker, index) => (
          <CustomMarker
            key={index}
            coordinate={{ latitude: marker.latitude, longitude: marker.longitude }}
            title={marker.title}
            description={marker.description}
            image={marker.filesUrl && marker.filesUrl.length > 0 ? marker.filesUrl[0] : null} // 첫 번째 이미지 URL
          />
        ))}
      </MapView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    flex: 1,
  },
  loading: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default MapViewer;
