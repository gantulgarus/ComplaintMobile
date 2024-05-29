import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  ScrollView,
} from "react-native";
import React, { useState } from "react";
import ComplaintForm from "../components/ComplaintForm";
import { mainColor, formTextColor } from "../../Constants";
import FormText from "../components/FormText";
import * as Animatable from "react-native-animatable";
import FormPicker from "../components/FormPicker";

const CreateComplaintScreen = () => {
  const [formData, setFormData] = useState({
    category: "Гомдол",
    complaint_type: "Төлбөр тооцоо",
    complaint_type_summary: "Бичилттэй холбоотой",
    organization: "Адтай ноён",
    complaint: "",
  });
  const [error, setError] = useState({
    category: false,
    complaint_type: false,
    complaint_type_summary: false,
    organization: false,
    complaint: false,
  });

  const checkCategory = (text) => {
    setFormData({
      ...formData,
      category: text,
    });
  };
  const checkComplaintType = (text) => {
    setFormData({
      ...formData,
      complaint_type: text,
    });
  };
  const checkComplaintTypeSummary = (text) => {
    setFormData({
      ...formData,
      complaint_type_summary: text,
    });
  };
  const checkOrganization = (text) => {
    setFormData({
      ...formData,
      organization: text,
    });
  };
  const checkComplaint = (text) => {
    setError({
      ...error,
      complaint: text.length < 10 || text.length > 100,
    });
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
        <Text style={{ fontSize: 28, color: "white" }}>
          Шинээр гомдол илгээх
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
          <FormText
            label="Төрөл"
            placeholder="Төрөл"
            icon="bookmark"
            value={formData.category}
            onChangeText={checkCategory}
            errorText="dfa fasd fas "
            errorShow={error.category}
          />
          <FormText
            label="Гомдлын төрөл"
            placeholder="Гомдлын төрөл сонгоно уу"
            icon="bookmark"
            value={formData.complaint_type}
            onChangeText={checkComplaintType}
            errorText="dfa fasd fas "
            errorShow={error.complaint_type}
          />
          <FormText
            label="Өргөдлийн товч утга"
            placeholder="Өргөдлийн товч утга сонгоно уу"
            icon="clipboard"
            value={formData.complaint_type_summary}
            onChangeText={checkComplaintTypeSummary}
            errorText="dfa fasd fas "
            errorShow={error.complaint_type_summary}
          />
          <FormText
            label="Холбогдох ТЗЭ"
            placeholder="Холбогдох ТЗЭ сонгоно уу"
            icon="compass"
            value={formData.organization}
            onChangeText={checkOrganization}
            errorText="dfa fasd fas "
            errorShow={error.organization}
          />
          <FormText
            label="Санал хүсэлт"
            placeholder="Санал хүсэлтээ бичнэ үү"
            icon="edit"
            multiline
            numberOfLines={10}
            value={formData.complaint}
            onChangeText={checkComplaint}
            errorText="Текстийн урт 10 тэмдэгтээс багагүй байна"
            errorShow={error.complaint}
          />
          <FormPicker
            label="Төрөл:"
            value={formData.category}
            icon="layers"
            data={["Гомдол", "Санал", "Талархал"]}
            values={["1", "2", "3"]}
            onValueChange={(value, index) => {
              console.log(value);
              setFormData({ ...formData, category: value });
            }}
          />
        </ScrollView>
      </Animatable.View>
      {/* <ComplaintForm /> */}
    </SafeAreaView>
  );
};

export default CreateComplaintScreen;
