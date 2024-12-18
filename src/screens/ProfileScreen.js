import React, { useState, useContext } from "react";
import {
  StyleSheet,
  SafeAreaView,
  View,
  ScrollView,
  Text,
  TouchableOpacity,
  Switch,
  Image,
} from "react-native";
import FeatherIcon from "react-native-vector-icons/Feather";
import { AuthContext } from "../context/AuthContext";
import { useNavigation } from "@react-navigation/native";

export default function ProfileScreen() {
  const { user } = useContext(AuthContext);
  const navigation = useNavigation();
  const [form, setForm] = useState({
    emailNotifications: true,
    pushNotifications: false,
  });

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#f8f8f8" }}>
      <View style={styles.container}>
        <ScrollView contentContainerStyle={styles.content}>
          <View style={[styles.section, { paddingTop: 10 }]}>
            <Text style={styles.sectionTitle}>Профайл</Text>
            <View style={styles.sectionBody}>
              <TouchableOpacity
                onPress={() => {
                  // handle onPress
                }}
                style={styles.profile}>
                <Image
                  alt="Profile"
                  // source={{ uri: "data:image/png;base64," + user?.danImage }}
                  source={
                    user?.danImage
                      ? { uri: "data:image/png;base64," + user?.danImage }
                      : require("../../assets/images/user.png") // Default image
                  }
                  style={styles.profileAvatar}
                />
                <View style={styles.profileBody}>
                  <Text style={styles.profileName}>
                    {user?.danLastname && user?.danFirstname
                      ? user?.danLastname + " " + user?.danFirstname
                      : user?.name}
                  </Text>
                  <Text style={styles.profileHandle}>{user?.email}</Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Хэрэглэгчийн мэдээлэл</Text>
            <View style={styles.sectionBody}>
              <View style={[styles.rowWrapper, styles.rowFirst]}>
                <View style={styles.row}>
                  <Text style={styles.rowLabel}>Овог</Text>
                  <View style={styles.rowSpacer} />
                  <Text style={styles.rowValue}>{user?.danLastname}</Text>
                </View>
              </View>
              <View style={styles.rowWrapper}>
                <View style={styles.row}>
                  <Text style={styles.rowLabel}>Нэр</Text>
                  <View style={styles.rowSpacer} />
                  <Text style={styles.rowValue}>{user?.danFirstname}</Text>
                </View>
              </View>
              <View style={styles.rowWrapper}>
                <View style={styles.row}>
                  <Text style={styles.rowLabel}>Регистрийн дугаар</Text>
                  <View style={styles.rowSpacer} />
                  <Text style={styles.rowValue}>{user?.danRegnum}</Text>
                </View>
              </View>
              <View style={styles.rowWrapper}>
                <View style={styles.row}>
                  <Text style={styles.rowLabel}>УБ/Орон нутаг</Text>
                  <View style={styles.rowSpacer} />
                  <Text style={styles.rowValue}>{user?.danAimagCityName}</Text>
                </View>
              </View>
              <View style={styles.rowWrapper}>
                <View style={styles.row}>
                  <Text style={styles.rowLabel}>Сум/Дүүрэг</Text>
                  <View style={styles.rowSpacer} />
                  <Text style={styles.rowValue}>
                    {user?.danSoumDistrictName}
                  </Text>
                </View>
              </View>
              <View style={styles.rowWrapper}>
                <View style={styles.row}>
                  <Text style={styles.rowLabel}>Баг/Хороо</Text>
                  <View style={styles.rowSpacer} />
                  <Text style={styles.rowValue}>{user?.danBagKhorooName}</Text>
                </View>
              </View>
              <View style={styles.rowWrapper}>
                <Text style={styles.rowLabel}>Дэлгэрэнгүй хаяг</Text>
                <Text style={styles.rowValueTextbox}>
                  {user?.danPassportAddress}
                </Text>
              </View>
            </View>
          </View>
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Системийн мэдээлэл</Text>
            <View style={styles.sectionBody}>
              <View style={styles.rowWrapper}>
                <View style={styles.row}>
                  <Text style={styles.rowLabel}>Имэйл</Text>
                  <View style={styles.rowSpacer} />
                  <Text style={styles.rowValue}>{user?.email}</Text>
                </View>
              </View>
              <View style={styles.rowWrapper}>
                <View style={styles.row}>
                  <Text style={styles.rowLabel}>Утас</Text>
                  <View style={styles.rowSpacer} />
                  <Text style={styles.rowValue}>{user?.phone}</Text>
                </View>
              </View>
            </View>
          </View>
          {/* Edit Profile Button */}
          <View style={styles.section}>
            <TouchableOpacity
              style={styles.editButton}
              onPress={() => navigation.navigate("EditProfileScreen")}>
              <Text style={styles.editButtonText}>Засах</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 0,
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: 0,
  },
  /** Header */
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
    paddingHorizontal: 16,
  },
  headerAction: {
    width: 40,
    height: 40,
    alignItems: "flex-start",
    justifyContent: "center",
  },
  headerTitle: {
    fontSize: 19,
    fontWeight: "600",
    color: "#000",
  },
  /** Content */
  content: {
    paddingHorizontal: 16,
  },
  contentFooter: {
    marginTop: 24,
    fontSize: 13,
    fontWeight: "500",
    textAlign: "center",
    color: "#a69f9f",
  },
  /** Section */
  section: {
    paddingVertical: 12,
  },
  sectionTitle: {
    margin: 8,
    marginLeft: 12,
    fontSize: 13,
    letterSpacing: 0.33,
    fontWeight: "500",
    color: "#a69f9f",
    textTransform: "uppercase",
  },
  sectionBody: {
    borderRadius: 12,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
  },
  /** Profile */
  profile: {
    padding: 12,
    backgroundColor: "#fff",
    borderRadius: 12,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
  },
  profileAvatar: {
    width: 60,
    height: 60,
    borderRadius: 9999,
    marginRight: 12,
  },
  profileBody: {
    marginRight: "auto",
  },
  profileName: {
    fontSize: 18,
    fontWeight: "600",
    color: "#292929",
  },
  profileHandle: {
    marginTop: 2,
    fontSize: 16,
    fontWeight: "400",
    color: "#858585",
  },
  /** Row */
  row: {
    height: 44,
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    paddingRight: 12,
  },
  rowWrapper: {
    paddingLeft: 16,
    backgroundColor: "#fff",
    borderTopWidth: 1,
    borderColor: "#f0f0f0",
  },
  rowFirst: {
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
  },
  rowLabel: {
    fontSize: 16,
    letterSpacing: 0.24,
    color: "#000",
  },
  rowSpacer: {
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: 0,
  },
  rowValue: {
    fontSize: 16,
    fontWeight: "500",
    color: "#ababab",
    marginRight: 4,
  },
  rowValueTextbox: {
    fontSize: 14,
    paddingVertical: 4,
    fontWeight: "500",
    color: "#ababab",
    marginRight: 4,
  },
  rowLast: {
    borderBottomLeftRadius: 12,
    borderBottomRightRadius: 12,
  },
  rowLabelLogout: {
    width: "100%",
    textAlign: "center",
    fontWeight: "600",
    color: "#dc2626",
  },
  editButton: {
    marginVertical: 10,
    padding: 12,
    backgroundColor: "#007BFF",
    borderRadius: 8,
    alignItems: "center",
  },
  editButtonText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#fff",
  },
});
