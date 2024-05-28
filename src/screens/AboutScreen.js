import { View, StyleSheet, Text } from "react-native";
import React from "react";

const AboutScreen = () => {
  return (
    <View style={styles.center}>
      <Text>This is the about screen</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
  },
});

export default AboutScreen;
