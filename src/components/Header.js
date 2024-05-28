import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";

const Header = ({ title, onPress }) => {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <View style={{ flexDirection: "row", alignItems: "center" }}>
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
            marginLeft: 12,
            fontSize: 17,
            fontWeight: "bold",
          }}>
          {title}
        </Text>
        {/* <TouchableOpacity
          onPress={onPress}
          style={styles.iconContainer}></TouchableOpacity> */}
      </View>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 20,
    marginHorizontal: 15,
  },
  iconContainer: {
    height: 45,
    width: 45,
    borderRadius: 999,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#e5e7eb",
  },
  icon: {
    height: 24,
    width: 24,
    tintColor: "black",
  },
});
