import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  ScrollView,
  TouchableOpacity,
  Alert,
  Button,
  Image,
} from "react-native";
import React, { useState, useContext, useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import { mainColor, formTextColor, mainUrl } from "../../Constants";
import FormText from "../components/FormText";
import * as Animatable from "react-native-animatable";
import FormPicker from "../components/FormPicker";
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
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [filteredOrganizations, setFilteredOrganizations] = useState([]);
  const [filteredSummary, setFilteredSummary] = useState([]);
  const [resetPicker, setResetPicker] = useState(false);
  const [image, setImage] = useState(null);
  const [selectedLabel, setSelectedLabel] = useState("Choose");
  const navigation = useNavigation();

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
  // console.log("user====", user);

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

  const [error, setError] = useState({
    category_id: false,
    complaint_type_id: false,
    complaint_type_summary_id: false,
    organization_id: false,
    complaint: false,
  });

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
    // Filter organizations based on energy_type_id
    if (formData.energy_type_id) {
      const filtered = organizations.filter(
        (org) => org.plant_id == formData.energy_type_id
      );
      setFilteredOrganizations(filtered);
      // console.log("=======", filteredOrganizations);
    } else {
      setFilteredOrganizations([]);
    }

    // Filter organizations based on energy_type_id
    if (formData.energy_type_id && formData.complaint_type_id) {
      const filtered = complaintTypeSummary.filter(
        (item) =>
          item.energy_type_id == formData.energy_type_id &&
          item.complaint_type_id == formData.complaint_type_id
      );
      setFilteredSummary(filtered);
      console.log("=======", filteredSummary);
    } else {
      setFilteredSummary([]);
    }
  }, [
    user,
    formData.energy_type_id,
    formData.complaint_type_id,
    organizations,
  ]);

  const sendComplaint = () => {
    const allFormData = { ...userData, ...formData };

    // console.log("==========", allFormData);

    axios
      .post(`${mainUrl}/api/complaints`, allFormData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        // Fetch updated complaints after adding a new complaint
        console.log("complaint created successfully..");
        // console.log("res: ", res.data.data);

        const newComplaint = res.data.data;
        uploadImage(newComplaint.id);

        resetForm();
        setResetPicker(true);
        navigation.navigate("ComplaintListScreen", {
          newComplaint: res.data.data,
        });
      })
      .catch((error) => {
        Alert.alert("Error create complaint: ", error);
      });
  };

  const checkComplaint = (text) => {
    // setError({
    //   ...error,
    //   complaint: text.length < 10 || text.length > 100,
    // });
    setFormData({
      ...formData,
      complaint: text,
    });
  };

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
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

  const uploadImage = (complaint_id) => {
    console.log("image=====", image);
    if (!image) return;

    const formData = new FormData();
    formData.append("file", {
      uri: image,
      name: "image.jpg",
      type: "image/jpeg",
    });

    axios
      .post(`${mainUrl}/api/upload/${complaint_id}`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
        console.log("Image uploaded successfully", response.data);
        setImage(null);
      })
      .catch((error) => {
        console.error("Error uploading image", error.response.data);
        if (
          error.response &&
          error.response.data &&
          error.response.data.errors
        ) {
          const errorMessages = error.response.data.errors.file.join(", ");
          Alert.alert("Upload Error", errorMessages);
        } else {
          console.error("Error uploading image", error.message);
          Alert.alert(
            "Upload Error",
            "An error occurred while uploading the image."
          );
        }
        setImage(null);
      });
  };

  const resetForm = () => {
    setFormData(initialFormData);
    setIsSubmitted(false);
    setError({
      category_id: false,
      complaint_type_id: false,
      complaint_type_summary_id: false,
      organization_id: false,
      complaint: false,
    });
    setImage(null);
    console.log("Form resetted...");
  };

  return (
    <SafeAreaView
      style={{ flex: 1, backgroundColor: "#fff", marginBottom: 50 }}
      showsVerticalScrollIndicator={false}>
      <Animatable.View
        animation="fadeInUpBig"
        duration={1500}
        style={{
          flex: 9,
          paddingVertical: 10,
          paddingHorizontal: 20,
          backgroundColor: "#fff",
          borderTopLeftRadius: 30,
          borderTopRightRadius: 30,
        }}>
        <ScrollView>
          <FormRadioButton
            label="Энергийн төрөл сонгоно уу:"
            value={formData.energy_type_id}
            // icon="layers"
            onValueChange={(value, index) => {
              console.log("energy id: ", value);
              setFormData({ ...formData, energy_type_id: value });
            }}
          />
          <FormPicker
            label="Төрөл:"
            value={formData.category_id}
            isSubmitted={isSubmitted}
            icon="layers"
            data={categories.map((el) => el.name)}
            values={categories.map((el) => el.id)}
            onValueChange={(value, index) => {
              console.log("category_id: ", value);
              setFormData({ ...formData, category_id: value });
            }}
            reset={resetPicker}
          />
          <FormPicker
            label="Гомдлын төрөл:"
            value={formData.complaint_type_id}
            isSubmitted={isSubmitted}
            icon="layers"
            data={complaintType.map((el) => el.name)}
            values={complaintType.map((el) => el.id)}
            onValueChange={(value, index) => {
              console.log("complaint_type_id: ", value);
              setFormData({ ...formData, complaint_type_id: value });
            }}
            reset={resetPicker}
          />
          <FormPicker
            label="Гомдлын товч утга:"
            value={formData.complaint_type_summary_id}
            isSubmitted={isSubmitted}
            icon="layers"
            data={filteredSummary.map((el) => el.name)}
            values={filteredSummary.map((el) => el.id)}
            onValueChange={(value, index) => {
              console.log("complaint_type_summary_id: ", value);
              setFormData({ ...formData, complaint_type_summary_id: value });
            }}
            reset={resetPicker}
          />
          <FormPicker
            label="Холбогдох ТЗЭ:"
            value={formData.organization_id}
            isSubmitted={isSubmitted}
            icon="home"
            data={filteredOrganizations.map((el) => el.name)}
            values={filteredOrganizations.map((el) => el.id)}
            onValueChange={(value, index) => {
              console.log("org_id: ", value);
              setFormData({ ...formData, organization_id: value });
            }}
            reset={resetPicker}
          />
          <FormText
            label="Санал хүсэлт"
            placeholder="Санал хүсэлтээ бичнэ үү"
            // icon="edit"
            style={{ height: 100, marginBottom: 20 }}
            multiline
            numberOfLines={10}
            autoCapitalize="none"
            autoCorrect={false}
            value={formData.complaint}
            onChangeText={checkComplaint}
            // errorText="Текстийн урт 10 тэмдэгтээс багагүй байна"
            // errorShow={error.complaint}
          />
          {image && <Image source={{ uri: image }} style={styles.image} />}
          <Button title="Файл хавсаргах" onPress={pickImage} />
          {/* <Button title="Upload" onPress={() => uploadImage(347)} /> */}
          <TouchableOpacity
            style={{
              alignItems: "center",
              backgroundColor: mainColor,
              padding: 10,
              marginTop: 20,
              borderRadius: 10,
              marginBottom: 50,
            }}
            onPress={sendComplaint}>
            <Text style={{ color: "#fff", paddingVertical: 5, fontSize: 18 }}>
              Илгээх
            </Text>
          </TouchableOpacity>
        </ScrollView>
      </Animatable.View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    width: 100,
    height: 100,
    marginTop: 10,
  },
});

export default CreateComplaintScreen;
