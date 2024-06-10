import React, { useState, useEffect, useContext } from "react";
import { StyleSheet, Text, View } from "react-native";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";
import { mainUrl } from "../../Constants";

const useComplaint = () => {
  const { user, token } = useContext(AuthContext);
  const [complaints, setComplaints] = useState([]);
  const [errorMessage, setErrorMessage] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchComplaints = () => {
    axios
      .get(`${mainUrl}/api/complaintsByUser/${user.danRegnum}`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        setComplaints(response.data.data);
        setLoading(false);
        console.log("complaint fetched successfully..");
      })
      .catch((err) => {
        setErrorMessage("Error fetching complaints");
        setLoading(false);
        let message = err.message;
        if (message === "Request failed with status code 404")
          message = "Уучлаарай сервер энэ өгөгдөл байхгүй байна...";
        else if (message === "Network Error")
          message = "Интернет холболтоо шалгана уу...";
        setErrorMessage(message);
      });
  };

  const addComplaint = (newComplaint) => {
    axios
      .post(`${mainUrl}/api/complaints`, newComplaint, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      })
      .then(() => {
        // Fetch updated complaints after adding a new complaint
        console.log("complaint created successfully..");
        fetchComplaints();
      })
      .catch((error) => {
        setErrorMessage("Error adding complaint");
      });
  };

  useEffect(() => {
    fetchComplaints();
  }, []);

  return [complaints, errorMessage, loading, addComplaint];
};

export default useComplaint;
