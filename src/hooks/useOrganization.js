import React, { useState, useEffect, useContext } from "react";
import { StyleSheet, Text, View } from "react-native";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";
import { mainUrl } from "../../Constants";

const useOrganization = () => {
  const { token } = useContext(AuthContext);
  const [organization, setOrganization] = useState([]);
  const [errorMessage, setErrorMessage] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    axios
      .get(`${mainUrl}/api/organizations`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      })
      .then((result) => {
        setOrganization(result.data);
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
        let message = err.message;
        if (message === "Request failed with status code 404")
          message = "Уучлаарай сервер энэ өгөгдөл байхгүй байна...";
        else if (message === "Network Error")
          message = "Интернет холболтоо шалгана уу...";
        setErrorMessage(message);
      });
  }, []);
  return [organization, errorMessage, loading];
};

export default useOrganization;

const styles = StyleSheet.create({});
