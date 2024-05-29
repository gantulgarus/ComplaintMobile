import { View, Text, StyleSheet, TextInput, Platform } from "react-native";
import React from "react";
import { mainColor, formTextColor } from "../../Constants";
import FeatherIcon from "react-native-vector-icons/Feather";

const FormText = (props) => {
  return (
    <View>
      <Text style={{ fontSize: 16, paddingTop: 35, color: formTextColor }}>
        {props.label}
      </Text>
      <View
        style={{
          flexDirection: "row",
          marginTop: 10,
          borderBottomColor: "#f2f2f2",
          borderBottomWidth: 1,
          paddingBottom: 5,
        }}>
        <FeatherIcon name={props.icon} size={20} color={formTextColor} />
        <TextInput
          {...props}
          style={{
            flex: 1,
            paddingLeft: 10,
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
