import React, { useState, useContext } from "react";
import {
  View,
  Text,
  ImageBackground,
  Image,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Alert,
} from "react-native";
import WebViewModal from "../components/WebViewModal";
import axios from "axios";
import { mainUrl } from "../../Constants";
import { AuthContext } from "../context/AuthContext";

const Login = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const { setToken, setUser, setIsLoggedIn } = useContext(AuthContext);

  const openModal = () => {
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  const handleLogin = async () => {
    setLoading(true);
    try {
      const response = await axios.post(`${mainUrl}/api/loginEmail`, {
        email,
        password,
      });

      if (response.data.token) {
        console.log(response.data);
        setToken(response.data.token);
        setUser(response.data.user);
        setIsLoggedIn(true);
        // Alert.alert("Login Successful", "You are now logged in.");
      } else {
        // Alert.alert("Login Failed", "Invalid email or password.");
        Alert.alert(
          "Амжилтгүй",
          response.data.error || "Мэйл хаяг эсвэл нууц үг буруу байна."
        );
      }
    } catch (error) {
      console.log(error);
      Alert.alert(
        "Амжилтгүй",
        error.response?.data?.error || "Алдаа гарлаа. Дахин оролдно уу."
      );
    } finally {
      setLoading(false);
    }
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
          <Text style={styles.desc}>
            Эрчим хүч хэрэглэгч иргэн, аж ахуйн нэгжээс эрчим хүчний зохицуулах
            хороо болон цахилгаан дулаан түгээх, хангах тусгай зөвшөөрөл
            эзэмшигчид санал, хүсэлт, өргөдөл, гомдол гаргах
          </Text>
        </View>
        <View style={styles.loginForm}>
          <Text style={styles.title}>Өргөдөл, гомдлын цахим систем</Text>
          <TextInput
            style={styles.input}
            placeholder="Email"
            placeholderTextColor="#ccc"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
          />
          <TextInput
            style={styles.input}
            placeholder="Password"
            placeholderTextColor="#ccc"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
          />
          <TouchableOpacity
            style={styles.button}
            onPress={handleLogin}
            disabled={loading}>
            <Text style={styles.buttonText}>
              {loading ? "Logging in..." : "Нэвтрэх"}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.secondaryButton} onPress={openModal}>
            <Text style={styles.secondaryButtonText}>ДАН Нэвтрэх</Text>
          </TouchableOpacity>
        </View>
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
  centeredContent: {
    flex: 2,
    justifyContent: "flex-end",
    alignItems: "center",
  },
  logo: {
    height: 80,
    marginBottom: 10,
  },
  desc: {
    color: "white",
    fontSize: 12,
    marginHorizontal: 20,
    marginBottom: 50,
    textAlign: "center",
  },
  loginForm: {
    flex: 1,
    justifyContent: "flex-end",
    backgroundColor: "white",
    paddingHorizontal: 16,
    paddingVertical: 20,
  },
  title: {
    color: "#3730a3",
    fontWeight: "bold",
    fontSize: 28,
    textAlign: "center",
    marginBottom: 10,
  },
  input: {
    backgroundColor: "#eee",
    borderRadius: 10,
    paddingHorizontal: 15,
    paddingVertical: 10,
    marginBottom: 15,
    fontSize: 16,
  },
  button: {
    backgroundColor: "#3730a3",
    padding: 10,
    borderRadius: 10,
    alignItems: "center",
    marginBottom: 15,
  },
  buttonText: {
    color: "#fff",
    fontSize: 20,
  },
  secondaryButton: {
    backgroundColor: "#4ade80",
    padding: 10,
    borderRadius: 10,
    alignItems: "center",
  },
  secondaryButtonText: {
    color: "#fff",
    fontSize: 20,
  },
});

export default Login;
