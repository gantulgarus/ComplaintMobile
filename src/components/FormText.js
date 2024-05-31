import { View, Text, StyleSheet, TextInput, Platform } from "react-native";
import React from "react";
import { mainColor, formTextColor } from "../../Constants";
import FeatherIcon from "react-native-vector-icons/Feather";

const FormText = (props) => {
  return (
    <View>
      <Text style={{ fontSize: 16, paddingTop: 15, color: formTextColor }}>
        {props.label}
      </Text>
      <View
        style={{
          flexDirection: "row",
          marginTop: 10,
          paddingVertical: 5,
          paddingHorizontal: 10,
          borderRadius: 10,
          backgroundColor: "#EAF0F1",
        }}>
        <FeatherIcon name={props.icon} size={20} color={formTextColor} />
        <TextInput
          {...props}
          style={{
            flex: 1,
            paddingLeft: 3,
            color: formTextColor,
            marginTop: Platform.OS === "ios" ? 0 : -3,
            ...props.style,
          }}
        />
      </View>
      {props.errorShow && (
        <Text style={{ color: "#E83350", fontSize: 12, marginTop: 5 }}>
          {props.errorText}
        </Text>
      )}
    </View>
  );
};

export default FormText;
