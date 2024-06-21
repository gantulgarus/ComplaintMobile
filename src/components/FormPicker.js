import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import FeatherIcon from "react-native-vector-icons/Feather";
import { formTextColor } from "../../Constants";

const FormPicker = (props) => {
  const navigation = useNavigation();
  const [selectedLabel, setSelectedLabel] = useState("Сонгох");

  const handleItemPress = () => {
    navigation.navigate("ItemSelectionScreen", {
      data: props.data.map((label, index) => ({
        label,
        value: props.values[index],
      })),
      onValueChange: (newValue, newLabel) => {
        props.onValueChange(newValue); // Update the selected value in the parent component
        setSelectedLabel(newLabel);
      },
    });
  };

  return (
    <View>
      <Text style={{ fontSize: 16, paddingTop: 15, color: formTextColor }}>
        {props.label}
      </Text>
      <TouchableOpacity onPress={handleItemPress} style={styles.touchable}>
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
