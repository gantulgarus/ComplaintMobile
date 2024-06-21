import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from "react-native";

const ItemSelectionScreen = ({ navigation, route }) => {
  const { data, onValueChange } = route.params;

  const handleItemPress = (item) => {
    onValueChange(item.value, item.label);

    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <ScrollView>
        {data.map((item, index) => (
          <TouchableOpacity
            key={index}
            style={styles.item}
            onPress={() => handleItemPress(item)}>
            <Text style={styles.itemText}>{item.label}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    padding: 20,
  },
  item: {
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#EAEAEA",
  },
  itemText: {
    fontSize: 16,
    color: "#333333",
  },
});

export default ItemSelectionScreen;
