type PhotoCollectionModel = {
  photoFileLocation: string;
  photoNote?: string;
  photoDate: Date;
  photoGeoLocation: {
    latitude: number;
    longitude: number;
  }
}

export default PhotoCollectionModel;
