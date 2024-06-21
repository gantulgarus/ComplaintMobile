import { View, Text, StyleSheet, Dimensions } from "react-native";
import React from "react";
import Icon from "react-native-vector-icons/Ionicons";
import Datetime from "./Datetime";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useNavigation } from "@react-navigation/native";
import { getStatusColor } from "../utils/Helper";

const { width } = Dimensions.get("window");
const columnWidth = width * 0.2;

const ComplaintItem = ({ complaint }) => {
  // console.log(complaint);
  const navigation = useNavigation();
  const color = getStatusColor(complaint.status_id);
  return (
    <TouchableOpacity
      onPress={() =>
        navigation.navigate("ComplaintDetail", {
          id: complaint.id,
        })
      }>
      <View style={styles.container}>
        <View width={columnWidth} style={styles.firstColumn}>
          <Text style={styles.serialNumber}>№{complaint.serial_number}</Text>
          <Text style={[styles.status, { color: color }]}>
            {complaint.status}
          </Text>
        </View>
        <View style={styles.secondColumn}>
          <Text style={styles.organization}>{complaint.org}</Text>
          <Text
            numberOfLines={2}
            ellipsizeMode="tail"
            style={styles.complaintDesc}>
            {/* {complaint.complaint.substring(0, 70)} */}
            {complaint.complaint}
          </Text>
          <View style={styles.complaintDate}>
            <Icon name="calendar-clear-outline" size={12} color="#000" />
            <Datetime datetimeString={complaint.complaint_date} />
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 80,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    margin: 5,
    padding: 10,
    backgroundColor: "#fff",
    marginBottom: 10,
    borderRadius: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  firstColumn: {
    // backgroundColor: "skyblue",
  },
  secondColumn: {
    flex: 1,
    marginLeft: 10,
    // backgroundColor: "powderblue",
  },
  serialNumber: {
    fontSize: 12,
    fontWeight: "bold",
    marginBottom: 5,
  },
  status: {
    fontSize: 10,
    fontWeight: "bold",
  },
  organization: {
    fontSize: 12,
    fontWeight: "bold",
  },
  complaintDesc: {
    fontSize: 12,
    marginBottom: 5,
    color: "gray",
  },
  complaintDate: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
  },
});

export default ComplaintItem;
