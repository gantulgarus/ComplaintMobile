import React, { useContext } from "react";
import { Text, View, Image } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import MaterialIcon from "react-native-vector-icons/MaterialCommunityIcons";

import {
  DrawerItemList,
  createDrawerNavigator,
} from "@react-navigation/drawer";

import { AuthContext } from "../context/AuthContext";
import TabNavigator from "./TabNavigator";
import ContactScreen from "../screens/ContactScreen";
import { SafeAreaView } from "react-native-safe-area-context";

const Drawer = createDrawerNavigator();

const DrawerNavigator = () => {
  const { user } = useContext(AuthContext);
  return (
    <Drawer.Navigator
      initialRouteName="Drawer Home"
      drawerContent={(props) => {
        return (
          <SafeAreaView>
            <View
              style={{
                height: 200,
                width: "100%",
                justifyContent: "center",
                alignItems: "center",
              }}>
              <Image
                source={{ uri: "data:image/png;base64," + user?.image }}
                style={{
                  height: 100,
                  width: 100,
                  borderRadius: 50,
                  marginBottom: 10,
                }}
              />
              <Text
                style={{
                  fontSize: 18,
                  fontWeight: "bold",
                  marginBottom: 6,
                }}>
                {user?.firstname}
              </Text>
              <Text
                style={{
                  fontSize: 16,
                }}>
                Web Developer
              </Text>
            </View>
            <DrawerItemList {...props} />
          </SafeAreaView>
        );
      }}
      screenOptions={{
        drawerStyle: {
          backgroundColor: "#fff",
          // width: 250,
        },
        headerStyle: {
          backgroundColor: "#fff",
        },
        drawerActiveBackgroundColor: "#e0e7ff",
        drawerActiveTintColor: "red",
        // headerShown: false,
        drawerLabelStyle: {
          color: "#000",
          fontSize: 14,
          marginLeft: -20,
        },
      }}>
      <Drawer.Screen
        name="Drawer Home"
        component={TabNavigator}
        options={{
          headerTitle: "",
          drawerLabel: "Нүүр",
          title: "Нүүр",
          headerShadowVisible: false,
          drawerIcon: () => (
            <Icon name="home-outline" size={24} color="#3730a3" />
          ),
        }}
      />
      <Drawer.Screen
        name="Холбоо барих"
        component={ContactScreen}
        options={{
          drawerLabel: "Холбоо барих",
          title: "Холбоо барих",
          headerShadowVisible: false,
          drawerIcon: () => (
            <MaterialIcon name="contacts" size={24} color="#3730a3" />
          ),
        }}
      />
      <Drawer.Screen
        name="Гарах"
        component={Text}
        listeners={() => state.logout()}
        options={{
          drawerLabel: "Гарах",
          title: "Гарах",
          headerShadowVisible: false,
          drawerIcon: () => (
            <MaterialIcon name="logout" size={24} color="#3730a3" />
          ),
        }}
      />
    </Drawer.Navigator>
  );
};

export default DrawerNavigator;
