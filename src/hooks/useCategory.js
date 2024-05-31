import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import axios from "axios";

const useCategory = () => {
  const [categories, setCategories] = useState([]);
  const [errorMessage, setErrorMessage] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    axios
      .get("http://192.168.0.82:8000/api/categories")
      .then((result) => {
        setCategories(result.data);
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
  return [categories, errorMessage, loading];
};

export default useCategory;

const styles = StyleSheet.create({});
