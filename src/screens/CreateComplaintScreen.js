import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import React, { useState, useContext, useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import { mainColor, formTextColor } from "../../Constants";
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
import useComplaint from "../hooks/useComplaint";

const CreateComplaintScreen = (props) => {
  const { user, token } = useContext(AuthContext);
  const [complaints, errorMessage, loading, addComplaint] = useComplaint();
  const [categories] = useCategory();
  const [complaintType] = useComplaintType();
  const [complaintTypeSummary] = useComplaintTypeSummary();
  const [organizations] = useOrganization();
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [filteredOrganizations, setFilteredOrganizations] = useState([]);
  const [filteredSummary, setFilteredSummary] = useState([]);
  const [resetPicker, setResetPicker] = useState(false);
  const navigation = useNavigation();

  // console.log("organizations: ", organizations);

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
    // console.log("allFormData: ", allFormData);
    addComplaint(allFormData);
    resetForm();
    setResetPicker(true);
    navigation.navigate("ComplaintListScreen");
    // props.navigation.navigate("ComplaintListScreen");
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
    console.log("Form resetted...");
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: mainColor }}>
      <StatusBar backgroundColor={mainColor} barStyle="light" />
      <View
        style={{
          flex: 1,
          paddingVertical: 10,
          paddingHorizontal: 20,
          backgroundColor: mainColor,
        }}>
        <Text style={{ fontSize: 28, color: "white" }}>
          Өргөдөл, гомдол бүртгэх
        </Text>
        <Text style={{ fontSize: 14, color: "white" }}>
          Та дэлгэрэнгүй мэдээллээ доор оруулна уу
        </Text>
      </View>
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
            style={{ height: 100 }}
            multiline
            numberOfLines={10}
            value={formData.complaint}
            onChangeText={checkComplaint}
            // errorText="Текстийн урт 10 тэмдэгтээс багагүй байна"
            // errorShow={error.complaint}
          />
          <TouchableOpacity
            style={{
              alignItems: "center",
              backgroundColor: mainColor,
              padding: 10,
              marginTop: 20,
              borderRadius: 10,
            }}
            onPress={sendComplaint}>
            <Text style={{ color: "#fff", paddingVertical: 5, fontSize: 18 }}>
              Илгээх
            </Text>
          </TouchableOpacity>
        </ScrollView>
      </Animatable.View>
      {/* <ComplaintForm /> */}
    </SafeAreaView>
  );
};

export default CreateComplaintScreen;
