import React, { useState, useContext } from "react";
import {
  View,
  TextInput,
  Button,
  Alert,
  StyleSheet,
  Text,
  TouchableOpacity,
  ScrollView, // Import ScrollView
} from "react-native";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";
import { mainUrl } from "../../Constants";

export default function EditProfileScreen() {
  const { user, token, updateUser } = useContext(AuthContext);
  const [form, setForm] = useState({
    danAimagCityName: user?.danAimagCityName || "",
    danSoumDistrictName: user?.danSoumDistrictName || "",
    danBagKhorooName: user?.danBagKhorooName || "",
    danPassportAddress: user?.danPassportAddress || "",
    phone: user?.phone || "",
    email: user?.email || "",
    password: "",
  });

  // Error state to track validation messages
  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};

    // Check if the fields are filled
    if (!form.danAimagCityName) {
      newErrors.danAimagCityName = "УБ/Орон нутаг талбар заавал бөглөнө үү.";
    }
    if (!form.danSoumDistrictName) {
      newErrors.danSoumDistrictName = "Сум/Дүүрэг талбар заавал бөглөнө үү.";
    }
    if (!form.danBagKhorooName) {
      newErrors.danBagKhorooName = "Баг/Хороо талбар заавал бөглөнө үү.";
    }
    if (!form.danPassportAddress) {
      newErrors.danPassportAddress =
        "Дэлгэрэнгүй хаяг талбар заавал бөглөнө үү.";
    }
    if (!form.phone) {
      newErrors.phone = "Утас талбар заавал бөглөнө үү.";
    }
    if (!form.email) {
      newErrors.email = "Имэйл талбар заавал бөглөнө үү.";
    } else if (!/\S+@\S+\.\S+/.test(form.email)) {
      newErrors.email = "Имэйл хаяг буруу байна.";
    }
    if (form.password && form.password.length < 8) {
      newErrors.password = "Нууц үг 8-с дээш тэмдэгттэй байх ёстой.";
    }

    return newErrors;
  };

  const handleSave = async () => {
    const validationErrors = validate();

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return; // Stop form submission if there are errors
    }

    // Create a copy of the form data
    const formData = { ...form };

    // Remove password field if it's empty
    if (!formData.password) {
      delete formData.password;
    }

    try {
      const response = await axios.post(`${mainUrl}/api/update`, formData, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status === 200) {
        updateUser(response.data.user);
        Alert.alert("Амжилттай!", "Таны мэдээлэл шинэчлэгдлээ.");
      } else {
        Alert.alert(
          "Алдаа",
          response.data.message || "Шинэчлэх явцад алдаа гарлаа."
        );
      }
    } catch (error) {
      const errorMessage =
        error.response?.data?.message ||
        error.response?.data ||
        error.message ||
        "Шинэчлэх явцад алдаа гарлаа.";

      console.log("Алдаа:", errorMessage); // Алдааны логийг шалгах
      Alert.alert("Алдаа", errorMessage);
    }
  };

  return (
    <ScrollView style={styles.container}>
      {/* Wrap your form in ScrollView */}
      <Text style={styles.label}>УБ/Орон нутаг</Text>
      <TextInput
        placeholder="УБ/Орон нутаг"
        value={form.danAimagCityName}
        onChangeText={(text) => setForm({ ...form, danAimagCityName: text })}
        style={styles.input}
      />
      {errors.danAimagCityName && (
        <Text style={styles.errorText}>{errors.danAimagCityName}</Text>
      )}
      <Text style={styles.label}>Сум/Дүүрэг</Text>
      <TextInput
        placeholder="Сум/Дүүрэг"
        value={form.danSoumDistrictName}
        onChangeText={(text) => setForm({ ...form, danSoumDistrictName: text })}
        style={styles.input}
      />
      {errors.danSoumDistrictName && (
        <Text style={styles.errorText}>{errors.danSoumDistrictName}</Text>
      )}
      <Text style={styles.label}>Баг/Хороо</Text>
      <TextInput
        placeholder="Баг/Хороо"
        value={form.danBagKhorooName}
        onChangeText={(text) => setForm({ ...form, danBagKhorooName: text })}
        style={styles.input}
      />
      {errors.danBagKhorooName && (
        <Text style={styles.errorText}>{errors.danBagKhorooName}</Text>
      )}
      <Text style={styles.label}>Дэлгэрэнгүй хаяг</Text>
      <TextInput
        placeholder="Дэлгэрэнгүй хаяг"
        multiline
        numberOfLines={10}
        autoCapitalize="none"
        autoCorrect={false}
        maxLength={1000}
        value={form.danPassportAddress}
        onChangeText={(text) => setForm({ ...form, danPassportAddress: text })}
        style={styles.inputAddressDetail}
      />
      {errors.danPassportAddress && (
        <Text style={styles.errorText}>{errors.danPassportAddress}</Text>
      )}
      <Text style={styles.label}>Утас</Text>
      <TextInput
        placeholder="Утас"
        value={form.phone}
        onChangeText={(text) => setForm({ ...form, phone: text })}
        style={styles.input}
        keyboardType="phone-pad"
      />
      {errors.phone && <Text style={styles.errorText}>{errors.phone}</Text>}
      <Text style={styles.label}>Имэйл</Text>
      <TextInput
        placeholder="Имэйл"
        value={form.email}
        onChangeText={(text) => setForm({ ...form, email: text })}
        style={styles.input}
      />
      {errors.email && <Text style={styles.errorText}>{errors.email}</Text>}
      <Text style={styles.label}>Шинэ нууц үг</Text>
      <TextInput
        placeholder="Нууц үг"
        value={form.password}
        onChangeText={(text) => setForm({ ...form, password: text })}
        secureTextEntry
        style={styles.input}
      />
      {errors.password && (
        <Text style={styles.errorText}>{errors.password}</Text>
      )}
      <TouchableOpacity style={styles.button} onPress={handleSave}>
        <Text style={styles.buttonText}>Хадгалах</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingVertical: 20,
    backgroundColor: "#f8f8f8",
  },
  label: {
    marginBottom: 6,
    fontSize: 14,
    fontWeight: "bold",
  },
  input: {
    marginBottom: 12,
    padding: 12,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    backgroundColor: "#fff",
  },
  inputAddressDetail: {
    height: 120, // Adjust height as needed
    backgroundColor: "#fff",
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 8,
    padding: 10,
    marginVertical: 10,
    textAlignVertical: "top",
  },
  button: {
    marginTop: 16,
    marginBottom: 20,
    backgroundColor: "#007BFF",
    padding: 16,
    borderRadius: 8,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
  errorText: {
    color: "red",
    fontSize: 12,
    marginBottom: 8,
  },
});
