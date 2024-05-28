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
    backgroundColor: "#f0f0f0",
    padding: 20,
  },
  image: {
    width: 100,
    height: 100,
    marginBottom: 20,
  },
  message: {
    fontSize: 18,
    color: "#777",
    textAlign: "center",
  },
});
