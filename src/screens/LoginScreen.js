import React, { useState, useEffect, useContext } from "react";
import {
  View,
  Text,
  Button,
  ImageBackground,
  Image,
  StyleSheet,
  TouchableOpacity,
  Linking,
} from "react-native";
import { AuthContext } from "../context/AuthContext";
import WebViewModal from "../components/WebViewModal";

const config = {
  clientId: "126fd50e9623fb78609b4bf0-408fe89c0088f404ea3c8f76add3f081",
  clientSecret:
    "ZjUzMDJjY2M2YTk1YmI1ZjI1MDBmMmUyY2U0OWRkZTMyNDFjODNmMDI1YjVlNzhjNzc3Njg5MWVhMDBlZDg2ZmJiZGY0ZTA4MjlmMDIwZjM4NGYzZmQxNTMwNDBiMDk4ODkyMGExOTIwNzMxYjVkMDgxYmQxM2QwOGRhZGEwZDE=", // Optional if using a public client
  redirectUri: "https://consumer.energy.mn/auth/callback", // Your app's redirect URI
  authorizationEndpoint: "https://sso.gov.mn/oauth2/authorize",
  tokenEndpoint: "https://sso.gov.mn/oauth2/token",
  scopes: [
    "W3sic2VydmljZXMiOiBbIldTMTAwMTAxX2dldENpdGl6ZW5JRENhcmRJbmZvIl0sICJ3c2RsIjogImh0dHBzOi8veHlwLmdvdi5tbi9jaXRpemVuLTEuMy4wL3dzP1dTREwifV0=",
  ], // Scopes your app needs
};

const generateAuthUrl = () => {
  const params = new URLSearchParams({
    client_id: config.clientId,
    redirect_uri: config.redirectUri,
    response_type: "code",
    scope: config.scopes,
    state: "",
  });
  return `${config.authorizationEndpoint}?${params.toString()}`;
};

const Login = () => {
  const { login } = useContext(AuthContext);
  const [modalVisible, setModalVisible] = useState(false);

  const openModal = () => {
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  const handleLoginOrg = () => {
    login();
  };

  const [authState, setAuthState] = useState(null);

  const handleLogin = () => {
    Linking.openURL(generateAuthUrl());
  };

  return (
    <View style={styles.container}>
      <ImageBackground
        source={require("../../assets/images/background.png")}
        resizeMode="cover"
        style={styles.image}>
        <View style={styles.centeredContent}>
          <Image
            source={require("../../assets/images/logo_white.png")}
            style={styles.logo}
            resizeMode="contain"
          />
          <Text style={styles.text}>
            Эрчим хүч хэрэглэгч иргэн, аж ахуйн нэгжээс эрчим хүчний зохицуулах
            хороо болон цахилгаан дулаан түгээх, хангах тусгай зөвшөөрөл
            эзэмшигчид санал, хүсэлт, өргөдөл, гомдол гаргах
          </Text>
        </View>
        <Text style={styles.title}>Өргөдөл, гомдлын цахим систем</Text>
        <TouchableOpacity style={styles.button} onPress={openModal}>
          <Text style={styles.buttonText}>Иргэн</Text>
        </TouchableOpacity>
        {/* <TouchableOpacity style={styles.button} onPress={openModal}>
          <Text style={styles.buttonText}>Байгууллага</Text>
        </TouchableOpacity> */}
      </ImageBackground>
      <WebViewModal visible={modalVisible} onClose={closeModal} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    flex: 1,
    justifyContent: "space-between",
  },
  logo: {
    height: 80,
    marginTop: 320,
  },
  centeredContent: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    color: "white",
    fontSize: 12,
    // lineHeight: 84,
    marginHorizontal: 60,
    marginBottom: 20,
    textAlign: "center",
  },
  title: {
    color: "#3730a3",
    fontWeight: "bold",
    fontSize: 34,
    textAlign: "center",
    marginBottom: 50,
  },
  button: {
    backgroundColor: "#3730a3",
    padding: 10,
    borderRadius: 10,
    alignItems: "center",
    marginHorizontal: 16,
    marginBottom: 100,
  },
  buttonText: {
    color: "#fff",
    fontSize: 20,
    marginVertical: 10,
  },
});

export default Login;
