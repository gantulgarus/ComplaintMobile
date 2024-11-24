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
  KeyboardAvoidingView,
  Platform,
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

  // Email Validation
  const validateEmail = (email) => {
    const regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return regex.test(email);
  };

  // Password Validation
  const validatePassword = (password) => {
    return password.length >= 6; // Ensure password is at least 6 characters
  };

  const handleLogin = async () => {
    // Check if the email or password is empty
    if (!email) {
      Alert.alert("Алдаа", "Мэйл хаягаа оруулна уу.");
      return;
    }
    if (!password) {
      Alert.alert("Алдаа", "Нууц үгээ оруулна уу.");
      return;
    }
    // Validation checks
    if (!email || !validateEmail(email)) {
      Alert.alert("Алдаа", "Мэйл хаяг буруу байна.");
      return;
    }
    // if (!password || !validatePassword(password)) {
    //   Alert.alert("Алдаа", "Нууц үг хамгийн багадаа 6 тэмдэгт байх ёстой.");
    //   return;
    // }

    setLoading(true);
    try {
      const response = await axios.post(
        "https://consumer.energy.mn/api/loginEmail",
        {
          email,
          password,
        }
      );

      if (response.data.token) {
        setToken(response.data.token);
        setUser(response.data.user);
        setIsLoggedIn(true);
      } else {
        Alert.alert(
          "Амжилтгүй",
          response.data.error || "Мэйл хаяг эсвэл нууц үг буруу байна."
        );
      }
    } catch (error) {
      if (error.response) {
        Alert.alert("Амжилтгүй", error.response.data.error);
      } else if (error.request) {
        Alert.alert("Амжилтгүй", "Сервертэй холбогдох боломжгүй байна.");
      } else {
        Alert.alert("Амжилтгүй", "Алдаа гарлаа: " + error.message);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}>
      <View style={styles.container}>
        <ImageBackground
          source={require("../../assets/images/background.png")}
          resizeMode="cover"
          style={styles.image}>
          <View style={styles.centeredContent}>
            <Image
              source={require("../../assets/images/hero.png")}
              style={styles.hero}
              resizeMode="contain"
            />
            <Image
              source={require("../../assets/images/logo_white.png")}
              style={styles.logo}
              resizeMode="contain"
            />
          </View>
          <View style={styles.loginForm}>
            <Text style={styles.title}>Өргөдөл, гомдлын цахим систем</Text>
            <TextInput
              style={styles.input}
              placeholder="Мэйл хаяг"
              placeholderTextColor="#ccc"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
            />
            <TextInput
              style={styles.input}
              placeholder="Нууц үг"
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
                {loading ? "Уншиж байна..." : "Нэвтрэх"}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.secondaryButton}
              onPress={openModal}>
              <Text style={styles.secondaryButtonText}>ДАН Нэвтрэх</Text>
            </TouchableOpacity>
          </View>
        </ImageBackground>
        <WebViewModal visible={modalVisible} onClose={closeModal} />
      </View>
    </KeyboardAvoidingView>
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
    flex: 3,
    justifyContent: "space-evenly",
    alignItems: "center",
  },
  hero: {
    height: 250,
    marginTop: 50,
  },
  logo: {
    height: 60,
    marginBottom: 50,
  },
  loginForm: {
    flex: 2,
    justifyContent: "space-between",
    backgroundColor: "white",
    paddingHorizontal: 16,
    paddingVertical: 20,
  },
  title: {
    color: "#3730a3",
    fontWeight: "bold",
    fontSize: 22,
    textAlign: "center",
    marginBottom: 5,
  },
  input: {
    backgroundColor: "#eee",
    borderRadius: 10,
    paddingHorizontal: 15,
    paddingVertical: 15,
    marginBottom: 5,
    fontSize: 16,
  },
  button: {
    backgroundColor: "#3730a3",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    marginBottom: 5,
  },
  buttonText: {
    color: "#fff",
    fontSize: 20,
  },
  secondaryButton: {
    backgroundColor: "#4ade80",
    padding: 10,
    marginBottom: 10,
    borderRadius: 10,
    alignItems: "center",
  },
  secondaryButtonText: {
    color: "#fff",
    fontSize: 20,
  },
});

export default Login;
