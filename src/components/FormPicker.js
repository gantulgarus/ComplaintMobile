import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import FeatherIcon from "react-native-vector-icons/Feather";
import { formTextColor } from "../../Constants";

const FormPicker = (props) => {
  // console.log(props);
  const [selectedLabel, setSelectedLabel] = useState("Сонгох");

  const handlePress = () => {
    props.openBottomSheet(props.data, (value, label) => {
      props.onValueChange(value);
      setSelectedLabel(label);
      // console.log(label);
    });
  };

  return (
    <View>
      <Text style={{ fontSize: 16, paddingTop: 15, color: formTextColor }}>
        {props.label}
      </Text>
      <TouchableOpacity onPress={handlePress} style={styles.touchable}>
        <FeatherIcon name={props.icon} size={20} color={formTextColor} />
        <Text style={styles.touchableText}>{selectedLabel}</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  touchable: {
    flexDirection: "row",
    marginTop: 10,
    alignItems: "center",
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 10,
    backgroundColor: "#EAF0F1",
  },
  touchableText: {
    marginLeft: 10,
    color: formTextColor,
    flex: 1,
    fontSize: 16,
  },
});

export default FormPicker;
