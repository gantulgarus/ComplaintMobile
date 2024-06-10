import {
  View,
  Image,
  Text,
  Button,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import Timeline from "../components/Timeline";
import ImagePopup from "../components/ImagePopup";
import { Audio } from "expo-av";
import Divider from "../components/Divider";
import MaterialIcon from "react-native-vector-icons/MaterialIcons";
import { AuthContext } from "../context/AuthContext";
import { mainBgColor, mainUrl } from "../../Constants";

const ComplaintDetailScreen = ({ route }) => {
  const { user, token } = useContext(AuthContext);
  const complaintId = route.params.id;
  const [complaint, setComplaint] = useState([]);
  const [steps, setSteps] = useState([]);
  const [sound, setSound] = useState(null);
  const [popupVisible, setPopupVisible] = useState(false);

  const playSound = async (audioUrl) => {
    if (audioUrl) {
      const { sound } = await Audio.Sound.createAsync({ uri: audioUrl });
      setSound(sound);
      await sound.replayAsync();
    }
  };

  useEffect(() => {
    axios
      .get(`${mainUrl}/api/complaints/${complaintId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      })
      .then((result) => {
        // console.log("data amjilttai tatlaa", result.data.data);
        setComplaint(result.data.data);
      })
      .catch((err) => console.log(err));
    axios
      .get(`${mainUrl}/api/steps/${complaintId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      })
      .then((result) => {
        // console.log("data amjilttai tatlaa", result.data.data);
        setSteps(result.data.data);
      })
      .catch((err) => console.log(err));
  }, [complaintId]);

  const togglePopup = () => {
    setPopupVisible(!popupVisible);
  };

  return (
    <View style={styles.container}>
      {/* <CustomHeader title="Дэлгэрэнгүй" /> */}
      <View style={styles.containerComplaint}>
        <View style={styles.info}>
          <Text style={styles.name}>
            {complaint.category} - №{complaint.serial_number}
          </Text>
          <Text style={styles.date}>{complaint.complaint_date}</Text>
          <Text style={styles.description}>{complaint.complaint}</Text>
        </View>
        <View style={{ padding: 10 }}>
          {complaint.audioUrl && (
            <TouchableOpacity
              style={styles.buttonFile}
              onPress={() => playSound(complaint.audioUrl)}>
              <MaterialIcon name="play-circle-outline" size={20} color="#000" />
              <Text style={styles.text}>{complaint.audioName}</Text>
            </TouchableOpacity>
          )}
          {complaint.fileUrl && (
            <View style={{ marginTop: 10 }}>
              <TouchableOpacity style={styles.buttonFile} onPress={togglePopup}>
                <MaterialIcon name="attach-file" size={20} color="#000" />
                <Text style={styles.text}>{complaint.fileName}</Text>
              </TouchableOpacity>
              <ImagePopup
                imageUrl={complaint.fileUrl}
                visible={popupVisible}
                onClose={togglePopup}
              />
            </View>
          )}
        </View>
      </View>
      <Divider />
      <Timeline items={steps} />
    </View>
  );
};

export default ComplaintDetailScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: mainBgColor,
  },
  info: {
    padding: 20,
  },
  name: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  date: {
    fontSize: 14,
    color: "#999",
    marginBottom: 10,
  },
  description: {
    fontSize: 14,
    color: "#333",
    // lineHeight: 24,
  },
  buttonFile: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    backgroundColor: "whitesmoke",
    borderRadius: 5,
  },
  containerStep: {
    flexGrow: 1,
    padding: 20,
  },
  item: {
    flexDirection: "row",
    marginBottom: 20,
    alignItems: "center",
    position: "relative",
  },
  itemContent: {
    flex: 1,
    marginLeft: 10,
  },
  itemTime: {
    fontWeight: "bold",
    marginBottom: 5,
  },
  itemTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 5,
  },
});
