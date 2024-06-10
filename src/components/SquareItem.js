import { View, Text, StyleSheet, Image } from "react-native";
import React from "react";

const clockIcon = require("../../assets/images/wall-clock.png");

const SquareItem = ({
  number,
  text,
  backgroundColor,
  iconBackgroundColor,
  textColor,
  iconColor,
}) => {
  return (
    <View style={[styles.squareContainer, { backgroundColor }]}>
      <View style={styles.iconView}>
        <View
          style={[
            styles.iconContainer,
            { backgroundColor: iconBackgroundColor },
          ]}>
          <Image
            source={clockIcon}
            style={[styles.icon, { tintColor: iconColor }]}
          />
        </View>
        <Text style={[styles.number, { color: "#000" }]}>{number}</Text>
      </View>
      <Text style={[styles.text, { color: textColor }]}>{text}</Text>
    </View>
  );
};

export default SquareItem;

const styles = StyleSheet.create({
  squareContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    width: 80,
    height: 90,
    borderRadius: 10,
    margin: 5,
    padding: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 2,
  },
  iconView: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  iconContainer: {
    width: 30,
    height: 30,
    borderRadius: 20, // Half of width and height to make it a circle
    justifyContent: "center",
    alignItems: "center",
  },
  icon: {
    width: 16,
    height: 16,
  },
  number: {
    marginLeft: 10,
    fontSize: 24,
    fontWeight: "bold",
    color: "#000",
  },
  text: {
    textAlign: "center",
    fontSize: 12,
    fontWeight: "bold",
  },
});
