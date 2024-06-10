import React, { useState, useEffect, useContext } from "react";
import { StyleSheet, Text, View } from "react-native";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";
import { mainUrl } from "../../Constants";

const useComplaintTypeSummary = () => {
  const { token } = useContext(AuthContext);
  const [complaintTypeSummary, setComplaintTypeSummary] = useState([]);
  const [errorMessage, setErrorMessage] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    axios
      .get(`${mainUrl}/api/complaintTypeSummaries`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      })
      .then((result) => {
        setComplaintTypeSummary(result.data);
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
  return [complaintTypeSummary, errorMessage, loading];
};

export default useComplaintTypeSummary;

const styles = StyleSheet.create({});
