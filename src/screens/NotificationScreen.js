import React, { useState } from "react";
import { View, FlatList, Text, StyleSheet } from "react-native";
import EmptyData from "../components/EmptyData";
import { SafeAreaView } from "react-native-safe-area-context";
import Header from "../components/Header";

const NotificationScreen = () => {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
      <View style={styles.container}>
        <EmptyData
          message="Мэдэгдэл ирээгүй байна"
          imageSource={require("../../assets/images/empty-folder.png")}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  item: {
    backgroundColor: "#fff",
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  itemText: {
    fontSize: 16,
  },
});

export default NotificationScreen;
