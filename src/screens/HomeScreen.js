import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  ActivityIndicator,
} from "react-native";
import React, { useCallback, useContext, useState } from "react";
import ComplaintItem from "../components/ComplaintItem";
import EmptyData from "../components/EmptyData";
import { AuthContext } from "../context/AuthContext";
import SquareItem from "../components/SquareItem";
import { SafeAreaView } from "react-native-safe-area-context";
import Header from "../components/Header";
import { mainColor } from "../../Constants";
import useComplaint from "../hooks/useComplaint";
import { useFocusEffect } from "@react-navigation/native";

const Home = ({ navigation }) => {
  const { user, token } = useContext(AuthContext);
  // console.log("user====", user);
  const [refresh, setRefresh] = useState(false);
  const [complaints, errorMessage, loading] = useComplaint(refresh, setRefresh);

  // Function to count complaints by status ID
  const countComplaintsByStatusId = (statusId) => {
    return complaints.filter((complaint) => complaint.status_id == statusId)
      .length;
  };

  useFocusEffect(
    useCallback(() => {
      setRefresh(true);
      return () => {
        setRefresh(false);
      };
    }, [])
  );

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
      <Header title="" user={user} />
      <View style={styles.container}>
        <View style={styles.summaryCard}>
          <View style={styles.summaryView}>
            <Text style={styles.summaryText}>Өнөөдрийн байдлаар танд</Text>
            <View style={styles.summaryRow}>
              <Text style={styles.totalComplaints}>{complaints.length}</Text>
              <View>
                <Text style={styles.summarySubText}>Нийт</Text>
                <Text style={styles.summarySubText}>өргөдөл, гомдол</Text>
              </View>
            </View>
          </View>
          <View>
            <Image
              source={require("../../assets/images/industry.png")}
              style={styles.summaryImage}
            />
          </View>
        </View>

        <View style={styles.containerStatus}>
          <SquareItem
            number={countComplaintsByStatusId(0)}
            text={"Шинээр илгээсан"}
            backgroundColor="#fff"
            iconBackgroundColor="#f3f4f6"
            textColor="#4b5563"
            iconColor="#4b5563"
          />
          <SquareItem
            number={countComplaintsByStatusId(2)}
            text={"Хүлээн авсан"}
            backgroundColor="#fff"
            iconBackgroundColor="#ffedd5"
            textColor="#ea580c"
            iconColor="#ea580c"
          />
          <SquareItem
            number={countComplaintsByStatusId(3)}
            text={"Хяналтад байгаа"}
            backgroundColor="#fff"
            iconBackgroundColor="#dbeafe"
            textColor="#2563eb"
            iconColor="#2563eb"
          />
          <SquareItem
            number={countComplaintsByStatusId(6)}
            text={"Шийдвэрлэсэн"}
            backgroundColor="#fff"
            iconBackgroundColor="#dcfce7"
            textColor="#16a34a"
            iconColor="#16a34a"
          />
        </View>

        <View style={styles.recentComplaints}>
          <Text style={styles.sectionTitle}>Сүүлийн гомдлууд</Text>
          {errorMessage && (
            <Text style={{ marginHorizontal: 20, color: "red" }}>
              {errorMessage}
            </Text>
          )}
          {loading ? (
            <ActivityIndicator size="large" color={mainColor} />
          ) : errorMessage ? (
            <Text style={{ marginHorizontal: 20, color: "red" }}>
              {errorMessage}
            </Text>
          ) : complaints.length > 0 ? (
            <FlatList
              data={complaints}
              keyExtractor={(item) => item.id.toString()}
              renderItem={({ item }) => <ComplaintItem complaint={item} />}
            />
          ) : (
            <EmptyData
              message="Мэдээлэл хоосон байна"
              imageSource={require("../../assets/images/empty-folder.png")}
            />
          )}
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    // backgroundColor: "#f8fafc",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  welcomeText: {
    fontSize: 24,
    fontWeight: "bold",
  },
  profileImage: {
    width: 50,
    height: 50,
    borderRadius: 60,
  },
  recentComplaints: {
    flex: 1,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginVertical: 10,
    marginLeft: 10,
    color: "#475569",
  },
  complaintCard: {
    backgroundColor: "#f9f9f9",
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 2,
  },
  complaintTitle: {
    fontSize: 16,
    fontWeight: "bold",
  },
  complaintDate: {
    color: "#666",
    marginBottom: 5,
  },
  complaintStatus: {
    color: "#007BFF",
  },
  summaryCard: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#3730a3",
    padding: 20,
    borderRadius: 10,
    marginBottom: 10,
  },
  summaryView: {
    marginRight: 10,
  },
  summaryText: {
    fontSize: 16,
    marginBottom: 10,
    color: "white",
  },
  summaryRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  totalComplaints: {
    fontSize: 48,
    fontWeight: "bold",
    marginRight: 10,
    color: "white",
  },
  summarySubText: {
    fontSize: 14,
    fontWeight: "bold",
    color: "white",
  },
  summaryImage: {
    width: 100,
    height: 100,
    marginTop: 10,
  },
  containerStatus: {
    // flex: 1,
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
    // backgroundColor: "red",
  },
});
