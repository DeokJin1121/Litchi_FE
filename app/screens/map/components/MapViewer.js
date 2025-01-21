import React, { useRef, useState, useEffect, useCallback } from 'react';
import { View, StyleSheet, ActivityIndicator, Alert } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import CenterCoordinateButton from './CenterCoordinateButton';
import MyLocationButton from './MyLocationButton';
import { useNavigation } from '@react-navigation/native'; // navigation 추가


const MapViewer = ({ onCenterCoordinateChange }) => {
  const navigation = useNavigation(); // navigation 추가
  const mapRef = useRef(null);
  const [centerCoordinate, setCenterCoordinate] = useState(null);
  const [loading, setLoading] = useState(true);

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
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      });
      setLoading(false);
    };

    getLocationAsync();
  }, []);

  const getCenterCoordinate = useCallback(() => {
    if (mapRef.current) {
      mapRef.current.getCamera().then((camera) => {
        const center = {
          latitude: camera.center.latitude,
          longitude: camera.center.longitude,
        };
        onCenterCoordinateChange(center); // 좌표값 변경을 알림
        navigation.navigate('PostSubmissionPage', { centerCoordinate: center }); // 좌표값을 포함하여 페이지 이동
        console.log("Center Coordinate:", center);
      }).catch((error) => {
        console.error("Error getting camera coordinates:", error);
        Alert.alert("Error", "Failed to get camera coordinates.");
      });
    }
  }, [onCenterCoordinateChange, navigation]);

  const getCurrentLocation = useCallback(async () => {
    try {
      let location = await Location.getCurrentPositionAsync({});
      const latLng = {
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      };

      if (mapRef.current) {
        mapRef.current.getCamera().then((camera) => {
          mapRef.current.animateToRegion({
            ...latLng,
            latitudeDelta: camera.zoom,
            longitudeDelta: camera.zoom,
          }, 1000);
        });
      }
    } catch (error) {
      console.error("Error getting current location:", error);
      Alert.alert("Error", "Failed to get current location.");
    }
  }, []);

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
        showsUserLocation={true}
        followsUserLocation={true}
        showsMyLocationButton={false}
        showCompass={true}
        onPress={() => {
          console.log('Map Pressed');
        }}
        onRegionChangeComplete={(region) => setCenterCoordinate(region)}
      >
        {centerCoordinate && (
          <Marker
            coordinate={centerCoordinate}
            pinColor="blue"
            title="Center"
            description="Center Point"
          />
        )}
      </MapView>
      <GooglePlacesAutocomplete
        placeholder="Search"
        fetchDetails={true}
        onPress={(data, details = null) => {
          if (details) {
            const latLng = {
              latitude: details.geometry.location.lat,
              longitude: details.geometry.location.lng,
            };
            setCenterCoordinate({
              ...latLng,
              latitudeDelta: centerCoordinate.latitudeDelta,
              longitudeDelta: centerCoordinate.latitudeDelta,
            });
            mapRef.current.animateToRegion({
              ...latLng,
              latitudeDelta: centerCoordinate.latitudeDelta,
              longitudeDelta: centerCoordinate.latitudeDelta,
            });
          }
        }}
        query={{
          key: 'AIzaSyB8gWNT2dW33oLQzkqJ5bQHdjpjZJEkd_0',
          language: 'ko',
        }}
      />
      <View style={styles.buttonContainer}>
        <CenterCoordinateButton onPress={getCenterCoordinate} />
      </View>
      <MyLocationButton onPress={getCurrentLocation} />
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
  buttonContainer: {
    position: 'absolute',
    bottom: 16,
    right: 16,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  loading: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default MapViewer;