import { CameraView, CameraType, useCameraPermissions } from "expo-camera";
import * as Location from "expo-location";
import { useState, useRef, useEffect } from "react";
import {
  Button,
  Text,
  TouchableOpacity,
  View,
  Alert,
} from "react-native";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import PhotoCollectionModel from "@/app/models/PhotoCollection";
import Dialog from "react-native-dialog";

import { addPhoto } from "@/helpers/photoHelper";
import Loader from "@/helpers/ActivityIndicator";
import styles from '../styles/camera.style';

export default function Camera() {
  const [facing, setFacing] = useState<CameraType>("back");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [cameraPermission, requestCameraPermission] = useCameraPermissions();
  const [locationPermission, setLocationPermission] = useState<boolean>(true);
  const cameraRef = useRef(null);
  const [promptVisible, setPromptVisible] = useState(false);
  const [photoNote, setPhotoNote] = useState<string>("");
  const [photoFileLocation, setPhotoFileLocation] = useState("");

  useEffect(() => {
    getLocationPermission();
  }, []);

  const getLocationPermission = async () => {
    const locationPermission =
      await Location.requestForegroundPermissionsAsync();

    if (locationPermission.granted) {
      console.log("Location permission granted");
      setLocationPermission(true);
    } else if (!locationPermission.canAskAgain && !locationPermission.granted) {
      setLocationPermission(false);
      Alert.alert("Lütfen uygulama ayarlarından konum iznini veriniz!");
    }
  };

  const getCameraPermission = async () => {
    const status = await requestCameraPermission();
    if (!status.granted && !status.canAskAgain) {
      Alert.alert("Lütfen uygulama ayarlarından kamera iznini veriniz!");
    }
  };

  const requestPermissions = (permissionType: "location" | "camera") => {
    if (permissionType === "camera") {
      getCameraPermission();
    } else {
      getLocationPermission();
    }
  };

  if (!cameraPermission?.granted || !locationPermission) {
    const permissionText = cameraPermission?.granted ? "Konum" : "Kamera";

    return (
      <View style={styles.container}>
        <Text style={styles.message}>
          Devam edebilmek için {permissionText.toLowerCase()} izni veriniz!
        </Text>
        <Button
          onPress={() =>
            requestPermissions(
              cameraPermission?.granted ? "location" : "camera",
            )
          }
          title={`${permissionText} İzni Ver`}
        />
      </View>
    );
  }

  function toggleCameraFacing() {
    setFacing((current) => (current === "back" ? "front" : "back"));
  }

  const takePicture = async (noteTaken: boolean) => {
    if (!noteTaken) {
      setPromptVisible(true);

      if (cameraRef.current) {
        let photo = await cameraRef.current.takePictureAsync();
        setPhotoFileLocation(photo.uri);
      } else {
        Alert.alert("Fofograf kaydedilemedi, izinlerinizi kontrol edip tekrar deneyiniz.")
      }

      return;
    }

    setIsLoading(true);
    setPromptVisible(false);

    let location = await Location.getCurrentPositionAsync({});

    const photoCollectionItem: PhotoCollectionModel = {
      photoNote,
      photoFileLocation: photoFileLocation,
      photoDate: new Date(),
      photoGeoLocation: {
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      },
    };

    const result = await addPhoto(photoCollectionItem);

    if (!result) {
      Alert.alert("Fofograf kaydedilemedi, izinlerinizi kontrol edip tekrar deneyiniz.");
    }

    setPhotoNote("");
    setPhotoFileLocation("");
    setIsLoading(false);
  };
  return (
    <>
      <View style={styles.container}>
        {isLoading && <View style={{ flex: 1, position: 'absolute', top: 0, left: 0, bottom: 0, right: 0, zIndex: 2 }}>
          <Loader />
        </View>
        }
        <Dialog.Container visible={promptVisible}>
          <Dialog.Title style={{ color: '#000000' }}>Anı Notu Ekle</Dialog.Title>
          <Dialog.Description style={{ color: '#000000' }}>
            Fotoğrafınıza bir not eklemek ister misiniz?
          </Dialog.Description>
          <Dialog.Input style={{ color: '#000000' }} onChangeText={(prompt) => setPhotoNote(prompt)} />
          <Dialog.Button
            color={"red"}
            label="İstemiyorum"
            onPress={() => takePicture(true)}
          />
          <Dialog.Button label="Kaydet" onPress={() => takePicture(true)} />
        </Dialog.Container>
        <CameraView
          style={styles.camera}
          facing={facing}
          ref={cameraRef}
        ></CameraView>
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={[styles.button]}
            onPress={() => takePicture(false)}
          >
            <MaterialCommunityIcons
              name="circle-slice-8"
              size={75}
              color="#ffffff"
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.button, styles.toggleCameraButton]}
            onPress={toggleCameraFacing}
          >
            <FontAwesome6 name="arrows-rotate" size={30} color="#ffffff" />
          </TouchableOpacity>
        </View>
      </View>
    </>
  );
}

