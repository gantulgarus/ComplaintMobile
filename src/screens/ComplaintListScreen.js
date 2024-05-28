import React, { useState, useEffect, useMemo } from "react";
import axios from "axios";
import { StyleSheet, View, FlatList, TextInput } from "react-native";
import ComplaintItem from "../components/ComplaintItem";
import FeatherIcon from "react-native-vector-icons/Feather";
import EmptyData from "../components/EmptyData";

const ComplaintListScreen = () => {
  const [input, setInput] = useState("");
  const [complaints, setComplaints] = useState([]);

  useEffect(() => {
    axios
      .get("http://192.168.0.82:8000/api/complaints")
      .then((result) => {
        console.log("data amjilttai tatlaa");
        setComplaints(result.data.data);
      })
      .catch((err) => console.log(err));
  }, []);

  const filteredRows = useMemo(() => {
    const rows = [];
    const query = input.toLowerCase();

    for (const item of complaints) {
      const serialNumberIndex = item.serial_number.toLowerCase().search(query);
      const statusIndex = item.status.toLowerCase().search(query);
      const orgIndex = item.org.toLowerCase().search(query);

      if (serialNumberIndex !== -1 || statusIndex !== -1 || orgIndex !== -1) {
        rows.push({
          ...item,
          index: Math.min(
            serialNumberIndex === -1 ? Infinity : serialNumberIndex,
            statusIndex === -1 ? Infinity : statusIndex,
            orgIndex === -1 ? Infinity : orgIndex
          ),
        });
      }
    }

    return rows.sort((a, b) => a.index - b.index);
  }, [input, complaints]);
  // console.log(filteredRows);
  return (
    <View style={styles.container}>
      <View style={styles.searchWrapper}>
        <View style={styles.search}>
          <View style={styles.searchIcon}>
            <FeatherIcon color="#848484" name="search" size={17} />
          </View>
          <TextInput
            autoCapitalize="none"
            autoCorrect={false}
            clearButtonMode="while-editing"
            onChangeText={(val) => setInput(val)}
            placeholder="Хайх.."
            placeholderTextColor="#848484"
            returnKeyType="done"
            style={styles.searchControl}
            value={input}
          />
        </View>
      </View>
      {filteredRows.length > 0 ? (
        <FlatList
          data={filteredRows}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => <ComplaintItem complaint={item} />}
        />
      ) : (
        <EmptyData
          message="Мэдээлэл олдсонгүй"
          imageSource={require("../../assets/images/empty-folder.png")}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  /** Search */
  search: {
    position: "relative",
    backgroundColor: "#fff",
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
  },
  searchWrapper: {
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderColor: "#efefef",
  },
  searchIcon: {
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    width: 34,
    alignItems: "center",
    justifyContent: "center",
    zIndex: 2,
  },
  searchControl: {
    paddingVertical: 10,
    paddingHorizontal: 14,
    paddingLeft: 34,
    width: "100%",
    fontSize: 16,
    fontWeight: "500",
  },
  searchContent: {
    paddingLeft: 24,
  },
  searchEmpty: {
    textAlign: "center",
    paddingTop: 16,
    fontWeight: "500",
    fontSize: 15,
    color: "#9ca1ac",
  },
  item: {
    backgroundColor: "#e0e7ff",
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  itemText: {
    fontSize: 16,
  },
});

export default ComplaintListScreen;
