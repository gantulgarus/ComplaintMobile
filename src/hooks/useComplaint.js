import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";
import { mainUrl } from "../../Constants";

const useComplaint = (refresh, setRefresh) => {
  const { user, token } = useContext(AuthContext);
  const [complaints, setComplaints] = useState([]);
  const [errorMessage, setErrorMessage] = useState(null);
  const [loading, setLoading] = useState(true);

  console.log("refresh: ", refresh);

  useEffect(() => {
    axios
      .get(`${mainUrl}/api/complaintsByUser/${user.danRegnum}`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        console.log("complaint fetched successfully..");
        setComplaints(response.data.data);
        setLoading(false);
        setRefresh(false);
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
  }, [refresh]);

  return [complaints, errorMessage, loading];
};

export default useComplaint;
