// ImagePopup.js
import React from "react";
import {
  View,
  Modal,
  Image,
  StyleSheet,
  TouchableWithoutFeedback,
} from "react-native";

const ImagePopup = ({ imageUrl, visible, onClose }) => {
  return (
    <Modal visible={visible} transparent>
      <TouchableWithoutFeedback onPress={onClose}>
        <View style={styles.container}>
          <View style={styles.innerContainer}>
            <Image source={{ uri: imageUrl }} style={styles.image} />
          </View>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  innerContainer: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 10,
  },
  image: {
    width: 300,
    height: 300,
    resizeMode: "cover",
  },
});

export default ImagePopup;
