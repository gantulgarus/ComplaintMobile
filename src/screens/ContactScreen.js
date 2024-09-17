import React from "react";
import { View, ScrollView, Image, Text, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import CustomHeader from "../components/CustomHeader";

const ContactScreen = () => {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
      <CustomHeader title="Холбоо барих" />
      <ScrollView contentContainerStyle={styles.container}>
        <Image
          style={styles.image}
          source={require("../../assets/images/contact.jpg")}
        />
        <View style={styles.content}>
          <View style={styles.infoContainer}>
            <Text style={styles.infoLabel}>Имэйл:</Text>
            <Text style={styles.infoValue}>info@erc.gov.mn</Text>
          </View>
          <View style={styles.infoContainer}>
            <Text style={styles.infoLabel}>Утас:</Text>
            <Text style={styles.infoValue}>976-11-320126</Text>
          </View>
          <View style={styles.infoContainer}>
            <Text style={styles.infoLabel}>Хаяг:</Text>
            <Text style={styles.infoValue}>
              Ж.Самбуугийн гудамж - 30, Бага тойруу, Сүхбаатар дүүрэг,
              Улаанбаатар 14201
            </Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 10,
    paddingVertical: 15,
    backgroundColor: "#f8f8f8",
    borderBottomWidth: 1,
    borderBottomColor: "#e8e8e8",
  },
  backButton: {
    padding: 10,
    backgroundColor: "#007BFF",
    borderRadius: 5,
  },
  backButtonText: {
    color: "#fff",
    fontSize: 16,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "bold",
    position: "absolute",
    left: "50%",
    transform: [{ translateX: -50 }],
  },
  headerSpacer: {
    width: 64, // To balance the space occupied by the back button
  },
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center", // Center content horizontally
  },
  image: {
    height: 400,
    width: "100%",
    resizeMode: "cover",
  },
  content: {
    width: "90%",
    // paddingVertical: 20,
  },
  infoContainer: {
    // marginTop: 20,
  },
  infoLabel: {
    fontWeight: "bold",
  },
  infoValue: {
    marginTop: 5,
  },
});

export default ContactScreen;
