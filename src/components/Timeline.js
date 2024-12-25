import React, { useContext } from "react";
import {
  StyleSheet,
  ScrollView,
  Text,
  View,
  TouchableOpacity,
  Alert,
} from "react-native";
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
  // console.log(items);

  const now = new Date(); // Current date and time
  const expireDate = new Date();
  console.log("now", now.toLocaleString()); // Print in local timezone
  expireDate.setDate(now.getDate() + 7); // Add 7 days to the current date

  const handleComplaint = async (complaintId) => {
    try {
      // Replace with your actual API endpoint
      const apiUrl = `${mainUrl}/api/complaints/${complaintId}`;

      const updatedData = {
        status_id: 0, // Төлөв шинээр ирсэн болгох
        second_org_id: complaint.organization_id, // Холбогдох ТЗЭ
        organization_id: 99, // ЭХЗХ-д илгээх
        expire_date: expireDate.toISOString().split("T")[0], // Format as YYYY-MM-DD Шийдвэрлэх хцгацааг 7 хоног болгох
      };

      // Make the API call
      const response = await fetch(apiUrl, {
        method: "PATCH", // Use PATCH or PUT as needed
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, // Add token if required
        },
        body: JSON.stringify(updatedData), // Updated complaint data
      });

      // Check response status
      if (!response.ok) {
        throw new Error(`Error: ${response.status} ${response.statusText}`);
      }

      const result = await response.json();

      // Handle success
      Alert.alert("Амжилттай", "Гомдлын мэдээлэл амжилттай шинэчлэгдлээ.");
      console.log("Complaint updated successfully:", result);
      navigation.navigate("ComplaintListScreen");
    } catch (error) {
      // Handle errors
      Alert.alert("Алдаа", "Гомдлын мэдээллийг шинэчлэх явцад алдаа гарлаа.");
      console.error("Error updating complaint:", error);
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
                  {item.fileUrl && (
                    <View style={{ marginLeft: 30 }}>
                      <Text style={{ fontSize: 12, color: "gray" }}>
                        Хавсралт файл
                      </Text>
                      <FileModal
                        fileName={item.fileName}
                        fileExt={getFileExtension(item.fileName)}
                        fileSizeInKilobytes={1234}
                        fileUrl={item.fileUrl}
                      />
                    </View>
                  )}
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
              onPress={() =>
                Alert.alert(
                  "Баталгаажуулах",
                  "Та гомдлоо ЭХЗХ-нд гаргахдаа итгэлтэй байна уу?",
                  [
                    {
                      text: "Үгүй",
                      onPress: () => console.log("Canceled"),
                      style: "cancel",
                    },
                    {
                      text: "Тийм",
                      onPress: () => handleComplaint(complaint.id),
                    },
                  ],
                  { cancelable: false }
                )
              }>
              <Text
                style={{
                  color: mainColor,
                  fontSize: 16,
                  fontWeight: "bold",
                }}>
                Гомдол гаргах
              </Text>
            </TouchableOpacity>
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
});
