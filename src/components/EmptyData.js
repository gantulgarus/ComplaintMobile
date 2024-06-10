import { StyleSheet, Text, View, Image } from "react-native";
import React from "react";

const EmptyData = ({ message, imageSource }) => {
  return (
    <View style={styles.container}>
      <Image source={imageSource} style={styles.image} />
      <Text style={styles.message}>{message}</Text>
    </View>
  );
};

export default EmptyData;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
    padding: 20,
  },
  image: {
    width: 60,
    height: 60,
    marginBottom: 20,
  },
  message: {
    fontSize: 14,
    color: "#777",
    textAlign: "center",
  },
});
