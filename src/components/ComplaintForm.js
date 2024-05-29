import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Alert,
} from "react-native";
import { useForm, Controller } from "react-hook-form";
import { Provider as PaperProvider, Button } from "react-native-paper";

const ComplaintForm = () => {
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log(data);
    Alert.alert(
      "Complaint Submitted",
      "Your complaint has been submitted successfully."
    );
    reset();
  };

  return (
    <PaperProvider>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>Complaint Form</Text>

        <Text style={styles.label}>Full Name</Text>
        <Controller
          control={control}
          name="fullName"
          rules={{ required: "Full Name is required" }}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              style={[styles.input, errors.fullName && styles.errorInput]}
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              placeholder="Enter your full name"
            />
          )}
        />
        {errors.fullName && (
          <Text style={styles.errorText}>{errors.fullName.message}</Text>
        )}

        <Text style={styles.label}>Email</Text>
        <Controller
          control={control}
          name="email"
          rules={{
            required: "Email is required",
            pattern: {
              value: /^\S+@\S+$/i,
              message: "Invalid email address",
            },
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              style={[styles.input, errors.email && styles.errorInput]}
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              placeholder="Enter your email"
              keyboardType="email-address"
              autoCapitalize="none"
            />
          )}
        />
        {errors.email && (
          <Text style={styles.errorText}>{errors.email.message}</Text>
        )}

        <Text style={styles.label}>Complaint</Text>
        <Controller
          control={control}
          name="complaint"
          rules={{ required: "Complaint is required" }}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              style={[styles.textarea, errors.complaint && styles.errorInput]}
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              placeholder="Describe your complaint"
              multiline={true}
              numberOfLines={4}
            />
          )}
        />
        {errors.complaint && (
          <Text style={styles.errorText}>{errors.complaint.message}</Text>
        )}

        <Button
          mode="contained"
          style={styles.button}
          onPress={handleSubmit(onSubmit)}>
          Submit
        </Button>
      </ScrollView>
    </PaperProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: "#f5f5f5",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
    color: "#333",
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
    color: "#333",
  },
  input: {
    height: 40,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 10,
    backgroundColor: "#fff",
  },
  textarea: {
    height: 100,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 10,
    backgroundColor: "#fff",
    textAlignVertical: "top",
  },
  button: {
    marginTop: 20,
    backgroundColor: "#3730a3",
  },
  errorText: {
    color: "red",
    marginBottom: 10,
  },
  errorInput: {
    borderColor: "red",
  },
});

export default ComplaintForm;
