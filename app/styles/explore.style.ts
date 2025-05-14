import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    zIndex: 0
  },
  map: {
    width: "100%",
    height: "100%",
    flex: 1,
  },
  modalContent: {
    width: "100%",
    backgroundColor: "white",
    borderRadius: 20,
    position: "absolute",
    bottom: 0,
  },
  titleContainer: {
    backgroundColor: "white",
    borderRadius: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  title: {
    color: "#fff",
    fontSize: 16,
  },
  photoNote: {
    color: "white",
    fontWeight: "bold",
    fontSize: 25,
    position: "absolute",
    bottom: 25,
    left: 25,
    textShadowColor: "rgba(0, 0, 0, 0.75)",
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 10,
  },
  photoDate: {
    color: "white",
    fontWeight: "regular",
    fontSize: 12,
    position: "absolute",
    bottom: 10,
    left: 25,
    textShadowColor: "rgba(0, 0, 0, 0.75)",
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 10,
  },
  modalImage: {
    width: "100%", aspectRatio: 1, borderRadius: 10
  },
  deleteContainer: {
    position: "absolute", top: 15, right: 25
  }
});

export default styles;
