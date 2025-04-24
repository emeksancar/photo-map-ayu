import { StyleSheet, Platform } from "react-native";

const styles = StyleSheet.create({

  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#555555",
    zIndex: 1,
  },
  message: {
    textAlign: "center",
    paddingBottom: 10,
    color: "#ffffff",
  },
  capture: {
    alignSelf: "center",
    alignItems: "center",
  },
  camera: {
    position: 'static',
    width: "100%",
    height: "100%",
  },
  buttonContainer: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "center",
    position: "absolute",
    bottom: Platform.OS === "ios" ? 100 : 10,
  },
  toggleCameraButton: {
    position: "absolute",
    right: 20,
    bottom: 20,
  },
  button: {
    alignSelf: "flex-end",
    alignItems: "center",
  },
  text: {
    fontSize: 24,
    fontWeight: "bold",
    color: "white",
  },
});

export default styles;
