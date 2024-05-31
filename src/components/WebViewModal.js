// WebViewModal.js
import React, { useState, useEffect, useContext } from "react";
import { isEmpty } from "lodash";
import axios from "axios";
import qs from "qs";
import {
  View,
  Modal,
  Button,
  StyleSheet,
  TouchableWithoutFeedback,
} from "react-native";
import { WebView } from "react-native-webview";
import { AuthContext } from "../context/AuthContext";
import { generateRandomString } from "../utils/Helper";

const objectToUrl = (obj) => {
  return qs.stringify(obj);
};

const WebViewModal = ({ visible, onClose }) => {
  const { setUser, login } = useContext(AuthContext);
  const [randomString, setRandomString] = useState("");
  const [uri, setUri] = useState("");

  useEffect(() => {
    if (visible) {
      handleGenerateString();
    }
  }, [visible]);

  const handleGenerateString = () => {
    const newString = generateRandomString(40);
    setRandomString(newString);
    setUri(
      `https://sso.gov.mn/login?next=%2Foauth2%2Fauthorize%3Fclient_id%3D126fd50e9623fb78609b4bf0-408fe89c0088f404ea3c8f76add3f081%26redirect_uri%3Dhttps%253A%252F%252Fconsumer.energy.mn%252Fauth%252Fcallback%26scope%3DW3sic2VydmljZXMiOiBbIldTMTAwMTAxX2dldENpdGl6ZW5JRENhcmRJbmZvIl0sICJ3c2RsIjogImh0dHBzOi8veHlwLmdvdi5tbi9jaXRpemVuLTEuMy4wL3dzP1dTREwifV0%253D%26response_type%3Dcode%26state=${newString}`
    );
  };
  //   console.log(uri);

  const getUserDataEmongolia = async (code) => {
    const obj = {
      grant_type: "authorization_code",
      code: code[1],
      client_id: "126fd50e9623fb78609b4bf0-408fe89c0088f404ea3c8f76add3f081",
      client_secret:
        "ZjUzMDJjY2M2YTk1YmI1ZjI1MDBmMmUyY2U0OWRkZTMyNDFjODNmMDI1YjVlNzhjNzc3Njg5MWVhMDBlZDg2ZmJiZGY0ZTA4MjlmMDIwZjM4NGYzZmQxNTMwNDBiMDk4ODkyMGExOTIwNzMxYjVkMDgxYmQxM2QwOGRhZGEwZDE=",
      redirect_uri: "https://consumer.energy.mn/auth/callback",
    };

    try {
      const tokenResponse = await axios.post(
        "https://sso.gov.mn/oauth2/token",
        objectToUrl(obj),
        {
          headers: { "Content-Type": "application/x-www-form-urlencoded" },
          timeout: 30000,
        }
      );

      const token = tokenResponse.data;

      const headers = { Authorization: "Bearer " + token.access_token };

      const dataResponse = await axios.get(
        "https://sso.gov.mn/oauth2/api/v1/service",
        {
          headers,
          timeout: 30000,
        }
      );
      // console.log("ResData==", dataResponse.data);
      if (dataResponse.data) {
        const res =
          dataResponse.data[1]?.services?.WS100101_getCitizenIDCardInfo
            ?.response;
        // console.log("converted=", res);

        setUser(res);
        login(res);
        onClose(); // Close the modal after successful login
      }
    } catch (error) {
      console.error("Error:", error);
      onClose(); // Close the modal in case of an error
    }
  };

  return (
    <Modal
      visible={visible}
      transparent={true}
      animationType="slide"
      onRequestClose={onClose}>
      <TouchableWithoutFeedback onPress={onClose}>
        <View style={styles.modalOverlay}>
          <TouchableWithoutFeedback>
            <View style={styles.modalContent}>
              <WebView
                source={{
                  uri: uri,
                }}
                startInLoadingState={true}
                javaScriptEnabled={true}
                domStorageEnabled={true}
                onNavigationStateChange={(state) => {
                  if (
                    state.url.indexOf(
                      "https://consumer.energy.mn/auth/callback"
                    ) === 0
                  ) {
                    var code = /\?code=(.+)&expires/.exec(state.url);

                    if (!isEmpty(code) && !isEmpty(code[0])) {
                      getUserDataEmongolia(code);
                      onClose();
                    }
                  }
                }}
              />
            </View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    width: "90%",
    height: "80%",
    backgroundColor: "white",
    borderRadius: 10,
    overflow: "hidden",
  },
});

export default WebViewModal;