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

const CreateComplaintScreen = (props) => {
  const { user } = useContext(AuthContext);
  const [categories, errorMessage, loading] = useCategory();
  const [complaintType] = useComplaintType();
  const [complaintTypeSummary] = useComplaintTypeSummary();
  const [organizations] = useOrganization();
  const [isSubmitted, setIsSubmitted] = useState(false);

  const initialUserData = {
    lastname: "",
    firstname: "",
    registerNumber: "",
    country: "",
    district: "",
    khoroo: "",
    addressDetail: "",
  };

  const [userData, setUserData] = useState(initialUserData);
  // console.log("user====", user);

  useEffect(() => {
    setUserData({
      lastname: user.lastname,
      firstname: user.firstname,
      registerNumber: user.regnum,
      country: user.aimagCityName,
      district: user.soumDistrictName,
      khoroo: user.bagKhorooName,
      addressDetail: user.passportAddress,
    });
  }, [user]);

  const initialFormData = {
    category_id: "",
    complaint_type_id: "",
    complaint_type_summary_id: "",
    organization_id: "",
    complaint: "",
    energy_type_id: 1,
    phone: 99059045,
    email: "adsf@mail.com",
    status_id: 0, // Шинэ гомдол
    channel_id: 5, // Гар утас апп
    complaint_maker_type_id: 1, // Иргэн
    created_user_id: 1,
  };

  const [formData, setFormData] = useState(initialFormData);

  const [error, setError] = useState({
    category_id: false,
    complaint_type_id: false,
    complaint_type_summary_id: false,
    organization_id: false,
    complaint: false,
  });

  const sendComplaint = () => {
    const allFormData = { ...userData, ...formData };
    console.log("allFormData: ", allFormData);
    axios
      .post("http://192.168.0.82:8000/api/complaints", allFormData)
      .then((result) => {
        console.log(result.data.status);
        const newComplaint = result.data.data;

        setIsSubmitted(true);
        setFormData(initialFormData);
        setUserData(initialUserData);

        props.navigation.navigate("ComplaintDetail", {
          id: newComplaint.id,
        });
      })
      .catch((err) => {
        setIsSubmitted(true);
        // console.log("Status: ", err.response.data.status);
        console.log("Message: ", err.response.data.message);
        console.log("Error: ", err.response.data.error);
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

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: mainColor }}>
      <StatusBar backgroundColor={mainColor} barStyle="dark-content" />
      <View
        style={{
          flex: 1,
          paddingVertical: 10,
          paddingHorizontal: 20,
          backgroundColor: mainColor,
        }}>
        <Text style={{ fontSize: 28, color: "white" }}>Шинэ гомдол илгээх</Text>
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
          <FormPicker
            label="Төрөл:"
            value={formData.category_id}
            isSubmitted={isSubmitted}
            icon="layers"
            data={categories.map((el) => el.name)}
            values={categories.map((el) => el.id)}
            onValueChange={(value, index) => {
              console.log("id: ", value);
              setFormData({ ...formData, category_id: value });
            }}
          />
          <FormPicker
            label="Гомдлын төрөл:"
            value={formData.complaint_type_id}
            isSubmitted={isSubmitted}
            icon="layers"
            data={complaintType.map((el) => el.name)}
            values={complaintType.map((el) => el.id)}
            onValueChange={(value, index) => {
              setFormData({ ...formData, complaint_type_id: value });
            }}
          />
          <FormPicker
            label="Гомдлын товч утга:"
            value={formData.complaint_type_summary_id}
            isSubmitted={isSubmitted}
            icon="layers"
            data={complaintTypeSummary.map((el) => el.name)}
            values={complaintTypeSummary.map((el) => el.id)}
            onValueChange={(value, index) => {
              setFormData({ ...formData, complaint_type_summary_id: value });
            }}
          />
          <FormPicker
            label="Холбогдох ТЗЭ:"
            value={formData.organization_id}
            isSubmitted={isSubmitted}
            icon="home"
            data={organizations.map((el) => el.name)}
            values={organizations.map((el) => el.id)}
            onValueChange={(value, index) => {
              setFormData({ ...formData, organization_id: value });
            }}
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
