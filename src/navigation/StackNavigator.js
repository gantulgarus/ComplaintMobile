import React, { useContext } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { AuthContext } from "../context/AuthContext";

import DrawerNavigator from "./DrawerNavigator";
import LoginScreen from "../screens/LoginScreen";
import ComplaintDetailScreen from "../screens/ComplaintDetailScreen";
import { useInactivityTimer } from "../utils/useInactivityTimer";

const Stack = createNativeStackNavigator();

const StackNavigator = () => {
  const state = useContext(AuthContext);
  console.log("isLoggedIn: ", state.isLoggedIn);
  console.log("user: ", state.user?.firstname);

  // Use the inactivity timer
  // useInactivityTimer(state.logout, 3600000); // 300000 ms = 5 minutes

  return (
    <Stack.Navigator>
      {state.isLoggedIn ? (
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

export default StackNavigator;
