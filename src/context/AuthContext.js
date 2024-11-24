import React, { createContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { mainUrl } from "../../Constants";

export const AuthContext = createContext();

export const AuthProvider = (props) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false); // Add loading state

  const login = async (userdata) => {
    setLoading(true);

    try {
      const result = await axios.post(`${mainUrl}/api/login`, userdata);
      console.log("Login to rest api success");
      loginUserSuccessful(result.data.access_token, result.data.user);
      setIsLoggedIn(true);
    } catch (err) {
      setIsLoggedIn(false);
      setError(err);
      console.error("Failed to login:", err);
    } finally {
      setLoading(false);
    }
  };

  const loginUserSuccessful = async (token, user) => {
    setToken(token);
    setUser(user);
    setIsLoggedIn(true);
    try {
      await AsyncStorage.setItem("userData", JSON.stringify({ token, user }));
    } catch (error) {
      console.error("Утасруу дата хадгалж чадсангүй...", error);
    }
  };

  const logout = async () => {
    await AsyncStorage.removeItem("userData");
    setIsLoggedIn(false);
    setToken(null);
    setUser(null);
    console.log("User logout...");
  };

  // Update user function
  const updateUser = (updatedUser) => {
    setUser((prevUser) => ({
      ...prevUser,
      ...updatedUser,
    }));
  };

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn,
        login,
        logout,
        user,
        setUser,
        token,
        error,
        loading,
        setLoading,
        setIsLoggedIn,
        setToken,
        updateUser,
      }}>
      {props.children}
    </AuthContext.Provider>
  );
};
