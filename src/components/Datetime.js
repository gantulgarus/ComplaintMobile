import { View, Text, StyleSheet } from "react-native";
import React from "react";

const Datetime = ({ datetimeString }) => {
  const formattedDate = new Date(datetimeString).toLocaleDateString(); // Get the formatted date string

  return (
    <View>
      <Text style={styles.date}>{formattedDate}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  date: {
    fontSize: 10,
    textAlign: "right",
    color: "gray",
    marginLeft: 3,
  },
});

export default Datetime;
