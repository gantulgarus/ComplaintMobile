import React, { useState } from "react";
import { View, FlatList, Text, StyleSheet } from "react-native";
import EmptyData from "../components/EmptyData";

const NotificationScreen = () => {
  const [notifications, setNotifications] = useState([
    { id: 1, text: "New message from John" },
    { id: 2, text: "Reminder: Meeting at 10 AM" },
    { id: 3, text: "You have 3 new emails" },
  ]);

  const renderItem = ({ item }) => (
    <View style={styles.item}>
      <Text style={styles.itemText}>{item.text}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      {/* <FlatList
        data={notifications}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
      /> */}
      <EmptyData
        message="No data available"
        imageSource={require("../../assets/images/empty-folder.png")}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  item: {
    backgroundColor: "#f9c2ff",
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  itemText: {
    fontSize: 16,
  },
});

export default NotificationScreen;
