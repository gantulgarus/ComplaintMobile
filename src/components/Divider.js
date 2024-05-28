import React from "react";
import { View, StyleSheet } from "react-native";

const Divider = ({ color = "lightgray", thickness = 1, style }) => {
  return (
    <View
      style={[
        styles.divider,
        { borderBottomColor: color, borderBottomWidth: thickness },
        style,
      ]}
    />
  );
};

const styles = StyleSheet.create({
  divider: {
    width: "100%",
    alignSelf: "stretch",
  },
});

export default Divider;
