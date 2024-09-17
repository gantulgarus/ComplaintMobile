import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";

const Header = ({ title, onPress, user }) => {
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
      </View>
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <Text
          style={{
            marginRight: 12,
            fontSize: 14,
            fontWeight: "bold",
          }}>
          Сайн байна уу, {user?.name}
        </Text>
        <Image
          resizeMode="cover"
          style={{
            width: 45,
            height: 45,
            borderRadius: 60,
          }}
          source={
            user?.danImage
              ? { uri: "data:image/png;base64," + user?.danImage }
              : require("../../assets/images/user.png") // Default image
          }
        />
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
