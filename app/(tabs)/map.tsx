import React, { useCallback, useEffect, useState, useRef } from "react";
import MapView, {
  Marker,
  PROVIDER_GOOGLE,
  PROVIDER_DEFAULT,
} from "react-native-maps";
import {
  View,
  Text,
  Platform,
  Image,
  TouchableOpacity,
} from "react-native";
import { getPhotos, removePhoto } from "@/helpers/photoHelper";
import PhotoCollectionModel from "@/app/models/PhotoCollection";
import { useFocusEffect } from "expo-router";
import Popup from "@/components/Modal";
import AntDesign from "@expo/vector-icons/AntDesign";
import * as Location from "expo-location";

import styles from "../styles/explore.style";

export default function App() {
  const mapRef = useRef(null);
  const [markers, setMarkers] = useState<PhotoCollectionModel[]>([]);
  const [activeMarkerData, setActiveMarkerData] =
    useState<PhotoCollectionModel | null>(null);
  const [modalVisible, setModalVisible] = useState(false);

  const onMarkerPress = (marker: PhotoCollectionModel) => {
    setActiveMarkerData(marker);
    setModalVisible(true);
  };

  const fetchMarkers = async () => {
    const markers = await getPhotos();
    setMarkers(markers);
    return markers;
  };

  const deletePhoto = async (fileUri: string) => {
    await removePhoto(fileUri);
    setModalVisible(false);
    fetchMarkers();
  };

  useFocusEffect(
    useCallback(() => {
      fetchMarkers();
      return () => {
        mapRef.current.animateToRegion({ "latitude": "41.0938977", "latitudeDelta": 0.05, "longitude": "29.0040908", "longitudeDelta": 0.05 }, 1000)
      };
    }, []),
  );

  useEffect(() => {
    fetchMarkers().then(newMarkers => {
      const locationCollection = {
        longitude: '',
        latitude: '',
        latitudeDelta: 0.05,
        longitudeDelta: 0.05,
      }

      if (newMarkers.length) {
        locationCollection.longitude = String(newMarkers[newMarkers.length - 1].photoGeoLocation.longitude);
        locationCollection.latitude = String(newMarkers[newMarkers.length - 1].photoGeoLocation.latitude);
      } else {
        Location.getCurrentPositionAsync({}).then((location) => {
          locationCollection.longitude = String(location.coords.longitude);
          locationCollection.latitude = String(location.coords.latitude);
        })
      }

      if (mapRef.current) {
        setTimeout(() => {
          mapRef.current.animateToRegion(locationCollection, 1000);
        }, 3000)
      }
    });
  }, []);



  return (
    <View style={styles.container}>
      <MapView
        ref={mapRef}
        style={styles.map}
        provider={Platform.OS === "ios" ? PROVIDER_DEFAULT : PROVIDER_GOOGLE}
      >
        {markers.map((marker, index) => {
          return (
            <Marker
              key={index}
              coordinate={marker.photoGeoLocation}
              onPress={() => onMarkerPress(marker)}
            />
          );
        })}
      </MapView>
      {
        activeMarkerData && (
          <Popup
            visible={modalVisible}
            transparent={true}
            dismiss={() => setModalVisible(false)}
            margin={25}
          >
            <View>
              <Image
                source={{ uri: activeMarkerData.photoFileLocation }}
                style={styles.modalImage}
              />
              <Text
                style={styles.photoNote}
              >
                {activeMarkerData?.photoNote}
              </Text>
              <Text
                style={styles.photoDate}
              >
                {new Date(activeMarkerData?.photoDate).toLocaleDateString('tr-TR')}
              </Text>
              <TouchableOpacity
                style={styles.deleteContainer}
                onPress={() => deletePhoto(activeMarkerData.photoFileLocation)}
              >
                <AntDesign name="delete" size={24} color="red" />
              </TouchableOpacity>
            </View>
          </Popup>
        )
      }
    </View >
  );
}
