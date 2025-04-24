import AsyncStorage from '@react-native-async-storage/async-storage';
import PhotoCollectionModel from "@/app/models/PhotoCollection";
import * as FileSystem from "expo-file-system";

export const getPhotos: () => Promise<PhotoCollectionModel[]> = async () => {
  const photos = await AsyncStorage.getItem('photoCollection');
  const collection: PhotoCollectionModel[] = photos ? JSON.parse(photos) : [];

  return collection;
};

export const addPhoto = async (photo: PhotoCollectionModel) => {
  const photos = await getPhotos();
  if (!photo.photoFileLocation) {
    return false;
  }
  photos.push(photo);
  await AsyncStorage.setItem('photoCollection', JSON.stringify(photos));

  return true;
}

export const removePhoto = async (fileUri: string) => {
  await FileSystem.deleteAsync(fileUri, { idempotent: true });
  const photos = await getPhotos();
  const updatedPhotos = photos.filter(photo => photo.photoFileLocation !== fileUri);
  await AsyncStorage.setItem('photoCollection', JSON.stringify(updatedPhotos));
  return updatedPhotos;
}


