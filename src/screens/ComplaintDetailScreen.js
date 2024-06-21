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
import FileModal from "../components/FileModal";
import { getFileExtension } from "../utils/Helper";

const ComplaintDetailScreen = ({ route }) => {
  const { user, token } = useContext(AuthContext);
  const complaintId = route.params.id;
  const [complaint, setComplaint] = useState([]);
  const [steps, setSteps] = useState([]);
  const [sound, setSound] = useState(null);
  const [popupVisible, setPopupVisible] = useState(false);

  console.log(complaint);

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
      <View style={styles.containerComplaint}>
        <View style={styles.info}>
          <Text style={styles.name}>
            {complaint.category} - №{complaint.serial_number}
          </Text>
          <Text style={styles.date}>{complaint.complaint_date}</Text>

          <View
            style={{
              flexDirection: "row",
              flexWrap: "wrap",
              marginBottom: 10,
            }}>
            <Text style={styles.infoText}>{complaint.energyType}</Text>
            <Text style={styles.infoText}>{complaint.complaintType}</Text>
            <Text style={styles.infoText}>
              {complaint.complaintTypeSummary}
            </Text>
          </View>

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
            <View style={{ paddingLeft: 10, width: 300 }}>
              <Text style={{ fontSize: 12, color: "gray" }}>Хавсралт файл</Text>
              <FileModal
                fileName={complaint.fileName}
                fileExt={getFileExtension(complaint.fileName)}
                fileSizeInKilobytes={1234}
                fileUrl={complaint.fileUrl}
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
    // backgroundColor: mainBgColor,
    backgroundColor: "#fff",
  },
  info: {
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  infoText: {
    color: "#1E3A8A", // Equivalent to text-blue-900
    backgroundColor: "#DBEAFE", // Equivalent to bg-blue-100
    fontSize: 14, // Equivalent to text-sm
    paddingVertical: 2, // Equivalent to py-1
    paddingHorizontal: 4, // Equivalent to px-2
    margin: 2, // Equivalent to m-2 and mr-2
    borderRadius: 4, // Equivalent to rounded-md
  },
  name: {
    fontSize: 20,
    fontWeight: "bold",
  },
  date: {
    fontSize: 12,
    color: "#999",
    marginBottom: 10,
  },
  description: {
    padding: 12, // Equivalent to p-4
    backgroundColor: "#f1f5f9", // Equivalent to bg-slate-100
    borderRadius: 8, // Equivalent to rounded
    color: "#334155", // Equivalent to text-slate-700
    textAlign: "justify", // Equivalent to text-justify
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3, // Equivalent to shadow-inner
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
