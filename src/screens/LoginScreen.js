import React, { useState, useContext } from "react";
import {
  View,
  Text,
  ImageBackground,
  Image,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import WebViewModal from "../components/WebViewModal";

const Login = () => {
  const [modalVisible, setModalVisible] = useState(false);

  const openModal = () => {
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
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
          <Text style={styles.buttonText}>Нэвтрэх</Text>
        </TouchableOpacity>
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
