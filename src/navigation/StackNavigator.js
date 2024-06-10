import React, { useContext } from "react";
import { View, ActivityIndicator, StyleSheet } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { AuthContext } from "../context/AuthContext";

import DrawerNavigator from "./DrawerNavigator";
import LoginScreen from "../screens/LoginScreen";
import ComplaintDetailScreen from "../screens/ComplaintDetailScreen";
import { useInactivityTimer } from "../utils/useInactivityTimer";
import CustomHeader from "../components/CustomHeader";

const Stack = createNativeStackNavigator();

const StackNavigator = () => {
  const { isLoggedIn, loading, user, logout } = useContext(AuthContext);
  console.log("isLoggedIn: ", isLoggedIn);
  console.log("user: ", user?.danFirstname);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  // Use the inactivity timer
  // useInactivityTimer(state.logout, 3600000); // 300000 ms = 5 minutes

  return (
    <Stack.Navigator>
      {isLoggedIn ? (
        <>
          <Stack.Screen
            name="Нүүр"
            component={DrawerNavigator}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="ComplaintDetail"
            component={ComplaintDetailScreen}
            options={{ title: "Дэлгэрэнгүй" }}
            // options={{ header: () => <CustomHeader title="Дэлгэрэнгүй" /> }}
          />
        </>
      ) : (
        <Stack.Screen
          name="Нэвтрэх"
          component={LoginScreen}
          options={{ headerShown: false }}
        />
      )}
    </Stack.Navigator>
  );
};

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default StackNavigator;
