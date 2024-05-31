import { View, Text, StyleSheet, Image } from "react-native";
import React from "react";

const clockIcon = require("../../assets/images/wall-clock.png");

const SquareItem = ({
  number,
  text,
  backgroundColor,
  textColor,
  iconColor,
}) => {
  return (
    <View style={[styles.squareContainer, { backgroundColor }]}>
      <View style={styles.iconContainer}>
        <Image
          source={clockIcon}
          style={[styles.icon, { tintColor: iconColor }]}
        />
        <Text style={[styles.number, { color: textColor }]}>{number}</Text>
      </View>
      <Text style={[styles.text, { color: textColor }]}>{text}</Text>
    </View>
  );
};

export default SquareItem;

const styles = StyleSheet.create({
  squareContainer: {
    width: 100,
    height: 100,
    backgroundColor: "#fff",
    borderRadius: 10,
    justifyContent: "flex-start",
    alignItems: "flex-start",
    margin: 10,
    padding: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 2,
  },
  iconContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  icon: {
    width: 20,
    height: 20,
    marginRight: 5,
  },
  number: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#000",
  },
  text: {
    textAlign: "center",
    fontSize: 14,
    fontWeight: "bold",
  },
});
