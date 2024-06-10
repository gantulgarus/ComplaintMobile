import { View, StyleSheet, TextInput, Platform } from "react-native";
import React, { useState } from "react";
import { mainColor, formTextColor } from "../../Constants";
import FeatherIcon from "react-native-vector-icons/Feather";
import { RadioButton, Text, TouchableRipple } from "react-native-paper";

const FormRadioButton = (props) => {
  return (
    <View>
      <Text style={{ fontSize: 16, paddingTop: 15, color: formTextColor }}>
        {props.label}
      </Text>
      <View
        style={{
          flexDirection: "row",
          marginTop: 10,
        }}>
        <FeatherIcon name={props.icon} size={20} color={formTextColor} />
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
              <Text>Цахилгаан</Text>
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
              <Text>Дулаан</Text>
            </View>
          </TouchableRipple>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
  },
  radioItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 10,
    backgroundColor: "#EAF0F1",
    marginHorizontal: 5,
  },
  radioButton: {
    flexDirection: "row",
    alignItems: "center",
  },
});

export default FormRadioButton;
