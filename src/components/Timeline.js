import React, { useContext, useState } from "react";
import {
  StyleSheet,
  ScrollView,
  Text,
  View,
  TouchableOpacity,
  Alert,
  Modal,
  TextInput,
} from "react-native";
import axios from "axios";
import FileModal from "./FileModal";
import { getFileExtension, getStatusColor } from "../utils/Helper";
import Icon from "react-native-vector-icons/FontAwesome";
import FeatherIcon from "react-native-vector-icons/Feather";
import { mainColor, mainUrl } from "../../Constants";
import { AuthContext } from "../context/AuthContext";
import { useNavigation } from "@react-navigation/native";

export default function Timeline({ complaint, items }) {
  const { token } = useContext(AuthContext);
  const navigation = useNavigation();
  const [modalVisible, setModalVisible] = useState(false);
  const [description, setDescription] = useState(""); // For storing the text input value
  const [descriptionError, setDescriptionError] = useState(false); // For tracking validation errors

  const now = new Date(); // Current date and time
  const expireDate = new Date();
  console.log("now", now.toLocaleString()); // Print in local timezone
  expireDate.setDate(now.getDate() + 7); // Add 7 days to the current date

  const resendComplaint = async () => {
    try {
      const formData = {
        // ...complaint,
        lastname: complaint.lastname,
        firstname: complaint.firstname,
        registerNumber: complaint.registerNumber,
        country: complaint.country,
        district: complaint.district,
        khoroo: complaint.khoroo,
        addressDetail: complaint.addressDetail,
        created_user_id: complaint.created_user_id,
        phone: complaint.phone || 0, // Default to 0 if null
        email: complaint.email || "", // Default to empty string if null
        category_id: complaint.category_id,
        complaint_type_id: complaint.complaint_type_id,
        complaint_type_summary_id: complaint.complaint_type_summary_id,
        complaint: complaint.complaint,
        energy_type_id: complaint.energy_type_id,
        complaint: complaint.complaint + "\n" + description, // Append new description
        organization_id: 99, // ЭХЗХ
        status_id: 0, // Шинэ гомдол
        second_org_id: complaint.organization_id, // Холбогдох ТЗЭ
        second_status_id: null, // Шинэ гомдол
        channel_id: 5, // Гар утас апп
        complaint_maker_type_id: 1, // Иргэн
        file_id: complaint.file_id,
      };

      // Make the API call
      const response = await axios.post(`${mainUrl}/api/complaints`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      // Check the status of the response
      if (response.status >= 200 && response.status < 300) {
        // Handle success
        Alert.alert("Амжилттай", "Таны гомдол амжилттай илгээгдлээ.");
        console.log("Complaint updated successfully:", response.data);
        navigation.navigate("ComplaintListScreen");
      } else {
        throw new Error(`Error: ${response.status} ${response.statusText}`);
      }
    } catch (error) {
      // Handle errors
      if (error.response) {
        // Server responded with a status outside the range of 2xx
        console.error("Response error:", error.response.data);
        Alert.alert(
          "Алдаа",
          `Серверийн алдаа: ${
            error.response.data.message || "Мэдээллийг шинэчлэх боломжгүй."
          }`
        );
      } else if (error.request) {
        // Request was made but no response was received
        console.error("No response received:", error.request);
        Alert.alert(
          "Алдаа",
          "Сүлжээний алдаа. Та интернет холболтоо шалгана уу."
        );
      } else {
        // Something else went wrong
        console.error("Error:", error.message);
        Alert.alert("Алдаа", "Гомдлын мэдээллийг илгээх явцад алдаа гарлаа.");
      }
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Шийдвэрлэлтийн явц</Text>

      {items.map((item, index) => {
        return (
          <View key={index}>
            <View style={styles.card}>
              <View style={styles.cardDelimiter}>
                {index !== items.length - 1 && (
                  <View style={styles.cardDelimiterLine} />
                )}

                <View style={styles.cardDelimiterInset}>
                  {item.status_id === 2 ? (
                    <Icon name="circle-o" size={18} color="#4ade80" />
                  ) : item.status_id === 6 ? (
                    <Icon name="check-circle" size={18} color="#4ade80" />
                  ) : (
                    <FeatherIcon name="message-square" size={16} color="gray" />
                  )}
                </View>
              </View>

              <View style={styles.cardBody}>
                <View style={styles.cardBodyContent}>
                  <View style={styles.cardTitle}>
                    <Text style={styles.cardOrg}>{item.org}</Text>
                  </View>
                  <View style={{ flexDirection: "row" }}>
                    <Text style={styles.cardDates}>{item.date}</Text>
                    <Text
                      style={[
                        styles.cardStatus,
                        { color: getStatusColor(item.status_id) },
                      ]}>
                      ({item.status})
                    </Text>
                  </View>

                  <View style={styles.contentText}>
                    <Text style={styles.cardDesc}>{item.desc}</Text>
                  </View>
                  {/* Display associated files */}
                  {
                    <View style={{ marginTop: 10 }}>
                      <Text style={{ fontSize: 12, color: "gray" }}>
                        Хавсралт файлууд:
                      </Text>
                      {item.files.map((file, fileIndex) => (
                        <View
                          key={fileIndex}
                          style={{ marginLeft: 30, marginTop: 5 }}>
                          <FileModal
                            fileName={file.filename}
                            fileExt={getFileExtension(file.filename)}
                            // fileSizeInKilobytes={file.fileSize / 1024}
                            fileSizeInKilobytes={1234}
                            fileUrl={file.url}
                          />
                        </View>
                      ))}
                    </View>
                  }
                </View>
              </View>
            </View>
          </View>
        );
      })}

      {complaint.status == "Шийдвэрлэсэн" &&
        complaint.organization_id !== 99 && (
          <View
            style={{
              padding: 10,
              flex: 1,
              justifyContent: "center",
              alignItems: "center",
            }}>
            <Text style={{ color: "gray", marginVertical: 10 }}>
              Өргөдөл, гомдлын шийдвэрлэлттэй санал нийлэхгүй байвал Эрчим
              хүчний зохицуулах хороонд дахин гомдол гаргах боломжтой.
            </Text>
            <TouchableOpacity
              style={{
                width: "100%",
                borderWidth: 1,
                borderColor: mainColor,
                borderRadius: 10,
                paddingVertical: 10,
                paddingHorizontal: 20,
                alignItems: "center",
              }}
              onPress={() => setModalVisible(true)}>
              <Text
                style={{
                  color: mainColor,
                  fontSize: 16,
                  fontWeight: "bold",
                }}>
                Гомдол гаргах
              </Text>
            </TouchableOpacity>
            {/* Modal */}
            <Modal
              animationType="slide"
              transparent={true}
              visible={modalVisible}
              onRequestClose={() => setModalVisible(false)}>
              <View style={styles.modalContainer}>
                <View style={styles.modalContent}>
                  {/* Modal Header */}
                  <View style={styles.modalHeader}>
                    <Text style={styles.modalTitle}>Гомдлын тайлбар</Text>
                  </View>
                  {/* Text Area Input */}
                  <TextInput
                    style={[
                      styles.textArea,
                      descriptionError && styles.textAreaError, // Highlight error
                    ]}
                    placeholder="Тайлбар оруулна уу..."
                    multiline={true}
                    numberOfLines={4}
                    value={description}
                    onChangeText={(text) => {
                      setDescription(text);
                      setDescriptionError(false); // Reset error on input
                    }}
                    textAlignVertical="top"
                  />
                  {/* Error Message */}
                  {descriptionError && (
                    <Text style={styles.errorMessage}>
                      Тайлбар оруулах шаардлагатай!
                    </Text>
                  )}
                  {/* Modal Buttons */}
                  <View style={styles.modalButtons}>
                    <TouchableOpacity
                      style={styles.cancelButton}
                      onPress={() => setModalVisible(false)}>
                      <Text style={styles.cancelButtonText}>Цуцлах</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={styles.submitButton}
                      onPress={() => {
                        if (!description.trim()) {
                          // If the description is empty or just whitespace
                          setDescriptionError(true);
                          return;
                        }
                        resendComplaint(); // Submit if valid
                      }}>
                      <Text style={styles.submitButtonText}>Илгээх</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            </Modal>
          </View>
        )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 16,
    fontWeight: "600",
    color: "#1d1d1d",
    paddingBottom: 5,
    marginBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: "gray",
  },
  /** Card */
  card: {
    flexDirection: "row",
    alignItems: "flex-start", // Change to flex-start to align items at the top
  },
  cardDelimiter: {
    position: "relative",
    width: 40,
    alignItems: "center",
    justifyContent: "flex-start", // Change to flex-start to align items at the top
    alignSelf: "stretch",
  },
  cardDelimiterLine: {
    position: "absolute",
    left: 20,
    top: 0, // Change to 0 to start the line from the top
    borderLeftWidth: 1,
    borderColor: "#cbd5e1",
    height: "100%", // Change to 100% to make the line span the entire height
    zIndex: 1,
  },
  cardDelimiterInset: {
    width: 28,
    height: 28,
    borderWidth: 1,
    borderRadius: 9999,
    backgroundColor: "#f1f5f9",
    borderColor: "#cbd5e1",
    zIndex: 9,
    position: "relative",
    alignItems: "center", // Center the icon
    justifyContent: "center", // Center the icon
  },
  cardBody: {
    padding: 12,
    flexDirection: "row",
    alignItems: "flex-start", // Change to flex-start to align items at the top
    justifyContent: "flex-start", // Change to flex-start to align items at the top
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: 0,
    borderColor: "#cbd5e1",
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 10,
  },
  cardBodyContent: {
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: 0,
  },
  cardTitle: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    flexWrap: "wrap", // Allow text to wrap
  },
  cardOrg: {
    fontSize: 14,
    fontWeight: "600",
    color: "#2a2a2a",
    flexShrink: 1, // Allow the text to shrink if necessary
  },
  cardStatus: {
    fontSize: 12,
    marginLeft: 5,
    color: "gray",
  },
  cardDates: {
    fontSize: 12,
    fontWeight: "500",
    color: "#ababab",
  },
  cardDesc: {
    marginTop: 10,
    fontSize: 14,
    fontWeight: "500",
    color: "#334155",
    marginBottom: 3,
  },
  buttonFile: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    backgroundColor: "whitesmoke",
    borderRadius: 5,
  },
  contentText: {
    marginVertical: 10,
    paddingHorizontal: 10, // Equivalent to p-4
    paddingVertical: 5, // Equivalent to p-4
    backgroundColor: "#f1f5f9", // Equivalent to bg-slate-100
    borderRadius: 8, // Equivalent to rounded
    textAlign: "justify", // Equivalent to text-justify
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3, // Equivalent to shadow-inner
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)", // Transparent background
  },
  modalContent: {
    width: "90%",
    backgroundColor: "white",
    borderRadius: 10,
    padding: 20,
    elevation: 5,
  },
  modalHeader: {
    marginBottom: 15,
    alignItems: "center",
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
  },
  textArea: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 10,
    fontSize: 16,
    backgroundColor: "#f9f9f9",
    minHeight: 80, // Ensures enough space for the text area
    textAlignVertical: "top", // Ensures the text starts from the top
  },
  textAreaError: {
    borderColor: "#e74c3c", // Highlight border in red
  },
  errorMessage: {
    color: "#e74c3c",
    fontSize: 14,
    marginTop: 5,
  },
  modalButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
  },
  cancelButton: {
    flex: 1,
    marginRight: 10,
    backgroundColor: "#e74c3c",
    paddingVertical: 10,
    borderRadius: 5,
    alignItems: "center",
  },
  cancelButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  submitButton: {
    flex: 1,
    marginLeft: 10,
    backgroundColor: "#27ae60",
    paddingVertical: 10,
    borderRadius: 5,
    alignItems: "center",
  },
  submitButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
});
