import {
  View,
  Text,
  StyleSheet,
  Button,
  FlatList,
  TouchableOpacity,
  Image,
} from "react-native";
import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import Icon from "react-native-vector-icons/Ionicons";
import ComplaintItem from "../components/ComplaintItem";
import EmptyData from "../components/EmptyData";
import { AuthContext } from "../context/AuthContext";
import SquareItem from "../components/SquareItem";
import { SafeAreaView } from "react-native-safe-area-context";
import Header from "../components/Header";

const Home = ({ navigation }) => {
  const { user } = useContext(AuthContext);
  // console.log("user====", user);
  const [complaints, setComplaints] = useState([]);

  useEffect(() => {
    axios
      .get("http://192.168.0.82:8000/api/complaints")
      .then((result) => {
        console.log("data amjilttai tatlaa");
        setComplaints(result.data.data);
        // console.log(complaints);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
      <Header title="" user={user} />
      <View style={styles.container}>
        <View style={styles.summaryCard}>
          <View style={styles.summaryView}>
            <Text style={styles.summaryText}>Өнөөдрийн байдлаар танд</Text>
            <View style={styles.summaryRow}>
              <Text style={styles.totalComplaints}>{26}</Text>
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
            number={1}
            text={"Илгээсан"}
            backgroundColor="#fff"
            textColor="orange"
            iconColor="orange"
          />
          <SquareItem
            number={2}
            text={"Хяналтад байгаа"}
            backgroundColor="#fff"
            textColor="fuchsia"
            iconColor="fuchsia"
          />
          <SquareItem
            number={3}
            text={"Шийдвэрлэсэн"}
            backgroundColor="#fff"
            textColor="mediumblue"
            iconColor="mediumblue"
          />
        </View>

        <View style={styles.recentComplaints}>
          <Text style={styles.sectionTitle}>Сүүлийн гомдлууд</Text>
          {!!complaints ? (
            <FlatList
              data={complaints}
              keyExtractor={(item) => item.id.toString()}
              renderItem={({ item }) => <ComplaintItem complaint={item} />}
            />
          ) : (
            <EmptyData />
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
    backgroundColor: "#fff",
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
