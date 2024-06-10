import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, Modal, StyleSheet } from "react-native";
import { mainColor, formTextColor } from "../../Constants";
import FeatherIcon from "react-native-vector-icons/Feather";
import { Picker } from "@react-native-picker/picker";

const FormPicker = (props) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedLabel, setSelectedLabel] = useState("Сонгох");

  // console.log("props.submit ", props.isSubmitted);
  // console.log("props.value ", props.value);

  // useEffect(() => {
  //   if (props.isSubmitted) {
  //     setSelectedLabel("Сонгох");
  //   }
  // }, [props.isSubmitted]);
  useEffect(() => {
    if (props.reset) {
      setSelectedLabel("Сонгох");
    }
  }, [props.reset]);

  const handleValueChange = (itemValue, itemIndex) => {
    setModalVisible(false);
    setSelectedLabel(props.data[itemIndex]);
    props.onValueChange(itemValue);
  };

  return (
    <View>
      <Text style={{ fontSize: 16, paddingTop: 15, color: formTextColor }}>
        {props.label}
      </Text>
      <TouchableOpacity
        onPress={() => setModalVisible(true)}
        style={{
          flexDirection: "row",
          marginTop: 10,
          alignItems: "center",
          paddingVertical: 5,
          paddingHorizontal: 10,
          borderRadius: 10,
          backgroundColor: "#EAF0F1",
        }}>
        <FeatherIcon name={props.icon} size={20} color={formTextColor} />
        <Text
          style={{
            marginLeft: 3,
            padding: 5,
            color: formTextColor,
            // fontSize: 16,
            flex: 1,
          }}>
          {selectedLabel}
        </Text>
      </TouchableOpacity>

      <Modal
        transparent={true}
        animationType="slide"
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Picker
              selectedValue={props.value}
              onValueChange={handleValueChange}
              style={{ width: "100%" }}
              itemStyle={{ color: formTextColor, fontSize: 16 }}>
              {props.data.map((category, index) => (
                <Picker.Item
                  key={index}
                  label={category}
                  value={props.values[index]}
                />
              ))}
            </Picker>
            <TouchableOpacity
              onPress={() => setModalVisible(false)}
              style={styles.closeButton}>
              <Text style={{ color: mainColor }}>Хаах</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    width: "80%",
    backgroundColor: "white",
    borderRadius: 10,
    padding: 20,
    alignItems: "center",
  },
  closeButton: {
    marginTop: 20,
  },
});

export default FormPicker;
