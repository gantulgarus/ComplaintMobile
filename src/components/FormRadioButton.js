import { View, StyleSheet } from "react-native";
import React from "react";
import { RadioButton, Text, TouchableRipple } from "react-native-paper";

const FormRadioButton = (props) => {
  return (
    <View style={styles.container}>
      <TouchableRipple
        onPress={() => props.onValueChange(1)}
        rippleColor="rgba(0, 0, 0, .32)"
        style={styles.radioItem}>
        <View style={styles.radioButton}>
          <RadioButton
            value={1}
            status={props.value == 1 ? "checked" : "unchecked"}
            onPress={() => props.onValueChange(1)}
          />
          <Text style={styles.title}>Цахилгаан</Text>
        </View>
      </TouchableRipple>
      <TouchableRipple
        onPress={() => props.onValueChange(2)}
        rippleColor="rgba(0, 0, 0, .32)"
        style={styles.radioItem}>
        <View style={styles.radioButton}>
          <RadioButton
            value={2}
            status={props.value == 2 ? "checked" : "unchecked"}
            onPress={() => props.onValueChange(2)}
          />
          <Text style={styles.title}>Дулаан</Text>
        </View>
      </TouchableRipple>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    // backgroundColor: "red",
    marginBottom: 10,
  },
  radioItem: {
    width: "48%", // Adjust as needed for spacing
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 5,
    backgroundColor: "#EAF0F1",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
  },
  radioButton: {
    flexDirection: "row",
    alignItems: "center",
  },
  title: {
    fontSize: 16,
    color: "#05375a",
  },
});

export default FormRadioButton;
