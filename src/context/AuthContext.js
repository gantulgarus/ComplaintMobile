import React, { createContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const AuthContext = createContext();

export const AuthProvider = (props) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const loadUserData = async () => {
      try {
        const userData = await AsyncStorage.getItem("user");
        if (userData) {
          setUser(JSON.parse(userData));
          setIsLoggedIn(true);
        }
      } catch (error) {
        console.error("Failed to load user data:", error);
      }
    };

    loadUserData();
  }, []);

  const login = async (userData) => {
    setIsLoggedIn(true);
    // console.log("userLoginData: ", userData);
    try {
      await AsyncStorage.setItem("user", JSON.stringify(userData));
      // setUser(userData);
      setIsLoggedIn(true);
    } catch (error) {
      console.error("Failed to save user data:", error);
    }
  };

  const logout = async () => {
    try {
      await AsyncStorage.removeItem("user");
      setUser(null);
      setIsLoggedIn(false);
    } catch (error) {
      console.error("Failed to save user data:", error);
    }
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, login, logout, user, setUser }}>
      {props.children}
    </AuthContext.Provider>
  );
};
