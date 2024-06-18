import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";

const Header = ({ title }) => {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => navigation.toggleDrawer()}
        style={styles.iconContainer}>
        <Image
          resizeMode="contain"
          style={styles.icon}
          source={require("../../assets/images/menu.png")}
        />
      </TouchableOpacity>
      <Text
        style={{
          flex: 1, // Take up remaining space
          textAlign: "center", // Center text horizontally
          marginLeft: 12,
          fontSize: 17,
          fontWeight: "bold",
        }}>
        {title}
      </Text>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginVertical: 20,
    marginHorizontal: 15,
    backgroundColor: "#fff",
  },
  iconContainer: {
    height: 45,
    width: 45,
    borderRadius: 999,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#EAF0F1",
  },
  icon: {
    height: 24,
    width: 24,
    tintColor: "black",
  },
});
