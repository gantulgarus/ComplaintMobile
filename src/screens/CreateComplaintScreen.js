import {
  View,
  Text,
  TextInput,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  Alert,
  Button,
  Image,
  Keyboard,
} from "react-native";
import React, {
  useState,
  useContext,
  useEffect,
  useRef,
  useCallback,
  useMemo,
} from "react";
import { useNavigation } from "@react-navigation/native";
import { mainColor, formTextColor, mainUrl } from "../../Constants";
import * as Animatable from "react-native-animatable";
import BottomSheet, {
  BottomSheetBackdrop,
  BottomSheetView,
  BottomSheetScrollView,
} from "@gorhom/bottom-sheet";
import useCategory from "../hooks/useCategory";
import useComplaintType from "../hooks/useComplaintType";
import useComplaintTypeSummary from "../hooks/useComplaintTypeSummary";
import useOrganization from "../hooks/useOrganization";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";
import FormRadioButton from "../components/FormRadioButton";
import * as ImagePicker from "expo-image-picker";

const CreateComplaintScreen = (props) => {
  const { user, token } = useContext(AuthContext);
  const [categories] = useCategory();
  const [complaintType] = useComplaintType();
  const [complaintTypeSummary] = useComplaintTypeSummary();
  const [organizations] = useOrganization();
  const [filteredOrganizations, setFilteredOrganizations] = useState([]);
  const [filteredSummary, setFilteredSummary] = useState([]);
  const [image, setImage] = useState(null);
  const navigation = useNavigation();
  const bottomSheetRef = useRef(null);
  const [pickerData, setPickerData] = useState([]);
  const [selectedPicker, setSelectedPicker] = useState(null);

  const snapPoints = useMemo(() => ["25%", "50%", "75%"], []);

  const renderBackdrop = useCallback(
    (props) => (
      <BottomSheetBackdrop
        {...props}
        appearsOnIndex={1}
        disappearsOnIndex={-1}
      />
    ),
    []
  );

  const initialUserData = {
    lastname: "",
    firstname: "",
    registerNumber: "",
    country: "",
    district: "",
    khoroo: "",
    addressDetail: "",
    created_user_id: "",
    phone: "",
    email: "",
  };

  const [userData, setUserData] = useState(initialUserData);

  const initialFormData = {
    category_id: "",
    complaint_type_id: "",
    complaint_type_summary_id: "",
    organization_id: "",
    complaint: "",
    energy_type_id: 1, // Эхлээд цахилгаан сонгогдсон байна
    status_id: 0, // Шинэ гомдол
    channel_id: 5, // Гар утас апп
    complaint_maker_type_id: 1, // Иргэн
  };

  const [formData, setFormData] = useState(initialFormData);

  const [error, setError] = useState("");

  useEffect(() => {
    setUserData({
      lastname: user.danLastname,
      firstname: user.danFirstname,
      registerNumber: user.danRegnum,
      country: user.danAimagCityName,
      district: user.danSoumDistrictName,
      khoroo: user.danBagKhorooName,
      addressDetail: user.danPassportAddress,
      created_user_id: user.id,
      phone: user.phone != null ? user.phone : 0,
      email: user.email != null ? user.email : "",
    });

    if (formData.energy_type_id) {
      const filtered = organizations.filter(
        (org) => org.plant_id == formData.energy_type_id
      );
      setFilteredOrganizations(filtered);
    } else {
      setFilteredOrganizations([]);
    }

    if (formData.energy_type_id && formData.complaint_type_id) {
      const filtered = complaintTypeSummary.filter(
        (item) =>
          item.energy_type_id == formData.energy_type_id &&
          item.complaint_type_id == formData.complaint_type_id
      );
      setFilteredSummary(filtered);
    } else {
      setFilteredSummary([]);
    }
  }, [
    user,
    formData.energy_type_id,
    formData.complaint_type_id,
    organizations,
  ]);

  const sendComplaint = async () => {
    try {
      const allFormData = { ...userData, ...formData };

      // Validate required fields

      if (!formData.category_id) {
        setError("Ангилал сонгоно уу");
        return;
      }
      if (!formData.complaint_type_id) {
        setError("Гомдлын төрөл сонгоно уу");
        return;
      }
      if (!formData.complaint_type_summary_id) {
        setError("Гомдлын товч утга сонгоно уу");
        return;
      }
      if (!formData.organization_id) {
        setError("Холбогдох ТЗЭ сонгоно уу");
        return;
      }
      if (!formData.complaint.trim()) {
        setError("Санал хүсэлтээ оруулна уу");
        return;
      }

      setError(""); // Clear any previous error if validation passed

      // Make the API request
      const response = await axios.post(
        `${mainUrl}/api/complaints`,
        allFormData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      // Handle response
      const newComplaint = response.data.data;
      await uploadImage(newComplaint.id); // If uploadImage is async

      resetForm();

      navigation.navigate("ComplaintListScreen", {
        newComplaint: newComplaint,
      });
    } catch (error) {
      // Check if the error is from axios
      if (error.response) {
        Alert.alert(
          "Server Error",
          `Status: ${error.response.status}. ${
            error.response.data.message || error.message
          }`
        );
      } else {
        Alert.alert("Request Error", error.message);
      }
    }
  };

  const openPicker = (pickerName, data) => {
    setPickerData(data);
    setSelectedPicker(pickerName);
    bottomSheetRef.current?.expand();
  };
  const closeBottomSheet = () => {
    bottomSheetRef.current?.close();
  };

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const uploadImage = async (complaint_id) => {
    if (!image) return;

    const formData = new FormData();
    formData.append("file", {
      uri: image,
      name: "image.jpg",
      type: "image/jpeg",
    });

    try {
      const response = await axios.post(
        `${mainUrl}/api/upload/${complaint_id}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      setImage(null);
      console.log("Image uploaded successfully:", response.data);
    } catch (error) {
      console.error(
        "Error uploading image",
        error.response?.data || error.message
      );
    }
  };

  const resetForm = () => {
    setFormData(initialFormData);
    setError("");
    setImage(null);
  };

  return (
    <SafeAreaView style={styles.container}>
      <Animatable.View
        animation="fadeInUpBig"
        duration={1500}
        style={styles.animatableView}>
        <ScrollView>
          <FormRadioButton
            label="Энергийн төрөл сонгоно уу:"
            value={formData.energy_type_id}
            onValueChange={(value) => {
              setFormData({ ...formData, energy_type_id: value });
            }}
          />
          <TouchableOpacity
            style={styles.pickerContainer}
            onPress={() => openPicker("category_id", categories)}>
            <Text style={styles.pickerText}>
              Ангилал:{" "}
              {categories.find((cat) => cat.id === formData.category_id)
                ?.name || "Сонгох"}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.pickerContainer}
            onPress={() => openPicker("complaint_type_id", complaintType)}>
            <Text style={styles.pickerText}>
              Гомдлын төрөл:{" "}
              {complaintType.find((ct) => ct.id === formData.complaint_type_id)
                ?.name || "Сонгох"}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.pickerContainer}
            onPress={() =>
              // openPicker("complaint_type_summary_id", filteredSummary)
              {
                if (!formData.category_id || !formData.complaint_type_id) {
                  Alert.alert(
                    "Анхааруулга",
                    "Ангилал болон гомдлын төрөл сонгогдоогүй байна. Эхлээд ангилал болон гомдлын төрөл сонгоно уу."
                  );
                } else {
                  openPicker("complaint_type_summary_id", filteredSummary);
                }
              }
            }>
            <Text style={styles.pickerText}>
              Гомдлын товч утга:{" "}
              {filteredSummary.find(
                (sum) => sum.id === formData.complaint_type_summary_id
              )?.name || "Сонгох"}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.pickerContainer}
            onPress={() =>
              openPicker("organization_id", filteredOrganizations)
            }>
            <Text style={styles.pickerText}>
              Холбогдох ТЗЭ:{" "}
              {filteredOrganizations.find(
                (org) => org.id === formData.organization_id
              )?.name || "Сонгох"}
            </Text>
          </TouchableOpacity>

          <TextInput
            style={styles.textInput} // Add your styles for the TextInput
            placeholder="Санал хүсэлтээ бичнэ үү"
            multiline
            numberOfLines={10}
            autoCapitalize="none"
            autoCorrect={false}
            maxLength={1000} // Sets a limit of 200 characters
            value={formData.complaint}
            onChangeText={(text) => {
              setFormData({ ...formData, complaint: text });
              setError("");
            }}
          />
          <Text style={{ textAlign: "right", color: "#888" }}>
            {formData.complaint.length} / 1000
          </Text>
          {error ? <Text style={styles.errorText}>{error}</Text> : null}

          {image && <Image source={{ uri: image }} style={styles.image} />}
          <Button title="Файл хавсаргах" onPress={pickImage} />
          <TouchableOpacity style={styles.submitButton} onPress={sendComplaint}>
            <Text style={styles.submitButtonText}>Илгээх</Text>
          </TouchableOpacity>
        </ScrollView>
      </Animatable.View>

      <BottomSheet
        ref={bottomSheetRef}
        index={-1}
        snapPoints={snapPoints}
        enablePanDownToClose={true}
        backdropComponent={renderBackdrop}
        onClose={closeBottomSheet}
        enableContentPanningGesture={false}>
        <BottomSheetView style={{ flex: 1 }}>
          <BottomSheetScrollView
            contentContainerStyle={styles.scrollContentContainer}
            keyboardShouldPersistTaps="handled">
            {pickerData.map((option) => (
              <TouchableOpacity
                key={option.id}
                style={styles.optionContainer}
                onPress={() => {
                  setFormData({ ...formData, [selectedPicker]: option.id });
                  bottomSheetRef.current?.close();
                  closeBottomSheet();
                }}>
                <Text style={styles.optionText}>{option.name}</Text>
              </TouchableOpacity>
            ))}
          </BottomSheetScrollView>
        </BottomSheetView>
      </BottomSheet>
    </SafeAreaView>
  );
};

export default CreateComplaintScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  animatableView: { flex: 1, padding: 16 },
  submitButton: {
    backgroundColor: mainColor,
    padding: 16,
    borderRadius: 8,
    marginTop: 10,
  },
  submitButtonText: {
    color: "#fff",
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 16,
  },
  image: { width: 100, height: 100, marginVertical: 8 },
  pickerContainer: {
    padding: 12,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    marginVertical: 8,
    backgroundColor: "#EAF0F1",
  },
  pickerText: {
    fontSize: 16,
    color: formTextColor,
  },
  optionContainer: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    backgroundColor: "#EAF0F1",
    borderRadius: 8,
    borderColor: "#ccc",
    borderWidth: 1,
    margin: 10,
  },
  optionText: {
    fontSize: 16,
    color: formTextColor,
    textAlign: "center",
  },
  textInput: {
    height: 120, // Adjust height as needed
    backgroundColor: "#EAF0F1",
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    marginVertical: 10,
    fontSize: 16,
    color: "#333",
    textAlignVertical: "top",
  },
  errorText: {
    color: "red",
    marginBottom: 10,
  },
  scrollContentContainer: {
    flexGrow: 1, // Ensures content stretches and scrolls correctly
    paddingBottom: 20, // Adds padding for a better scroll experience
  },
});
