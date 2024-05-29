import { View, Text } from "react-native";
import React from "react";
import { mainColor, formTextColor } from "../../Constants";
import FeatherIcon from "react-native-vector-icons/Feather";
import { Picker } from "@react-native-picker/picker";

const FormPicker = (props) => {
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
        <Picker
          selectedValue={props.value}
          onValueChange={props.onValueChange}
          style={{ flex: 1 }}
          itemStyle={{ color: formTextColor, fontSize: 16 }}>
          {props.data.map((category, index) => (
            <Picker.Item
              key={index}
              label={category}
              value={props.values[index]}
            />
          ))}
        </Picker>
      </View>
    </View>
  );
};

export default FormPicker;
