import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Modal,
  Image,
  Linking,
} from "react-native";
import { WebView } from "react-native-webview";
import AntDesignIcon from "react-native-vector-icons/AntDesign";

const FileModal = ({ fileName, fileExt, fileSizeInKilobytes, fileUrl }) => {
  //   console.log(fileUrl);
  const [modalOpen, setModalOpen] = useState(false);

  const truncateFilename = (filename, maxLength = 15) => {
    if (filename.length <= maxLength) return filename;
    return `${filename.slice(0, maxLength)}...`;
  };

  const fileIcons = {
    pdf: require("../../assets/images/pdf.png"), // Update with correct paths
    png: require("../../assets/images/png.png"),
    jpg: require("../../assets/images/jpg.png"),
    default: require("../../assets/images/jpg.png"),
  };

  const getFileIcon = (ext) => {
    return fileIcons[ext] || fileIcons.default;
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => setModalOpen(!modalOpen)}
        style={styles.fileButton}>
        <View style={styles.fileInfo}>
          <Image source={getFileIcon(fileExt)} style={styles.fileIcon} />
          <View style={styles.fileDetails}>
            <Text style={styles.fileName}>
              {truncateFilename(fileName)}.{fileExt}
            </Text>
            {/* <Text style={styles.fileSize}>{fileSizeInKilobytes} KB</Text> */}
          </View>
        </View>
        <TouchableOpacity
          onPress={() => Linking.openURL(fileUrl)}
          style={styles.downloadButton}>
          <Text style={styles.downloadText}>
            <AntDesignIcon name="download" size={18} />
          </Text>
        </TouchableOpacity>
      </TouchableOpacity>

      <Modal
        visible={modalOpen}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setModalOpen(false)}>
        <View style={styles.modalOverlay}>
          <TouchableOpacity
            style={styles.modalBackground}
            onPress={() => setModalOpen(false)}
          />
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Хавсралт файл</Text>
              <TouchableOpacity
                onPress={() => setModalOpen(false)}
                style={styles.closeButton}>
                <Text style={styles.closeText}>✕</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.modalBody}>
              {fileExt === "pdf" ? (
                <WebView source={{ uri: fileUrl }} style={styles.webView} />
              ) : (
                <Image source={{ uri: fileUrl }} style={styles.image} />
              )}
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    // paddingHorizontal: 10,
  },
  fileButton: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    borderColor: "#d1d5db",
    borderWidth: 2,
    borderRadius: 10,
    backgroundColor: "#f1f5f9",
  },
  fileInfo: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  fileIcon: {
    width: 24,
    height: 24,
  },
  fileDetails: {
    marginLeft: 10,
    flex: 1,
  },
  fileName: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#334155",
    flexShrink: 1,
  },
  fileSize: {
    fontSize: 12,
    color: "#6b7280",
  },
  downloadButton: {
    width: 24,
    height: 24,
    justifyContent: "center",
    alignItems: "center",
  },
  downloadText: {
    fontSize: 24,
    color: "#6b7280",
  },
  modalOverlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  modalBackground: {
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    width: "90%",
    maxHeight: "80%",
    height: "35%",
    backgroundColor: "white",
    borderRadius: 10,
    overflow: "hidden",
  },
  modalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#e5e7eb",
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#374151",
  },
  closeButton: {
    padding: 5,
  },
  closeText: {
    fontSize: 18,
    color: "#6b7280",
  },
  modalBody: {
    padding: 10,
    flex: 1,
  },
  webView: {
    flex: 1,
  },
  image: {
    width: "100%",
    height: "100%",
    resizeMode: "contain",
  },
});

export default FileModal;
