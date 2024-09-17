import React, { createContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { mainUrl } from "../../Constants";

export const AuthContext = createContext();

export const AuthProvider = (props) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const [danuser, setDanuser] = useState(null);
  const [token, setToken] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false); // Add loading state

  console.log("danuser====", danuser?.firstname);
  const login = (userdata) => {
    setLoading(true); // Set loading to true when login starts

    axios
      .post(`${mainUrl}/api/login`, userdata)
      .then((result) => {
        console.log("Login to rest api success");
        loginUserSuccessful(result.data.access_token, result.data.user);
        setIsLoggedIn(true);
      })
      .catch((err) => {
        setIsLoggedIn(false);
        setError(err);
        console.error("Failed to login:", err);
      })
      .finally(() => {
        setLoading(false); // Set loading to false when login completes
      });
  };

  // useEffect(() => {
  //   if (danuser) {
  //     login();
  //   }
  // }, [danuser]); // Run the effect when danuser changes

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
    setDanuser(null);
    console.log("User logout...");
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
        setDanuser,
        setIsLoggedIn,
        setToken,
      }}>
      {props.children}
    </AuthContext.Provider>
  );
};
